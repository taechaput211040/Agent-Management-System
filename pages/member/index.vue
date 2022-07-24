<template>
  <div>
    <div>
      <v-row>
        <v-container>
          <h2 class="mt-2">Member Management</h2>
          <v-card class="pa-2 mt-5 mb-2 classtable">
            <div class="d-sm-flex d-block align-baseline pa-2">
              <v-btn depressed color="primary" @click="add()"> <v-icon>mdi-plus</v-icon>Add Member</v-btn>
              <v-spacer></v-spacer>
              <div class="col-12 col-sm-4 col-md-4 pa-0 my-1">
                <v-text-field
                  v-model="searchdata"
                  hide-details="auto"
                  dense
                  solo-inverted
                  label="ค้นหาอย่างน้อย3ตัวอักษร"
                  required
                  ><v-btn @click="checkRendering()" slot="append" color="success" fab dark x-small>
                    <v-icon>mdi-magnify</v-icon></v-btn
                  ></v-text-field
                >
              </div>
            </div>
            <v-data-table
              class="ma-4"
              :server-items-length="pagination.rowsNumber"
              :items-per-page.sync="pagination.rowsPerPage"
              :page.sync="pagination.page"
              :headers="headers"
              :items="itemList"
              hide-default-footer
            >
              <template #[`item.no`]="{ index }">
                {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
              </template>
              <template #[`item.credit`]="{ item }">
                {{ item.creditBalance }}
                <v-btn color="warning" :loading="loadingBtn" elevation="2" small @click="getBalance(item)"
                  >ตรวจสอบเครดิต</v-btn
                >
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
              <template #[`item.action`]="{ item }">
                <div class="d-flex justify-center">
                  <v-btn class="mx-2" fab dark x-small color="purple" @click="openDlUpdate(item)">
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab dark x-small color="warning" @click="openChangePassDl(item.id)">
                    <v-icon dark> mdi-lock-reset </v-icon>
                  </v-btn>
                  <v-btn class="mx-2" v-if="item.status" fab dark x-small color="blue-grey" @click="lockAccount(item)">
                    <v-icon dark> mdi-lock </v-icon>
                  </v-btn>
                  <v-btn class="mx-2" v-else fab dark x-small color="success" @click="lockAccount(item)">
                    <v-icon dark> mdi-lock-open </v-icon>
                  </v-btn>
                </div>
              </template>
              <template #[`item.status`]="{ item }">
                <v-chip color="success" small v-if="item.status == 1"
                  ><v-icon left>mdi-circle-medium</v-icon> on</v-chip
                >
                <v-chip small color="error" v-else><v-icon left>mdi-circle-medium</v-icon>off</v-chip></template
              ></v-data-table
            >
            <v-row align="baseline" class="ma-3">
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
                  @input="handlePageChange(pagination.page)"
                  v-model="pagination.page"
                  :total-visible="7"
                  :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
                ></v-pagination>
              </v-col>
            </v-row>
            <v-dialog v-model="modalCredit" persistent max-width="400">
              <v-card class="pa-5">
                {{ this.formCredit.isMinus ? 'ลบ' : 'เติม' }} Credit
                <v-text-field
                  type="number"
                  dense
                  v-model.number="formCredit.number"
                  autofocus
                  @keyup.enter="prompt = false"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" depressed @click="submitTransaction" :loading="transactionBtn">
                    {{ this.formCredit.isMinus ? 'ลบ' : 'เติม' }}
                  </v-btn>
                  <v-btn color="error" depressed @click="handlcCloseCreditForm"> ยกเลิก </v-btn
                  ><v-spacer></v-spacer> </v-card-actions
              ></v-card>
            </v-dialog>
            <v-dialog v-model="changepassDl" persistent max-width="400">
              <v-form ref="formChangepass">
                <v-card class="pa-5">
                  เปลี่ยนรหัสผ่าน
                  <v-text-field
                    :rules="[
                      (v) => !!v || 'กรุณากรอก password',
                      (v) => (v && v.length >= 8 && v.length < 17) || 'กรุณากรอกชื่ออย่างน้อย 8 - 16 ตัวอักษร',
                    ]"
                    :type="hidden ? 'password' : 'text'"
                    @click:append="() => (hidden = !hidden)"
                    v-model="formChangePassword.password"
                    :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
                    autofocus
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" depressed @click="changePassword()"> เปลี่ยนรหัสผ่าน </v-btn>
                    <v-btn color="error" depressed @click="closedchangePassword"> ยกเลิก </v-btn
                    ><v-spacer></v-spacer> </v-card-actions></v-card
              ></v-form>
            </v-dialog>
          </v-card>
        </v-container>
      </v-row>
    </div>
    <v-dialog v-model="open_history" width="800">
      <v-card class="pb-2">
        <v-card color="indigo darken-2" dark align-baseline>
          <v-card-title class="text-h5"
            >ประวัติการเติม<v-spacer></v-spacer
            ><v-btn fab icon x-small @click="open_history = false"><v-icon>mdi-close-thick</v-icon></v-btn>
          </v-card-title>
        </v-card>
        <v-data-table class="ma-2" :headers="headersHistory" hide-default-footer></v-data-table
      ></v-card>
    </v-dialog>
    <v-dialog width="800" v-model="modal_add" persistent>
      <v-card class="pa-4">
        <h2 class="text-center my-2">Add Member</h2>
        <v-form ref="form">
          <v-text-field
            v-model="formRegister.name"
            :rules="[(v) => !!v || 'กรุณากรอกชื่อ']"
            label="Name"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formRegister.lastname"
            :rules="[(v) => !!v || 'กรุณากรอกนามสกุล']"
            label="lastname"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formRegister.username"
            prefix="kg"
            :rules="[
              (v) => !!v || 'กรุณากรอก username',
              (v) => (v && v.length >= 8) || 'กรุณากรอกชื่ออย่างน้อย 8 ตัวอักษร',
            ]"
            label="Username"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formRegister.password"
            label="Password"
            :type="hidden ? 'password' : 'text'"
            @click:append="() => (hidden = !hidden)"
            :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              (v) => !!v || 'กรุณากรอก password',
              (v) => (v && v.length >= 8 && v.length < 17) || 'กรุณากรอก password อย่างน้อย 8 ตัวอักษร',
            ]"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            :rules="[
              (v) => !!v || 'กรุณากรอกเบอร์มือถือ',
              (v) => (v && v.length >= 10 && v.length < 16) || 'กรุณากรอก กรุณากรอกเบอร์มือถือ 10 ถึง 15 ตัว',
            ]"
            v-model="formRegister.phone"
            label="phone number"
            dense
            outlined
          ></v-text-field>
          <v-autocomplete
            :rules="[(v) => !!v || 'กรุณาเลือกธนาคาร']"
            v-model="formRegister.bankName"
            label="bank"
            :items="bankList"
            dense
            outlined
          ></v-autocomplete>
          <v-text-field
            :rules="[
              (v) => !!v || 'กรุณากรอกเลขบัญชีธนาคาร',
              (v) => (v && v.length >= 10 && v.length < 13) || 'กรุณากรอกเลขบัญชีธนาคาร 10 ถึง 13 ตัว',
            ]"
            v-model="formRegister.bankAcc"
            label="bank number"
            dense
            :disabled="!formRegister.bankName"
            outlined
          ></v-text-field>
          <v-text-field v-model="formRegister.recomander" label="recomander" dense outlined></v-text-field>
        </v-form>

        <v-card-actions align="right">
          <v-spacer></v-spacer>
          <v-btn push rounded color="success" :loading="btn_loadingUpdate" @click="submitRegister()">Submit </v-btn>
          <v-btn push rounded color="error" @click="closeModaladd()">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="800" v-model="modal_edit" persistent>
      <v-card class="pa-4">
        <h2 class="text-center my-2">Edit Member</h2>
        <v-form ref="formEdit">
          <v-text-field
            v-model="formEdit.name"
            :rules="[(v) => !!v || 'กรุณากรอกชื่อ']"
            label="Name"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formEdit.lastname"
            :rules="[(v) => !!v || 'กรุณากรอกนามสกุล']"
            label="lastname"
            dense
            outlined
          ></v-text-field>
          <v-text-field v-model="formEdit.username" disabled label="Username" dense outlined></v-text-field>
          <v-text-field
            :rules="[
              (v) => !!v || 'กรุณากรอกเบอร์มือถือ',
              (v) => (v && v.length >= 10 && v.length < 16) || 'กรุณากรอก กรุณากรอกเบอร์มือถือ 10 ถึง 15 ตัว',
            ]"
            v-model="formEdit.phone"
            label="phone number"
            dense
            outlined
          ></v-text-field>
          <v-autocomplete
            :rules="[(v) => !!v || 'กรุณาเลือกธนาคาร']"
            v-model="formEdit.bankName"
            label="bank"
            :items="bankList"
            dense
            outlined
          ></v-autocomplete>
          <v-text-field
            :rules="[
              (v) => !!v || 'กรุณากรอกเบอร์มือถือ',
              (v) => (v && v.length >= 10 && v.length < 13) || 'กรุณากรอกเลขบัญชีธนาคาร 10 ถึง 13 ตัว',
            ]"
            v-model="formEdit.bankAcc"
            label="bank number"
            dense
            outlined
          ></v-text-field>
          <v-text-field v-model="formEdit.recomander" label="recomander" dense outlined></v-text-field>
        </v-form>

        <v-card-actions align="right">
          <v-spacer></v-spacer>
          <v-btn push rounded :loading="btn_loadingUpdate" color="success" @click="submitUpdate()">Update </v-btn>
          <v-btn push rounded color="error" @click="modal_edit = false">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loading-page v-if="isLoading"></loading-page>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import loadingPage from '~/components/form/loadingPage.vue'
export default {
  components: { loadingPage },
  data() {
    return {
      hidden: String,
      btn_loadingUpdate: false,
      modal_edit: false,
      transactionBtn: false,
      loadingBtn: false,
      changepassDl: false,
      formChangePassword: {
        password: '',
      },
      formEdit: {},
      pageSizes: [5, 10, 15, 25],
      pagination: {
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      },
      search: null,
      bankList: [],
      history: [],
      open_history: false,
      selectedGame: '',
      searchdata: '',
      modal_add: false,
      formRegister: {
        username: '',
        password: '',
        phone: '',
        bankName: null,
        bankAcc: '',
        recomander: '',
        name: '',
        lastname: '',
        company: '',
        agent: '',
      },
      formCredit: {
        number: 0,
        targetUser: null,
        isMinus: false,
      },
      targetUser: [],

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
          class: 'col-1',
          sortable: false,
        },
        { text: 'Owner', value: 'company', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Username', value: 'username', sortable: false },
        {
          text: 'Credit',
          value: 'credit',
          align: 'center',
          sortable: false,
          class: 'col-1',
        },
        {
          text: '+ / -',
          value: 'edit',
          align: 'center',
          class: 'col-1',
          sortable: false,
        },
        {
          text: 'Log',
          value: 'log',
          align: 'center',
          sortable: false,
        },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        {
          text: 'Action',
          value: 'action',
          align: 'center',
          sortable: false,
        },
      ],
      itemList: [],
      exampleitem: [
        {
          role: 'เอเย่น',
          owner: 'senior',
          name: 'agent',
          username: 'agenttest',
          credit: 200,
          phone: '0965555555',
          status: 1,
        },
        {
          role: 'ซิเนียร์',
          owner: 'senior',
          name: 'agent',
          username: 'agenttest',
          credit: 200,
          phone: '0965555555',
          status: 1,
        },
      ],
    }
  },
  async beforeMount() {
    await this.getBank()
    await this.checkRendering()
  },
  computed: {
    ...mapState('account', ['profile']),
    ...mapState('auth', ['username']),
  },
  methods: {
    ...mapActions('member', [
      'getMemberList',
      'createMember',
      'creditBalance',
      'topUpCredit',
      'searchByUsername',
      'editMember',
      'lockstatus',
      'changePasswordByuser',
    ]),
    manageForm() {
      this.formRegister = {
        username: '',
        password: '',
        phone: '',
        bankName: null,
        bankAcc: '',
        recomander: '',
        name: '',
        lastname: '',
        company: this.profile.comPrefix,
        agent: this.profile.agentPrefix,
      }
    },
    getParameter() {
      let param = {
        company: this.profile.comPrefix ? this.profile.comPrefix : undefined,
        agent: this.profile.agentPrefix ? this.profile.agentPrefix : undefined,
        search: this.search ? this.search : undefined,
        page: this.pagination.page,
        take: this.pagination.rowsPerPage,
      }
      return param
    },
    async getBalance(item) {
      this.loadingBtn = true
      try {
        let { data } = await this.creditBalance(item.username ? item.username : this.formCredit.targetUser)
        if (!item.username) {
          this.itemList.find((x) => x.username === this.formCredit.targetUser).creditBalance = data.credit
        }
        item.creditBalance = data.credit
      } catch (error) {
        console.log(error)
      }
      this.loadingBtn = false
    },
    async getMember() {
      this.isLoading = true
      let parameters = this.getParameter()
      try {
        let { data } = await this.getMemberList(parameters)
        this.itemList = data.data
        this.itemList.forEach((item) => ((item.creditBalance = null), (item.loading = false)))
        console.log(this.itemList)
        this.pagination.rowsNumber = data.meta.itemCount
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.checkRendering()
    },
    async handlePageChange(size) {
      this.pagination.page = size
      this.checkRendering()
    },
    async submitTransaction() {
      this.transactionBtn = true
      let body = {
        username: this.formCredit.targetUser,
        amount: this.formCredit.number,
      }
      let method = ''
      try {
        if (!this.formCredit.isMinus) {
          method = 'deposit'
        } else {
          method = 'withdraw'
        }
        body = {
          ...body,
          method,
        }
        await this.topUpCredit(body)
        this.transactionBtn = false
        await this.getBalance(this.formCredit)
        await this.handlcCloseCreditForm()
      } catch (error) {
        console.log(error)
        this.transactionBtn = false
      }
    },
    async openDlUpdate(item) {
      this.formEdit = Object.assign({}, item)
      this.modal_edit = true
    },
    async submitUpdate() {
      let body = {
        ...this.formEdit,
        operator: this.username,
      }
      if (this.$refs.formEdit.validate()) {
        this.$swal({
          title: 'Are you sure you want to register downline?',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.btn_loadingUpdate = true
            // console.log(this.formCreate)
            try {
              await this.editMember(body)

              this.$swal({
                icon: 'success',
                title: 'Registered Success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  this.modal_edit = false
                  this.btn_loadingUpdate = false
                  await this.checkRendering()
                }
              })
            } catch (error) {
              console.log(error)

              this.modal_edit = false
              this.btn_loadingUpdate = false
            }
          }
        })
      }
    },
    lockAccount(item) {
      let body = {
        id: item.id,
        status: !item.status,
      }
      this.$swal({
        title: `Are you sure you want to ${item.status ? 'Lock ' : 'Unlock'} Member ?`,
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log(this.formCreate)
          try {
            await this.lockstatus(body)
            this.$swal({
              icon: 'success',
              title: 'Lock Success',
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                await this.checkRendering()
              }
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    submitRegister() {
      this.formRegister.username = this.profile.agentPrefix + this.formRegister.username
      let body = {
        ...this.formRegister,
        operator: this.username,
      }
      if (this.$refs.form.validate()) {
        this.$swal({
          title: 'Are you sure you want to register Member?',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.btn_loadingUpdate = true
            // console.log(this.formCreate)
            try {
              await this.createMember(body)
              await this.$swal({
                icon: 'success',
                title: 'Registered Success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  this.manageForm()
                  this.closeModaladd()
                  await this.checkRendering()
                }
              })
            } catch (error) {
              this.$swal({
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              })
              this.btn_loadingUpdate = false
            }
            this.btn_loadingUpdate = false
          }
        })
      }
    },
    closeModaladd() {
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
      this.modal_add = false
    },
    async checkRendering() {
      if (!this.searchdata || this.searchdata === '') {
        await this.getMember()
      } else {
        await this.searchbyuser()
      }
    },
    async searchbyuser() {
      this.isLoading = true
      let parameters = {
        company: this.profile.comPrefix ? this.profile.comPrefix : undefined,
        agent: this.profile.agentPrefix ? this.profile.agentPrefix : undefined,
        username: this.searchdata,
      }
      this.pagination.page = 1
      try {
        let { data } = await this.searchByUsername(parameters)
        this.itemList = data.data
        this.pagination.rowsNumber = data.meta.itemCount
      } catch (error) {
        console.log(error)
        this.itemList = []
      }
      this.isLoading = false
    },
    async getBank() {
      let { data: bank } = await this.$axios.get('bank.json')
      this.bankList = bank
    },
    showlog(dataHistory) {
      this.open_history = true
      this.history = dataHistory
    },
    async add() {
      this.modal_add = true
    },
    addstatus(value) {
      console.log(value)
    },
    hanClickCredit(data, isMinus) {
      this.formCredit.isMinus = isMinus
      this.formCredit.targetUser = data.username
      this.modalCredit = true
    },
    closedchangePassword() {
      this.formChangePassword = {
        id: null,
        password: '',
      }
      this.$refs.formChangepass.reset()
      this.changepassDl = false
    },
    async changePassword() {
      if (this.$refs.formChangepass.validate()) {
        try {
          await this.changePasswordByuser(this.formChangePassword)
          this.closedchangePassword = false
        } catch (error) {
          this.closedchangePassword = false
          console.log(error)
        }
      }
    },
    openChangePassDl(id) {
      this.changepassDl = true
      this.formChangePassword.id = id
    },
    async handlcCloseCreditForm() {
      this.formCredit = {
        number: 0,
        targetUser: null,
        isMinus: false,
      }
      this.modalCredit = false
    },
  },
}
</script>
