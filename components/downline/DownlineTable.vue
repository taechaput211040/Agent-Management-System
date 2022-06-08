<template>
  <div>
    <!-- row member name -->
    <v-card class="pa-3 mt-4">
      <h3 class="my-3">
        Member Management - List : <a class="px-5">{{ customer_name }}</a>
      </h3>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchdata"
            dense
            solo-inverted
            label="ค้นหาอย่างน้อย3ตัวอักษร"
            hide-details="auto"
            required
            ><v-btn slot="append" color="success" fab dark x-small> <v-icon>mdi-magnify</v-icon></v-btn></v-text-field
          >
        </v-col>

        <v-col cols="12" md="2">
          <v-btn elevation="2" color=""> <v-icon left> mdi-magnify</v-icon> Search </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-sm-right text-center">
          <h4>เครดิตเอเย่นคงเหลือ : {{ remaining_credit | numberFormat }}</h4>
        </v-col>
      </v-row>
    </v-card>

    <!-- row search + credit_balance -->
    <div class="mt-5">
      <div class="text-right pa-2">
        <v-btn
          class="my-3"
          v-if="$store.state.auth.role !== 'MEMBER'"
          @click="handleCreateDownline()"
          color="primary"
          rounded
          ><v-icon>mdi-plus</v-icon> เพิ่ม Downline</v-btn
        >
      </div>
      <v-card class="pb-1 justify-center elevation-3 rounded-lg classtable">
        <v-data-table
          class="elevation-2"
          :headers="headers"
          :items="itemRendering"
          :server-items-length="pagination.rowsNumber"
          :page.sync="pagination.page"
          :options.sync="options"
          :items-per-page="pagination.rowsPerPage"
          hide-default-footer
        >
          <template #[`item.no`]="{ index }">
            {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
          </template>
          <template #[`item.credit`]="{ item, index }">
            <div class="pa-2">
              <div v-if="showCreditamount == true">{{ item.credit | numberFormat }}</div>
              <v-btn @click="showcredit(item, index)" depressed color="warning" elevation="2" small
                >ตรวจสอบเครดิต</v-btn
              >
            </div>
          </template>
          <template #[`item.edit`]="{ item }">
            <div class="d-flex justify-center">
              <v-btn class="mx-2" fab dark x-small color="success" @click="hanClickCredit(item, false)">
                <v-icon dark> mdi-plus </v-icon> </v-btn
              ><v-btn class="mx-2" fab dark x-small color="error" @click="hanClickCredit(item, true)">
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
            </div>
          </template>
          <template #[`item.log`]="{ item }">
            <v-btn class="mx-2" fab dark x-small color="teal" @click="showlog(item)">
              <v-icon dark> mdi-format-list-bulleted-square </v-icon>
            </v-btn>
          </template>
          <template #[`item.view`]="{ item }">
            <v-btn class="mx-2" :disabled="item.role === 'MEMBER'" x-small color="primary" @click="viewDownline(item)">
              <span>View</span>
            </v-btn>
          </template>
          <template #[`item.setting`]="{ item }">
            <v-btn
              class="mx-2"
              x-small
              :disabled="item.role === 'MEMBER'"
              color="success"
              @click="settingProvider(item)"
            >
              <span>Edit</span>
            </v-btn>
          </template>
          <template #[`item.action`]>
            <v-btn class="mx-2" fab dark x-small color="purple" @click="modal_add = true">
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark x-small color="blue-grey">
              <v-icon dark> mdi-key </v-icon>
            </v-btn>
          </template>
          <template #[`item.status`]="{ item }">
            <span style="color: #c2e164">{{ item.status ? 'Active' : 'Idle' }}</span>
          </template>
          <template #[`item.suspend`]="{ item }">
            <span style="color: #c2e164">{{ item.suspend ? 'Yes' : 'No' }}</span>
          </template>
          <template #[`item.lock`]="{ item }">
            <span style="color: #c2e164">{{ item.lock ? 'Open' : 'Close' }}</span>
          </template>
        </v-data-table>
        <v-row align="baseline" class="pa-3">
          <v-col cols="12" sm="2">
            <v-select
              dense
              hide-details="auto"
              solo
              v-model="pagination.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChange"
              label="Items per Page"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10">
            <v-pagination
              v-model="pagination.page"
              :total-visible="7"
              :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <v-dialog v-model="modalCredit" persistent max-width="400">
      <v-card class="pa-5">
        {{ this.formCredit.isMinus ? 'ลบ' : 'เติม' }} Credit
        <v-text-field
          type="number"
          dense
          v-model.number="formCredit.amount"
          required
          autofocus
          @keyup.enter="handlcSubmitcredit()"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="handlcSubmitcredit"> เติมเงิน </v-btn>
          <v-btn color="error" depressed @click="handlcCloseCreditForm"> ยกเลิก </v-btn
          ><v-spacer></v-spacer> </v-card-actions
      ></v-card>
    </v-dialog>
    <v-dialog v-model="open_history" width="800">
      <v-card class="pb-2">
        <v-card color="indigo darken-2" dark align-baseline>
          <v-card-title class="text-h5"
            >ประวัติการเติม<v-spacer></v-spacer
            ><v-btn fab icon x-small @click="open_history = false"><v-icon>mdi-close-thick</v-icon></v-btn>
          </v-card-title>
        </v-card>
        <v-data-table class="elevation-2 ma-2" :headers="headersHistory" hide-default-footer></v-data-table
      ></v-card>
    </v-dialog>
    <v-dialog v-model="dlProvider" persistent max-width="900px"
      ><v-card class="pa-3">
        <revenue-table :username="targetUser" ref="table"></revenue-table>
        <v-card-actions class="justify-center">
          <v-btn color="error" @click="CloseDl">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RevenueTable from '../market-share/RevenueTable.vue'
export default {
  components: { RevenueTable },
  data() {
    return {
      dlProvider: false,
      showCreditamount: false,
      pageSizes: [5, 10, 15, 25],
      options: {},
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 25,
        rowsNumber: 0,
      },
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      customer_name: this.$store.state.auth.username,
      remaining_credit: this.$store.state.account.credit,
      history: [],
      open_history: false,
      selectedGame: '',
      searchdata: '',
      modal_add: false,
      form_member: {
        role: '',
        owner: '',
        name: '',
        credit: null,
        username: '',
        password: '',
        confrim: '',
        company: '',
        game_member: [],
        domain: '',
        parent: '',
      },
      formCredit: {
        amount: 0,
        username: null,
        isMinus: false,
      },
      username: [],

      modalCredit: false,
      show: false,
      isLoading: false,
      headersHistory: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
        },
        {
          text: 'Deposit',
          value: 'credit_type_display',
          sortable: false,
        },
        {
          text: 'Withdrawal',
          value: 'credit_type_display',
          sortable: false,
        },
        {
          text: 'Date/Time',
          value: 'datetime_transaction',
          sortable: false,
        },
      ],
      headers: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          sortable: false,
        },
        { text: 'Username', value: 'username', sortable: false },
        { text: 'role', value: 'role' },
        {
          text: 'workspace',
          value: 'workspace',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Credit',
          value: 'credit',
          align: 'center',
          sortable: false,
        },
        {
          text: '+ / -',
          value: 'edit',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Log',
          value: 'log',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Downline',
          value: 'view',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Setting',
          value: 'setting',
          align: 'center',
          sortable: false,
        },

        {
          text: 'Suspend',
          value: 'suspend',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Lock',
          value: 'lock',
          align: 'center',
          sortable: false,
        },
      ],
      itemRendering: [
        {
          username: 'agenttest',
          nickname: '',
          phone: '0965555555',
          contact: '',
          currency: 'THB',
          inti_limit: '',
          credit: '1,597,000.00',
          view: [],
          login: '07/01/2022/ 12:55',
          IP: '1.46.192.24',
          suspend: 0,
          lock: 1,
          status: 1,
        },
        {
          username: 'test2',
          nickname: '',
          phone: '0961111111',
          contact: '',
          currency: 'THB',
          inti_limit: '',
          credit: '7,000.00',
          view: [],
          login: '04/01/2022/ 10:55',
          IP: '192.168.0.2',
          suspend: 1,
          lock: 0,
          status: 1,
        },
      ],
      targetUser: '',
    }
  },
  watch: {
    options: {
      async handler() {
        this.getDownlineData()
      },
    },
  },
  created() {},
  methods: {
    CloseDl() {
      this.dlProvider = false
    },
    settingProvider(item) {
      this.targetUser = item.username
      this.dlProvider = true
    },
    viewDownline(item) {
      this.$router.push(`${this.$route.fullPath}?username=${item.username}&role=${item.role}`)
      let form_path = [item.username]
      sessionStorage.setItem(`userPrev`, JSON.stringify(form_path))
    },
    handleCreateDownline() {
      this.$router.push(`/downline/createDownline/${this.$store.state.auth.role}`)
    },
    checkRole() {
      let role = this.$store.state.auth.role ? this.$store.state.auth.role : undefined
      let roletoRendering = undefined
      if (role === 'ADMIN') {
        roletoRendering = 'OWNER'
      } else if (role === 'OWNER') {
        roletoRendering = 'SHAREHOLDER'
      } else if (role === 'SHAREHOLDER') {
        roletoRendering = 'SENIOR'
      } else if (role === 'SENIOR') {
        roletoRendering = 'AGENT'
      } else if (role === 'AGENT') {
        roletoRendering = 'MEMBER'
      } else {
        roletoRendering = undefined
      }
      return roletoRendering
    },
    ...mapActions('downline', ['getDownlineMember', 'depositCredit', 'withdrawCredit', 'checkCreditByuser']),
    //  ...mapActions('marketshare', ['getRevenueProviderByUser']),
    async getDownlineData() {
      let parameters = this.getParameter()
      try {
        let { data } = await this.getDownlineMember(parameters)
        this.pagination.rowsNumber = data.result.totalDocs
        this.itemRendering = data.result.items.map((list) => ({
          ...list,
          credit: null,
        }))
      } catch (error) {
        console.log(error)
      }
    },
    getParameter() {
      let rowUseRender = this.checkRole()
      let params = {
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        role: rowUseRender,
      }
      return params
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getDownlineData()
    },
    showlog(dataHistory) {
      this.open_history = true
      this.history = dataHistory
    },

    async showcredit(item, index) {
      this.showCreditamount = true
      try {
        let { data } = await this.checkCreditByuser(item.username)
        let credit = data.amount
        this.itemRendering[index].credit = credit
      } catch (error) {
        console.log(error)
      }
    },
    hanClickCredit(data, isMinus) {
      this.formCredit.isMinus = isMinus
      this.formCredit.username = data.username
      this.modalCredit = true
    },
    async handlcCloseCreditForm() {
      this.formCredit = {
        amount: 0,
        username: null,
        isMinus: false,
      }
      this.modalCredit = false
    },
    async handlcSubmitcredit() {
      try {
        this.formCredit.isMinus ? await this.withdrawCredit(this.formCredit) : await this.depositCredit(this.formCredit)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }

      this.handlcCloseCreditForm()
    },
  },
}
</script>
