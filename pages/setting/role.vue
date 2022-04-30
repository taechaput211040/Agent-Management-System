<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">ตั้งค่า Role</h1>

          <v-card class=" pa-3 mt-5  mb-2 classtable">
            <v-row class="mt-2">
              <v-spacer></v-spacer>
              <v-col cols="3" align="baseline">
                <v-text-field
                  v-model="searchdata"
                  solo-inverted
                  label="ค้นหาอย่างน้อย3ตัวอักษร"
                  required
                  ><v-btn slot="append" color="success" fab dark x-small>
                    <v-icon>mdi-magnify</v-icon></v-btn
                  ></v-text-field
                ></v-col
              >
            </v-row>
            <v-data-table
              class="elevation-2 "
              :headers="headers"
              :items="exampleitem"
            >
              <template #[`item.no`]="{ index }">
                {{ index + 1 }}
              </template>

              <template #[`item.action`]>
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
          text: "Name",
          value: "name",
          align: "center",
          divider: true
        },
        {
          text: "Level",
          value: "level",
          divider: true,
          align: "center",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          class: "col-1",
          divider: true
        },
        {
          text: "View",
          value: "view",
          align: "center",
          divider: true
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          divider: true
        }
      ],
      exampleitem: [
        {
          name: "senior",
          level: "1",
          status: 1
        }
      ]
    };
  },
  methods: {
    addstatus(value) {
      console.log(value);
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
