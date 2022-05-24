<template>
  <v-flex>
    <!-- header card -->
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <!-- row member name -->
          <v-card class="px-6 pt-6">
            <v-row class="select-item py-2">
              <v-col cols="12" md="8">
                <h3 class="mt-2">
                  Member Management - List :/ <a class="px-5">{{customer_name}}</a>
                  <v-btn elevation="2" > New </v-btn>
                </h3>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :items="items"
                  :label="items[0]"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" md="4">
                <v-text-field
                  label="Username"
                  placeholder="username"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3" md="2">
                <v-btn elevation="2" x-large >
                  <v-icon left> mdi-magnify</v-icon> Search
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <h4>เครดิตเอเย่นคงเหลือ : {{ remaining_credit}}</h4>
              </v-col>
            </v-row>
          </v-card>

          <!-- row search + credit_balance -->
          <v-card class=" pa-2 mt-5  mb-2 classtable">
            <v-row class="ma-4">
              <v-col cols="8"> <h2>Member Management</h2></v-col>
              <v-col cols="4">
                <v-row align="baseline">
                  <v-col cols="8"
                    ><v-text-field
                      v-model="searchdata"
                      solo-inverted
                      label="ค้นหาอย่างน้อย3ตัวอักษร"
                      required
                      ><v-btn slot="append" color="success" fab dark x-small>
                        <v-icon>mdi-magnify</v-icon></v-btn
                      ></v-text-field
                    ></v-col
                  >
                  <v-col cols="4">
                    <v-btn depressed color="primary" @click="add()">
                      <v-icon>mdi-plus</v-icon>Add Member</v-btn
                    ></v-col
                  >
                </v-row>
              </v-col>
            </v-row>

            <v-data-table
              class="elevation-2 ma-4"
              :headers="headers"
              :items="exampleitem"
              hide-default-footer
            >
              <template #[`item.no`]="{ index }">
                {{ index + 1 }}
              </template>
              <template #[`item.credit`]="{ item ,index }">
                <span v-if="show == true">{{ item.credit }}</span>
                <v-btn
                  depressed
                  color="warning"
                  elevation="2"
                  small
                  @click="showcredit(item.credit, index)"
                  >ตรวจสอบเครดิต</v-btn
                >
              </template>
              <template #[`item.edit`]="{item}">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="success"
                  @click="hanClickCredit(item, false)"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon> </v-btn
                ><v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="error"
                  @click="hanClickCredit(item, true)"
                >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
                </v-btn>
              </template>
              <template #[`item.log`]="{item}">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="teal"
                  @click="showlog(item)"
                >
                  <v-icon dark>
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-btn>
              </template>
              <template #[`item.view`]="{item}">
                <v-btn
                  class="mx-2"
                  x-small
                  color="primary"
                  @click="showlog(item)"
                >
                  <span>View</span>
                </v-btn>
              </template>
              <template #[`item.setting`]="{item}">
                <v-btn
                  class="mx-2"
                  x-small
                  color="success"
                  @click="showlog(item)"
                >
                  <span>Edit</span>
                </v-btn>
              </template>
              <template #[`item.action`]>
                <v-btn class="mx-2" fab dark x-small color="purple" @click="modal_add=true">
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark x-small color="blue-grey">
                  <v-icon dark>
                    mdi-key
                  </v-icon>
                </v-btn>
              </template>
              <template #[`item.status`]="{ item}">
                <span style="color: #c2e164;">{{ item.status ? "Active" : "Idle" }}</span>
              </template>
              <template #[`item.suspend`]="{ item }">
                <span style="color: #c2e164;">{{ item.suspend ? "Yes" : "No" }}</span>
              </template>
              <template #[`item.lock`]="{ item}">
                <span style="color: #c2e164;">{{ item.lock ? "Open" : "Close" }}</span>
              </template>
            </v-data-table>
            <v-dialog v-model="modalCredit" persistent max-width="400">
              <v-card class="pa-5">
                {{ this.formCredit.isMinus ? "ลบ" : "เติม" }} Credit
                <v-text-field
                  type="number"
                  dense
                  v-model.number="formCredit.number"
                  autofocus
                  @keyup.enter="prompt = false"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    depressed
                    @click="handlcCloseCreditForm"
                  >
                    เติมเงิน
                  </v-btn>
                  <v-btn color="error" depressed @click="handlcCloseCreditForm">
                    ยกเลิก </v-btn
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
            ><v-btn fab icon x-small @click="open_history = false"
              ><v-icon>mdi-close-thick</v-icon></v-btn
            >
          </v-card-title>
        </v-card>
        <v-data-table
          class="elevation-2 ma-2"
          :headers="headersHistory"
          hide-default-footer
        ></v-data-table
      ></v-card>
    </v-dialog>
    <v-dialog full-width v-model="modal_add" persistent>
      <v-card class="pa-4">
        <v-form ref="form" v-model="valid">
          <v-text-field label="Username" filled disabled></v-text-field>
          <v-text-field label="Nickname" filled disabled></v-text-field>
          <v-text-field label="Name" dense outlined></v-text-field>
          <v-text-field
            label="Credit"
            type="number"
            dense
            outlined
          ></v-text-field>
          <v-text-field label="Username" dense outlined></v-text-field>
          <v-text-field label="Password" dense outlined></v-text-field>
          <v-text-field label="Confirm" dense outlined></v-text-field>
        </v-form>

        <v-card elevation="2">
          <h4 class="text-center py-2">เลือกค่ายเกม</h4>
          <div class="row mb-5 px-2">
            <div class="col-2 p-1">
              <div class="card_game">
                <v-checkbox
                  v-model="selectedGame"
                  label="John"
                  value="John"
                ></v-checkbox>
                <el-input-number
                  controls-position="right"
                  :min="0"
                  :max="10"
                ></el-input-number>
              </div>
            </div>
            <div class="col-2 p-1">
              <div class="card_game">
                <v-checkbox
                  v-model="selectedGame"
                  label="John"
                  value="John"
                ></v-checkbox>
                <el-input-number
                  controls-position="right"
                  :min="0"
                  :max="10"
                ></el-input-number>
              </div>
            </div>
          </div>
        </v-card>

        <v-card-actions align="right">
          <v-spacer></v-spacer>
          <v-btn push rounded color="success">Submit </v-btn>
          <v-btn push rounded color="error" @click="modal_add = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
export default {
  data() {
    return {

      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      customer_name : 'customer',
      remaining_credit: "9,353,241,065",
      history: [],
      open_history: false,
      selectedGame: "",
      searchdata: "",
      modal_add: false,
      form_member: {
        role: "",
        owner: "",
        name: "",
        credit: null,
        username: "",
        password: "",
        confrim: "",
        company: "",
        game_member: [],
        domain: "",
        parent: ""
      },
      formCredit: {
        number: null,
        targetUser: null,
        isMinus: false
      },
      targetUser: [],

      modalCredit: false,
      show: false,
      isLoading: false,
      headersHistory: [
        {
          text: "No.",
          align: "center",
          value: "no",
          divider: true
        },
        {
          text: "Deposit",
          value: "credit_type_display",
          divider: true,
          sortable: false
        },
        {
          text: "Withdrawal",
          value: "credit_type_display",
          divider: true,
          sortable: false
        },
        {
          text: "Date/Time",
          value: "datetime_transaction",
          divider: true,
          sortable: false
        }
      ],
      headers: [
        {
          text: "No.",
          align: "center",
          value: "no",
          class: "col-1",
          divider: true
        },
        { text: "Username", value: "username", divider: true },
        { text: "Nickname", value: "nickname", divider: true },
        { text: "Phone", value: "phone", divider: true },
        { text: "Contact", value: "contact", divider: true },
        { text: "Currency", value: "currency", divider: true },
        { text: "Init credit", value: "init_limit", divider: true },
        {
          text: "Credit",
          value: "credit",
          divider: true,
          align: "center",
          sortable: false,
          class: "col-1"
        },
        {
          text: "+ / -",
          value: "edit",
          divider: true,
          align: "center",
          class: "col-1",
          sortable: false
        },
        {
          text: "Log",
          value: "log",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Downline",
          value: "view",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Setting",
          value: "setting",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Last Login",
          value: "login",
          divider: true,
          align: "right",
          sortable: false
        },
        {
          text: "Login IP",
          value: "IP",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Suspend",
          value: "suspend",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Lock",
          value: "lock",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          divider: true,
          align: "center",
          sortable: false
        }
      ],
      exampleitem: [
        {
          username: "agenttest",
          nickname: "",
          phone: "0965555555",
          contact: "",
          currency: "THB",
          inti_limit: "",
          credit: "1,597,000.00",
          view: [],
          login: "07/01/2022/ 12:55",
          IP : "1.46.192.24",
          suspend: 0,
          lock: 1,
          status: 1
        },
        {
          username: "test2",
          nickname: "",
          phone: "0961111111",
          contact: "",
          currency: "THB",
          inti_limit: "",
          credit: "7,000.00",
          view: [],
          login: "04/01/2022/ 10:55",
          IP : "192.168.0.2",
          suspend: 1,
          lock: 0,
          status: 1
        }
      ]
    };
  },
  methods: {
    showlog(dataHistory) {
      this.open_history = true;
      this.history = dataHistory;
    },
    async add() {
      this.modal_add = true;
    },
    addstatus(value) {
      console.log(value);
    },
    async showcredit(credit, i) {
      this.show = true;
    },
    hanClickCredit(data, isMinus) {
      this.formCredit.isMinus = isMinus;
      this.targetUser = data;
      this.modalCredit = true;
    },
    async handlcCloseCreditForm() {
      this.formCredit = {
        number: null,
        targetUser: null,
        isMinus: false
      };
      this.modalCredit = false;
    }
  }
};
</script>
