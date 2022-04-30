<template>
  <v-flex>
    <div v-if="!loadingpage">
      <v-btn
        color="red"
        v-if="this.role != 4 && this.role != 5"
        @click="$router.go(-1)"
        dark
        small
        class="mx-3"
        >Back</v-btn
      >
      <h2 class="mt-3">Report Agent</h2>
      <template>
        <div class="ma-3 justify-center white rounded-lg classtable pb-3">
          <v-data-table
            :headers="headersTable"
            :items="reportdata.docs"
            :server-items-length="pagination.rowsNumber"
            :items-per-page.sync="pagination.rowsPerPage"
            :page.sync="pagination.page"
            :options.sync="options"
            hide-default-footer
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear
              v-show="progressBar"
              slot="progress"
              color="red"
              indeterminate
            ></v-progress-linear>
            <template #[`item._id`]="{ item }">
              <div class="text-center">
                <span
                  class="cursor-pointer "
                  @click="seniorrendering(item._id)"
                >
                  {{ providerMap(item._id) || item._id }}
                </span>
              </div>
            </template>
            <template #[`item.providerBet`]="{ item }">
              <span class="cursor-pointer">
                {{ numberFormat(item.providerBet) }}
              </span>
            </template>

            <template #[`item.providerPay`]="{ item }">
              <span class="cursor-pointer">
                {{ numberFormat(item.providerPay) }}
              </span>
            </template>
            <template #[`item.memberWin`]="{ item }">
              <div class="pa-1 rounded-lg card-detail  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.memberWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.memberWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.memberCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.memberCom + item.memberWin) }}
                </div>
              </div>
            </template>
            <template #[`item.agentWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.agentWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.agentWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.agentCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.agentCom + item.agentWin) }}
                </div>
              </div>
            </template>
            <template #[`item.seniorWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.seniorWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.seniorWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.seniorCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.seniorCom + item.seniorWin) }}
                </div>
              </div>
            </template>
            <template #[`item.shareWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.shareWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.shareWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.shareCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.shareCom + item.shareWin) }}
                </div>
              </div>
            </template>
            <template #[`item.ownerWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.ownerWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.ownerWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.ownerCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.ownerCom + item.ownerWin) }}
                </div>
              </div>
            </template>
            <template #[`item.smartWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(item.smartWin))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(item.smartWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(item.smartCom) }}
                </div>
                <div class="grey--text">
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com</v-chip
                  >
                  {{ numberFormat(item.smartCom + item.smartWin) }}
                </div>
              </div>
            </template>
          </v-data-table>
        </div>
      </template>
      <h2 class="mt-3" v-if="role != 5">Report Senior</h2>
      <template v-if="role != 5">
        <div class="ma-3 pb-1 justify-center white rounded-lg classtable pb-1">
          <v-data-table
            :server-items-length="pagination.rowsNumber"
            :items-per-page.sync="pagination.rowsPerPage"
            :page.sync="pagination.page"
            :options.sync="options"
            :headers="headersTable"
            :items="reportsenior.docs"
            :loading="isLoading"
            loading-text="Loading... Please wait"
            hide-default-footer
          >
            <v-progress-linear
              v-show="progressBar"
              slot="progress"
              color="red"
              indeterminate
            ></v-progress-linear>
            <template #[`item._id`]="{ item }">
              <span @click="userendering(item._id)"> {{ item._id }}</span>
            </template>
            <template #[`item.memberWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 6).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 6).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 6).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 6).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 6).com +
                        getReport(item.reports, 6).win
                    )
                  }}
                </div>
              </div>
            </template>
            <template #[`item.agentWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 5).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 5).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 5).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 5).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 5).com +
                        getReport(item.reports, 5).win
                    )
                  }}
                </div>
              </div>
            </template>
            <template #[`item.seniorWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 4).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 4).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 4).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 4).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 4).com +
                        getReport(item.reports, 4).win
                    )
                  }}
                </div>
              </div>
            </template>

            <template #[`item.shareWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 3).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 3).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 3).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 3).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 3).com +
                        getReport(item.reports, 3).win
                    )
                  }}
                </div>
              </div>
            </template>
            <template #[`item.ownerWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 2).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 2).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 2).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 2).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 2).com +
                        getReport(item.reports, 2).win
                    )
                  }}
                </div>
              </div>
            </template>
            <template #[`item.smartWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 1).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 1).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 1).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 1).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 1).com +
                        getReport(item.reports, 1).win
                    )
                  }}
                </div>
              </div>
            </template>
            <template #[`item.providerwin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg  my-2 elevation-2">
                <div
                  class="cursor-pointer"
                  :class="bgFunc(numberFormat(getReport(item.reports, 0).win))"
                >
                  <v-chip label x-small color="primary" dark class="px-1"
                    >W/L</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 0).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1"
                    >com</v-chip
                  >
                  {{ numberFormat(getReport(item.reports, 0).com) }}
                </div>
                <div
                  :class="bgFunc(numberFormat(getReport(item.reports, 0).win))"
                >
                  <v-chip label x-small color="black" dark class="px-1"
                    >W/L+com
                  </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).com +
                        getReport(item.reports, 0).win
                    )
                  }}
                </div>
              </div>
            </template>
          </v-data-table>
        </div>

        <v-row
          align="baseline"
          class="ma-3  justify-center white rounded-lg classtable pb-1"
        >
          <v-col cols="12" sm="2">
            <v-select
              v-model="pagination.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChange"
              label="Items per Page"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="9">
            <v-pagination
              v-model="pagination.page"
              :total-visible="7"
              :length="
                Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </div>
    <div v-if="loadingpage" class="text-center">
      <div class="center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
  </v-flex>
</template>
<script>
import * as moment from "moment";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    group_select: {
      type: [Array, Object],
      default: undefined
    },
    provider_select: {
      type: [Array, Object],
      default: undefined
    },
    dateFilter: {
      type: [Array, Object],
      default: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 15, 30, 50],
      options: {},
      progressBar: true,
      loadingpage: false,
      fishing: "FH",
      cardboard: "CB",
      reportsenior: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      reportdata: [],
      isArray: false,
      providerList: [],
      groupList: [],
      isLoading: false,
      headersTable: [
        {
          text: "Username",
          value: "_id",
          width: "250px",
          cellClass: " font-weight-bold"
        },
        {
          text: "สมาชิก",
          value: "memberWin",
          sortable: true,
          cellClass: "text-center"
        },
        {
          text: "เอเย่น",
          value: "agentWin",
          sortable: true,
          cellClass: "text-center"
        },
        {
          text: "ซิเนียร์",
          value: "seniorWin",
          sortable: true,
          cellClass: "text-center"
        },
        {
          text: "หุ้นส่วน",
          value: "shareWin",
          sortable: true,
          cellClass: "text-center"
        },
        {
          text: "คอมปะนี",
          value: "ownerWin",
          sortable: true,
          cellClass: "text-center"
        },
        {
          text: "SMART BET",
          value: "smartWin",
          sortable: true,
          cellClass: "text-center"
        }
      ]
    };
  },
  watch: {
    reportdata() {
      this.progressBar = false;
    },
    options: {
      async handler() {
        await this.onRequest({
          pagination: this.pagination_render
        });
      }
    }
  },
  computed: {
    pagination_render() {
      return this.pagination;
    },
    numberFormat() {
      return (number, digit = 2, comma = true) => {
        if (typeof number == "string") {
          number = this.convertToFloat(number);
        }
        if (!number) {
          return 0;
        } else {
          return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: digit,
            maximumFractionDigits: digit,
            useGrouping: comma
          }).format(number);
        }
      };
    },
    bgFunc() {
      return inValue => {
        const value = this.convertToFloat(inValue);
        if (value > 0) {
          return "positive_text";
        }
        if (value == 0) {
          return "";
        }
        return "negative_text";
      };
    },
    convertToFloat() {
      return number => {
        if (typeof number == "string") {
          number = number.replace(/[^0-9.-]/g, "");
        }
        return parseFloat(number);
      };
    },
    ...mapGetters("report", {
      datetime: "getDateTime"
    }),
    ...mapState("auth", ["role"])
  },
  async created() {
    this.onSearch();
  },
  async fetch() {},

  methods: {
    async handlePageSizeChange(size) {
      this.pagination_render.page = 1;
      this.pagination_render.rowsPerPage = size;
      await this.onRequest({
        pagination: this.pagination_render
      });
    },
    async userendering(username) {
      if (this.role == 4) {
        this.$router.push(`${this.$route.fullPath}?username=${username}`);
      } else {
        this.$router.push(`${this.$route.fullPath}&username=${username}`);
      }
    },
    getReport(item, level) {
      let result = item.find(x => x.level === `${level}`);
      if (!result) {
        return 0;
      } else {
        return result;
      }
    },
    async seniorrendering(agentuser) {
      if (this.role == 4 || this.role == 5) {
        this.$router.push(`${this.$route.fullPath}?agent_user=${agentuser}`);
      } else {
        this.$router.push(`${this.$route.fullPath}&agent_user=${agentuser}`);
      }
    },
    providerMap(code) {
      return this.$store.state.report.companyList[code];
    },
    ...mapActions("provider", { load_provider: "load" }),
    ...mapActions("group", ["load_list"]),
    ...mapActions("report", [
      "getAllReport",
      "getAgentByShare",
      "getSeniorByShare"
    ]),
    numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

    async onSearch() {
      this.progressBar = true;
      await this.onRequest({
        pagination: this.pagination
      });
    },
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return (
        moment(
          `${moment(date).format(dateFormat)} ${moment(time).format(
            timeFormat
          )}`,
          "YYYY-MM-DD HH:mm:ss"
        )
          .utc()
          .format(`${dateFormat} ${timeFormat}`) + "Z"
      );
    },
    handleClickCopy(text) {
      console.log(text);
    },
    getFilterParameter() {
      let start = undefined;
      let end = undefined;
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(
            this.dateFilter.startDate,
            this.dateFilter.startTime
          );
        } else {
          start = this.getDateTime(
            this.dateFilter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(
            this.dateFilter.endDate,
            this.dateFilter.endTime
          );
        } else {
          end = this.getDateTime(
            this.dateFilter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      return {
        typeCode: this.group_select.join(",")
          ? this.group_select.join(",")
          : undefined,
        providerCode: this.provider_select.join(",")
          ? this.provider_select.join(",")
          : undefined,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString()
      };
    },
    async onRequest(props) {
      this.isLoading = true;
      try {
        const parameters = this.getFilterParameter(props);
        const { data: agent } = await this.getAgentByShare({
          ...parameters,
          id: this.$route.query.share_user
            ? this.$route.query.share_user
            : undefined,
          senior_user: this.$route.query.senior_user
            ? this.$route.query.senior_user
            : undefined,
          role: this.role
        });
        const { data: senior } = await this.getSeniorByShare({
          ...parameters,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          id: this.$route.query.share_user
            ? this.$route.query.share_user
            : undefined,
          senior_user: this.$route.query.senior_user
            ? this.$route.query.senior_user
            : undefined,
          role: this.role
        });
        this.reportsenior = senior;
        this.reportdata = agent;
        this.pagination.rowsNumber = senior.pageInfo.total
          ? senior.pageInfo.total
          : agent.pageInfo.total;
        this.isLoading = false;
      } catch (ex) {
        console.log(ex);
        this.isLoading = false;
        // this.$q.loading.hide();
      }
    }
  }
};
</script>
