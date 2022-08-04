<template>
  <div>
    <loading-page v-if="isLoading"></loading-page>
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
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-btn elevation="2" @click="searchList()"> <v-icon left> mdi-magnify</v-icon> Search </v-btn>
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
            :disabled="$store.state.auth.role == 'AGENT'"
            class="my-3"
            v-if="$store.state.auth.role !== 'MEMBER'"
            @click="handleCreateDownline()"
            color="primary"
            rounded
            ><v-icon>mdi-plus</v-icon> เพิ่ม Downline</v-btn
          >
        </div>
        <v-card class="pb-1 justify-center rounded-lg classtable">
          <v-data-table
            class=" "
            :headers="headers"
            :items="itemRendering"
            :server-items-length="pagination.rowsNumber"
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
            :options.sync="options"
            hide-default-footer
          >
            <template #[`item.no`]="{ index }">
              {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
            </template>
            <template #[`item.credit`]="{ item, index }">
              <div class="pa-2">
                <div v-if="item.credit != null">{{ item.credit | numberFormat }}</div>
                <v-btn
                  @click="showcredit(item, index)"
                  :loading="item.loadingBtn"
                  depressed
                  color="warning"
                  elevation="2"
                  small
                  >ตรวจสอบเครดิต <v-icon dark right> mdi-cash-check </v-icon></v-btn
                >
              </div>
            </template>
            <template #[`item.edit`]="{ item, index }">
              <div class="d-flex justify-center">
                <v-btn class="mx-2" dark small color="success" @click="hanClickCredit(item, false, index)">
                  เพิ่ม <v-icon dark right> mdi-cash-multiple </v-icon> </v-btn
                ><v-btn class="mx-2" dark small color="error" @click="hanClickCredit(item, true, index)">
                  ตัด <v-icon dark right> mdi-cash-minus </v-icon>
                </v-btn>
              </div>
            </template>
            <template #[`item.log`]="{ item }">
              <v-btn class="mx-2" fab dark x-small color="teal" @click="showlog(item)">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </template>
            <template #[`item.view`]="{ item }">
              <v-btn
                class="mx-2"
                :disabled="item.role === 'MEMBER' || item.username == customer_name"
                x-small
                color="primary"
                @click="viewDownline(item)"
              >
                <span>View</span>
              </v-btn>
            </template>
            <template #[`item.setting`]="{ item }">
              <v-btn
                class="mx-2"
                x-small
                :disabled="item.role === 'MEMBER' || item.username == customer_name"
                color="success"
                @click="settingProvider(item)"
              >
                <span>Edit</span>
              </v-btn>
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn class="mx-2" dark small color="blue-grey" @click="openChangePassword(item.username)">
                <v-icon dark left> mdi-lock-reset </v-icon> changepass
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
          {{ this.formCredit.isMinus ? 'ตัด' : 'เพิ่ม' }} Credit
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
            <v-btn color="success" depressed @click="handlcSubmitcredit" :loading="loadingSubmit">
              {{ formCredit.isMinus ? 'ตัด' : 'เพิ่ม' }}
            </v-btn>
            <v-btn color="error" depressed @click="handlcCloseCreditForm"> ยกเลิก </v-btn
            ><v-spacer></v-spacer> </v-card-actions
        ></v-card>
      </v-dialog>
      <v-dialog v-model="changepassworddl" width="400">
        <v-card class="pa-sm-3 pa-1">
          <div class="text-center my-3">Change Password</div>
          <v-form ref="formchangepass">
            <div>
              <v-text-field
                label="New password"
                required
                :rules="[(v) => !!v || 'password  is required']"
                v-model="formChange.password"
                :type="hidden ? 'password' : 'text'"
                :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (hidden = !hidden)"
                outlined
              ></v-text-field>
            </div>
            <div class="text-center">
              <v-btn color="success" class="mx-1" @click="handleSubmitChangepass()" small>change</v-btn
              ><v-btn color="error" class="mx-1" @click="closedlcp()" small>cancel</v-btn>
            </div></v-form
          >
        </v-card>
      </v-dialog>
      <v-dialog v-model="open_history" width="800">
        <v-card class="pa-sm-3 pa-1">
          <v-card color="indigo darken-2" dark align-baseline>
            <v-card-title class="text-h5"
              ><h3 v-if="userHistory">Credit History : {{ userHistory.username || null }}</h3>
              <v-spacer></v-spacer
              ><v-btn fab icon x-small @click="open_history = false"><v-icon>mdi-close-thick</v-icon></v-btn>
            </v-card-title>
          </v-card>
          <v-data-table
            class="ma-2"
            :headers="headersHistory"
            hide-default-footer
            :server-items-length="paginationHistory.total"
            :page.sync="paginationHistory.page"
            :items-per-page="paginationHistory.limit"
            :items="itemHistory"
          >
            <template #[`item.no`]="{ index }">
              {{ paginationHistory.limit * (paginationHistory.page - 1) + (index + 1) }}
            </template>
            <template #[`item.credit`]="{ item }"
              ><div class="font-weight-bold" :class="item.credit > 0 ? 'success--text' : 'error--text'">
                {{ item.credit | numberFormat }}
              </div>
            </template>
            <template #[`item.createdAt`]="{ item }"> {{ item.createdAt | dateFormat }} </template></v-data-table
          >
          <v-row>
            <v-col cols="12" sm="2" class="px-3">
              <v-select
                dense
                hide-details="auto"
                solo
                v-model="paginationHistory.limit"
                :items="pageSizes"
                @change="handlePagesizeHistoryChange"
                label="Items per Page"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="10">
              <v-pagination
                v-model="paginationHistory.page"
                :total-visible="7"
                @input="changePageHistory(paginationHistory.page)"
                :length="Math.ceil(paginationHistory.total / paginationHistory.limit)"
              ></v-pagination> </v-col
          ></v-row>
        </v-card>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingPage from '../form/loadingPage.vue'
import RevenueTable from '../market-share/RevenueTable.vue'
export default {
  components: { RevenueTable, LoadingPage },
  data() {
    return {
      hidden: String,
      formChange: {
        username: '',
        password: '',
      },
      changepassworddl: false,
      userHistory: undefined,
      paginationHistory: {
        page: 1,
        total: 0,
        limit: 15,
      },
      indexCredit: 0,
      itemHistory: [],
      loadingSubmit: false,
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
          sortable: false,
        },
        {
          text: 'username',
          value: 'username',
          sortable: false,
        },
        {
          text: 'type',
          value: 'type',
          sortable: false,
        },
        {
          text: 'Credit',
          value: 'credit',
          sortable: false,
        },
        {
          text: 'Date/Time',
          value: 'createdAt',
          sortable: false,
          width: '200px',
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
          text: 'action',
          value: 'action',
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
  async mounted() {
    sessionStorage.removeItem('pathPrev')
    sessionStorage.removeItem('userPrev')
  },

  methods: {
    closedlcp() {
      this.changepassworddl = false
      this.$refs.formchangepass.reset()
    },
    async handleSubmitChangepass() {
      if (this.$refs.formchangepass.validate()) {
        try {
          await this.changePasswordByuser(this.formChange)
        } catch (error) {
          console.log(error)
        }
        this.changepassworddl = false
      }
    },
    openChangePassword(targetUser) {
      this.formChange.username = targetUser
      this.changepassworddl = true
    },
    searchList() {
      this.pagination.page = 1
      this.getDownlineData()
    },
    CloseDl() {
      this.dlProvider = false
    },
    settingProvider(item) {
      this.dlProvider = true
      this.targetUser = item.username
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
        if (this.$store.state.account.profile.isStaff) {
          roletoRendering = 'OWNER'
        } else {
          roletoRendering = 'SHAREHOLDER'
        }
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
    ...mapActions('downline', [
      'getDownlineMember',
      'depositCredit',
      'withdrawCredit',
      'checkCreditByuser',
      'getHistoryCredit',
      'changePasswordByuser',
    ]),
    ...mapActions('account', ['get_creditBalance']),
    async getDownlineData() {
      this.isLoading = true
      let parameters = this.getParameter()
      try {
        let { data } = await this.getDownlineMember(parameters)
        this.pagination.rowsNumber = data.result.totalDocs
        this.itemRendering = data.result.items.map((list) => ({
          ...list,
          credit: null,
          loadingBtn: false,
        }))
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    getParameter() {
      let rowUseRender = this.checkRole()
      let params = {
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        role: rowUseRender,
        search: this.searchdata.length <= 0 || !this.searchdata ? undefined : this.searchdata,
      }
      return params
    },
    getParameterHistory(username) {
      let params = {
        page: this.paginationHistory.page,
        limit: this.paginationHistory.limit,
        username: username ? username : this.userHistory.username,
        type: undefined,
      }
      return params
    },
    handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getDownlineData()
    },
    handlePagesizeHistoryChange(size) {
      this.paginationHistory.page = 1
      this.paginationHistory.limit = size
      this.getCreditLog()
    },
    changePageHistory(page) {
      this.paginationHistory.page = page
      this.getCreditLog()
    },
    async showlog(dataHistory) {
      this.paginationHistory.page = 1
      this.paginationHistory.limit = 15
      console.log(dataHistory, 'data')
      this.userHistory = dataHistory
      this.getCreditLog()
    },
    async getCreditLog() {
      this.isLoading = true
      let params = this.getParameterHistory(this.userHistory.username)
      try {
        let { data } = await this.getHistoryCredit(params)

        this.itemHistory = data.result.docs
        this.paginationHistory.total = data.result.count
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
      this.open_history = true
    },
    async showcredit(item, index) {
      item.loadingBtn = true
      try {
        let { data } = await this.checkCreditByuser(item.username)
        let credit = data.amount
        this.itemRendering[index].credit = credit
      } catch (error) {
        console.log(error)
      }
      item.loadingBtn = false
    },
    hanClickCredit(data, isMinus, index) {
      this.formCredit.isMinus = isMinus
      this.formCredit.username = data.username
      this.modalCredit = true
      this.indexCredit = index
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
      this.loadingSubmit = true
      try {
        this.formCredit.isMinus ? await this.withdrawCredit(this.formCredit) : await this.depositCredit(this.formCredit)
        await this.showcredit(this.formCredit, this.indexCredit)
        this.$swal({
          icon: 'success',
          title: ` ${this.formCredit.isMinus ? 'ตัด' : 'เติม'}เครดิตสำเร็จ`,
          showConfirmButton: false,
          timer: 1500,
        })
      } catch (error) {
        console.log(error)
      }
      await this.get_creditBalance()
      await this.handlcCloseCreditForm()
      this.loadingSubmit = false
    },
  },
}
</script>
