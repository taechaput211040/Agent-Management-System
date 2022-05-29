<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <v-card class="px-6 pt-6">
            <v-row class="select-item py-2">
              <v-col cols="12" md="8">
                <h3 class="mt-2">
                  Member Management - List : <span class="mx-3">Sub Account List</span>
                  <v-btn elevation="2" color="primary" @click="handleAdd"> New sub account </v-btn>
                </h3>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="pa-2 mt-5 mb-2 classtable">
            <v-data-table class="elevation-2 ma-4" :headers="headers" :items="exampleitem" hide-default-footer>
              <!-- index -->
              <template #[`item.no`]="{ index }">
                {{ index + 1 }}
              </template>
              <template #[`item.status`]="{ item }">
                <span style="color: #c2e164">{{ item.status ? 'Active' : 'Idle' }}</span>
              </template>
            </v-data-table>

            <v-dialog v-model="modalAddSubAccount" persistent max-width="800">
              <v-card class="pa-5">
                <h2 class="mt-3 mb-6 text-center">New Sub Account</h2>
                <!-- username -->
                <v-row class="select-item py-2">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 text-left text-sm-right mx-4 mx-sm-0">Username</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <v-text-field v-model="new_user" placeholder="" outlined></v-text-field>
                  </v-col>
                </v-row>
                <!-- password -->
                <v-row class="select-item py-2">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 text-left text-sm-right mx-4 mx-sm-0">Password</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <v-text-field v-model="new_password" type="password" placeholder="" outlined></v-text-field>
                  </v-col>
                </v-row>
                <!-- contact -->
                <v-row class="select-item py-2">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 text-left text-sm-right mx-4 mx-sm-0">Contact</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <v-text-field v-model="new_contact" placeholder="" outlined></v-text-field>
                  </v-col>
                </v-row>
                <!-- Sub user preference -->
                <v-card class="ma-3">
                  <v-card-text class="pa-3 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
                    <h2 class="ml-2 pt-3">User Permission</h2>
                    <v-spacer></v-spacer>
                  </v-card-text>
                  <v-data-table hide-default-footer :items="item_menu" class="elevetion-1" :headers="headrSetting">
                    <template #[`item.create_status`]="{ item }">
                      <v-checkbox></v-checkbox>
                    </template>
                    <template #[`item.edit_status`]="{ item }">
                      <v-checkbox></v-checkbox>
                    </template>
                    <template #[`item.view_status`]="{ item }">
                      <v-checkbox></v-checkbox>
                    </template>
                  </v-data-table>
                </v-card>

                <!-- password agent -->
                <v-row class="select-item pa-3">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 mx-4 mx-sm-0 text-left text-sm-right">Password Agent</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <v-text-field type="password" v-model="new_a_password" placeholder="" outlined></v-text-field>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" depressed @click="handlcCloseEditForm"> บันทีก </v-btn>
                  <v-btn color="error" depressed @click="handleCloseDialog"> ยกเลิก </v-btn
                  ><v-spacer></v-spacer> </v-card-actions
              ></v-card>
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
        <v-data-table class="elevation-2 ma-2" :headers="headersHistory" hide-default-footer></v-data-table
      ></v-card>
    </v-dialog>
    <v-dialog full-width v-model="modal_add" persistent>
      <v-card class="pa-4">
        <v-form ref="form" v-model="valid">
          <v-text-field label="Role" filled disabled></v-text-field>
          <v-text-field label="Owner" filled disabled></v-text-field>
          <v-text-field label="Name" dense outlined></v-text-field>
          <v-text-field label="Credit" type="number" dense outlined></v-text-field>
          <v-text-field label="Username" dense outlined></v-text-field>
          <v-text-field label="Password" dense outlined></v-text-field>
          <v-text-field label="Confirm" dense outlined></v-text-field>
        </v-form>

        <v-card elevation="2">
          <h4 class="text-center py-2">เลือกค่ายเกม</h4>
          <div class="row mb-5 px-2">
            <div class="col-2 p-1">
              <div class="card_game">
                <v-checkbox v-model="selectedGame" label="John" value="John"></v-checkbox>
                <el-input-number controls-position="right" :min="0" :max="10"></el-input-number>
              </div>
            </div>
            <div class="col-2 p-1">
              <div class="card_game">
                <v-checkbox v-model="selectedGame" label="John" value="John"></v-checkbox>
                <el-input-number controls-position="right" :min="0" :max="10"></el-input-number>
              </div>
            </div>
          </div>
        </v-card>

        <v-card-actions align="right">
          <v-spacer></v-spacer>
          <v-btn push rounded color="success">Submit </v-btn>
          <v-btn push rounded color="error" @click="modal_add = false">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
export default {
  data() {
    return {
      item_menu: [{ menu: 'dashboard' }],
      headrSetting: [
        {
          text: 'menu',
          value: 'menu',
          sortable: false,
        },
        {
          text: 'create',
          value: 'create_status',
          sortable: false,
        },
        {
          text: 'edit',
          value: 'edit_status',
          sortable: false,
        },
        {
          text: 'view',
          value: 'view_status',
          sortable: false,
        },
      ],
      history: [],
      open_history: false,
      selectedGame: '',
      searchdata: '',
      modal_add: false,
      new_user: '',
      new_password: '', 
      new_contact: '',
      new_a_password: '',
      stock_m: false,
      member_m: false,
      member_m_v: false,
      report: false,
      old_report: false,
      correct_score: false,
      edit_credit: false,
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
        number: null,
        targetUser: null,
        isMinus: false,
      },
      targetUser: [],

      modalAddSubAccount: false,
      show: false,
      isLoading: false,
      headersHistory: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          divider: true,
        },
        {
          text: 'Deposit',
          value: 'credit_type_display',
          divider: true,
          sortable: false,
        },
        {
          text: 'Withdrawal',
          value: 'credit_type_display',
          divider: true,
          sortable: false,
        },
        {
          text: 'Date/Time',
          value: 'datetime_transaction',
          divider: true,
          sortable: false,
        },
      ],
      headers: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          class: 'col-1',
          divider: true,
        },
        { text: 'Username', value: 'username', divider: true, align: 'center' },

        { text: 'Contact', value: 'contact', divider: true, align: 'center' },
        { text: 'Created Date', value: 'created', divider: true },
        { text: 'Last Login', value: 'login', divider: true },
        { text: 'Login IP', value: 'ip', divider: true },
        { text: 'Status', value: 'status', align: 'center', divider: false },
      ],
      exampleitem: [
        {
          username: 'agenttest',
          contact: '0965555555',
          created: '01/02/2022 04:23 PM',
          login: '15/05/2022 01:23 AM',
          ip: '192.168.0.1',
          status: 1,
        },
        {
          username: 'testaccount',
          contact: '0962221113',
          created: '06/04/2022 04:23 PM',
          login: '07/05/2022 02:53 PM',
          ip: '193.255.191.4',
          status: 1,
        },
      ],
    }
  },
  methods: {
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
    async showcredit(credit, i) {
      this.show = true
    },
    handleAdd(data) {
      this.modalAddSubAccount = true
    },
    async handleCloseDialog() {
      this.modalAddSubAccount = false
    },
    async handlcCloseEditForm() {
      console.log(this.new_user)
      console.log(this.new_password)
      console.log(this.new_contact)
      console.log(this.new_a_password)
      if (this.stock_m) {
        console.log('select stock_m')
      }
      if (this.member_m) {
        console.log('select member_m')
      }
      if (this.member_m) {
        console.log('select member_m_v')
      }
      if (this.report) {
        console.log('select report')
      }
      if (this.old_report) {
        console.log('select old report')
      }
      if (this.correct_score) {
        console.log('select correct_score')
      }
      if (this.edit_credit) {
        console.log('select edit_credit')
      }
      this.modalAddSubAccount = false
    },
  },
}
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>
