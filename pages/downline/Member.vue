<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">Member Management</h1>

          <v-card class="ma-2 pa-6">
            <v-row class="select-item py-2">
              <h2 class="px-4">รายงานผลประกอบการ</h2>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row class="select-item py-2">
              <v-col md="4" cols="12">
                <h4 class="px-4">Company Name : sasadsad</h4> </v-col
              ><v-divider vertical></v-divider>
              <v-col md="4" cols="12">
                <h4 class="px-4">Owner Name : asdsadsa</h4> </v-col
              ><v-divider vertical></v-divider>
              <v-col md="4" cols="12">
                <h4 class="px-4">Phone : 0842002222</h4>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
          </v-card>

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
                <v-switch
                  v-model="item.status"
                  :false-value="0"
                  :true-value="1"
                  @click="addstatus(item.status)"
                  flat
                ></v-switch>
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
          <v-text-field label="Role" filled disabled></v-text-field>
          <v-text-field label="Owner" filled disabled></v-text-field>
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
        { text: "Role", value: "role", divider: true },
        { text: "Owner", value: "owner", divider: true },
        { text: "Name", value: "name", divider: true },
        { text: "Username", value: "username", divider: true },
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
        { text: "Phone", value: "phone", divider: true },
        { text: "Status", value: "status", align: "center", divider: true },
        {
          text: "Action",
          value: "action",
          divider: true,
          align: "center",

          sortable: false
        }
      ],
      exampleitem: [
        {
          role: "เอเย่น",
          owner: "senior",
          name: "agent",
          username: "agenttest",
          credit: 200,
          phone: "0965555555",
          status: 1
        },
        {
          role: "ซิเนียร์",
          owner: "senior",
          name: "agent",
          username: "agenttest",
          credit: 200,
          phone: "0965555555",
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
<style lang="scss">
@import "https://fonts.googleapis.com/css?family=Kanit|Prompt";
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
span {
  font-family: "Kanit", sans-serif;
}
.select-item {
  align-items: baseline;
}
.classtable {
  .color_subtitle {
    color: black !important;
    background-color: #bdbdbd !important;
  }
  .color_winlose {
    background-color: #767676 !important;
  }
  table thead > tr > th,
  table thead > tr > th > i {
    color: whitesmoke !important;
    text-align: center !important;
  }

  table thead > tr > th:nth-child(even),
  table thead > tr > th:nth-child(even).active {
    background-color: #3b3b3b;
    border: 1px solid #fff;
  }

  table thead > tr > th:nth-child(odd),
  table thead > tr > th:nth-child(odd).active {
    background-color: #3b3b3b;
    border: 1px solid #fff;
  }

  table tbody tr:nth-child(even) {
    background-color: #efefef;
  }

  table tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }
  table.v-table tbody td:first-child,
  table.v-table tbody td:not(:first-child),
  table.v-table tbody th:first-child,
  table.v-table tbody th:not(:first-child),
  table.v-table thead td:first-child,
  table.v-table thead td:not(:first-child),
  table.v-table thead th:first-child,
  table.v-table thead th:not(:first-child) {
    padding: 0 10px;
  }
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 16px !important;
}
.card_game {
  display: flex;
  border-radius: 10px;
  border: 2px solid rgb(59, 52, 52);
  color: #efefef;
  align-items: center;
}
</style>
