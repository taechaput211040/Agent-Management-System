<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">Company Management</h1>

          <v-card class="ma-2 pa-6">
            <v-divider class="my-3"></v-divider>
            <v-row class="select-item py-2">
              <v-col md="6" cols="12">
                <h4 class="px-4">Company Name : sasadsad</h4> </v-col
              ><v-divider vertical></v-divider>
              <v-col md="6" cols="12">
                <h4 class="px-4">Phone : 0842002222</h4>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
          </v-card>

          <v-card class=" pa-2 mt-5  mb-2 classtable">
            <v-row class="ma-4">
              <v-col cols="8"> <h2>Company Management</h2></v-col>
            </v-row>

            <v-row class="mx-4"
              ><v-col cols="4"
                ><v-text-field
                  outlined
                  dense
                  label="Filter Company Name"
                ></v-text-field
              ></v-col>
              <v-col cols="2">
                <v-select
                  outlined
                  dense
                  label="Select Status"
                ></v-select></v-col
            ></v-row>

            <v-data-table
              class="elevation-2 ma-4"
              :headers="headers"
              :items="exampleitem"
            >
              <template #[`item.no`]="{ index }">
                {{ index + 1 }}
              </template>

              <!-- <template #[`item.action`]>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="purple"
                  @click="modal_add = true"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark x-small color="blue-grey">
                  <v-icon dark>
                    mdi-key
                  </v-icon>
                </v-btn>
              </template> -->
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
            <!-- <v-dialog v-model="modalCredit" persistent max-width="400">
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
            </v-dialog> -->
          </v-card>
        </v-container>
      </v-row>
    </div>

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

      headers: [
        {
          text: "No.",
          align: "center",
          value: "no",
          class: "col-1",
          divider: true
        },
        {
          text: "Company Name",
          value: "company",
          align: "center",
          divider: true
        },
        { text: "Owner Name", value: "owner", align: "center", divider: true },
        { text: "Username", value: "username", align: "center", divider: true },
        { text: "Phone", value: "phone", align: "center", divider: true },
        {
          text: "Credit",
          value: "credit",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Operation Code",
          value: "operationCode",
          divider: true,
          align: "center",

          sortable: false
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          divider: true,
          class: "col-1"
        }
      ],
      exampleitem: [
        {
          company: "เอเย่น",
          owner: "senior",
          name: "agent",
          username: "agenttest",
          credit: 200,
          phone: "0965555555",
          status: 1,
          operationCode: "BBT"
        },
        {
          company: "ซิเนียร์",
          owner: "senior",
          name: "agent",
          username: "agenttest",
          credit: 200,
          phone: "0965555555",
          status: 1,
          operationCode: "BBT"
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
