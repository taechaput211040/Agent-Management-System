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
            <v-btn elevation="2" @click="searchList()" color=""> <v-icon left> mdi-magnify</v-icon> Search </v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-sm-right text-center">
            <h4>เครดิตเอเย่นคงเหลือ : {{ remaining_credit }}</h4>
          </v-col>
        </v-row>
      </v-card>

      <!-- row search + credit_balance -->
      <div class="mt-5">
        <div class="pa-2"><v-btn color="error" small @click="backFunction()">back</v-btn></div>
        <v-card class="mt-3 pb-1 justify-center wite rounded-lg classtable">
          <v-data-table
            class=" "
            :headers="headers"
            :items="itemRendering"
            :server-items-length="pagination.rowsNumber"
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
            hide-default-footer
          >
            <!-- :options.sync="options" -->

            <template #[`item.no`]="{ index }">
              {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
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

            <template #[`item.view`]="{ item }">
              <v-btn class="mx-2" x-small color="primary" @click="viewDownline(item)">
                <span>View</span>
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
                @input="changePage"
                :total-visible="7"
                :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
              ></v-pagination>
            </v-col> </v-row
        ></v-card>
      </div>

      <v-dialog v-model="open_history" width="800">
        <v-card class="pb-2">
          <v-card color="indigo darken-2" dark align-baseline>
            <v-card-title
              ><h3>ประวัติการเติม</h3>
              <v-spacer></v-spacer
              ><v-btn fab icon x-small @click="open_history = false"><v-icon>mdi-close-thick</v-icon></v-btn>
            </v-card-title>
          </v-card>
          <v-data-table class="ma-2" :headers="headersHistory" hide-default-footer></v-data-table
        ></v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import loadingPage from '../form/loadingPage.vue'
export default {
  components: { loadingPage },
  data() {
    return {
      isLoading: false,
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
        amount: null,
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
          text: 'Downline',
          value: 'view',
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
    }
  },
  // watch: {
  //   options: {
  //     async handler() {
  //       this.getDownlineData()
  //     },
  //   },
  // },
  mounted() {
    this.getDownlineData()
  },
  methods: {
    searchList() {
      this.pagination.page = 1
      this.getDownlineData()
    },
    viewDownline(item) {
      this.pagination.page = 1
      this.searchdata = ''
      console.log(item, 'itemrender')
      //   this.$router.push(`${this.$route.path}?username=${item.username}`)

      this.getDownlineData(item.username, item.role)

      if (!sessionStorage.getItem(`userPrev`) || JSON.parse(sessionStorage.getItem(`userPrev`)).length <= 0) {
        let form_path = [item.username]
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path))
      } else {
        let form_path = JSON.parse(sessionStorage.getItem('userPrev'))
        form_path.push(item.username)
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path))
      }
    },
    backFunction() {
      const form_path = JSON.parse(sessionStorage.getItem('userPrev'))
      const prevUsers = form_path.slice(0, form_path.length - 1)
      if (!form_path || form_path.length <= 1) {
        this.$router.go(-1)
      } else {
        this.pagination.page = 1
        console.log(form_path[form_path.length - 1], 'path')
        this.getDownlineData(prevUsers[prevUsers.length - 1])
        sessionStorage.setItem('userPrev', JSON.stringify(prevUsers))
      }
      console.log(form_path)
    },
    handleCreateDownline() {
      this.$router.push(`/downline/createDownline/${this.$store.state.auth.role}`)
    },

    ...mapActions('downline', ['getDownlineMemberByUser', 'depositCredit', 'withdrawCredit', 'checkCreditByuser']),
    async getDownlineData(userid, role) {
      this.isLoading = true
      let parameters = this.getParameter(userid, role)
      try {
        let { data } = await this.getDownlineMemberByUser(parameters)
        this.pagination.rowsNumber = data.result.totalDocs
        this.itemRendering = data.result.items.map((list) => ({
          ...list,
          credit: null,
        }))
        // console.log(this.itemRendering,'list')
      } catch (error) {
        console.log(error)
        this.itemRendering = []
        this.pagination.rowsNumber = 0
      }
      this.isLoading = false
    },
    getParameter(userid, role) {
      let params = {
        username: userid ? userid : this.$route.query.username,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        role: undefined,
        search: this.searchdata.length <= 0 || !this.searchdata ? undefined : this.searchdata,
        // role ? this.checkRoleRender(role) : this.checkRoleRender(this.$route.query.role),
      }
      return params
    },
    checkRoleRender(role) {
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
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getDownlineData()
    },
    changePage(size) {
      this.pagination.page = size
      this.getDownlineData()
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
  },
}
</script>
