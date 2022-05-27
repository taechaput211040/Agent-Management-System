<template>
  <v-flex>
    <div class="text-right mx-3">
      <v-btn color="success" @click="onSearch()">
        <v-icon left> mdi-magnify </v-icon>
        Search
      </v-btn>
    </div>
    <div v-if="!loadingpage">
      <v-btn color="red" @click="$router.go(-1)" dark small class="mx-3">Back</v-btn>
      <h2 class="mt-3">Report Round</h2>
      <template>
        <div class="ma-3 pb-1 justify-center white rounded-lg classtable">
          <v-data-table
            :options.sync="options"
            :server-items-length="pagination.rowsNumber"
            :items-per-page.sync="pagination.rowsPerPage"
            :page.sync="pagination.page"
            :headers="headersTable"
            :items="reportdata.docs"
            hide-default-footer
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
            <template #[`item._id`]="{ item }">
              <span @click="userendering(item.roundId)"> {{ item.username }}</span>
            </template>
            <template #[`item.bet`]="{ item }">
              {{ numberFormat(item.bet) }}
            </template>
            <template #[`item.payout`]="{ item }">
              {{ numberFormat(item.payout) }}
            </template>
            <template #[`item.amount`]="{ item }">
              {{ numberFormat(item.amount) }}
            </template>
            <template #[`item.roundId`]="{ item }">
              <span @click="userendering(item.roundId)"> {{ item.roundId }}</span>
            </template>
            <template #[`item.shares`]="{ item }">
              คอมปะนี: {{ getpercent(item, 1).percent }} %<br />
              provider {{ getpercent(item, 0).percent }} %<br />
              ซีเนียร์ {{ getpercent(item, 4).percent }} %
            </template>
            <template #[`item.memberWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 6).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 6).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 6).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 6).winLosePayout) + getpercent(item, 6).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 6).commissionPayout + getpercent(item, 6).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.agentWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 5).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 5).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 5).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 5).winLosePayout) + getpercent(item, 5).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 5).commissionPayout + getpercent(item, 5).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.seniorWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 4).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 4).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 4).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 4).winLosePayout) + getpercent(item, 4).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 4).commissionPayout + getpercent(item, 4).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.shareWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 3).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 3).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 3).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 3).winLosePayout) + getpercent(item, 3).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 3).commissionPayout + getpercent(item, 3).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.ownerWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 2).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 2).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 2).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 2).winLosePayout) + getpercent(item, 2).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 2).commissionPayout + getpercent(item, 2).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.smartWin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 1).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 1).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 1).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 1).winLosePayout) + getpercent(item, 1).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 1).commissionPayout + getpercent(item, 1).winLosePayout) }}
                </div>
              </div>
            </template>
            <template #[`item.providerwin`]="{ item }">
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getpercent(item, 0).winLosePayout))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getpercent(item, 0).winLosePayout) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getpercent(item, 0).commissionPayout) }}
                </div>
                <div
                  :class="
                    bgFunc(numberFormat(getpercent(item, 0).winLosePayout) + getpercent(item, 0).commissionPayout)
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getpercent(item, 0).commissionPayout + getpercent(item, 0).winLosePayout) }}
                </div>
              </div>
            </template>
          </v-data-table>
          <v-row align="baseline" class="ma-3 rounded-lg elevation-3">
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
                :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </div>
      </template>
    </div>
    <div v-if="loadingpage" class="text-center">
      <div class="center">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </div>
  </v-flex>
</template>
<script>
import * as moment from 'moment'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    group_select: {
      type: [Array, Object],
      default: undefined,
    },
    provider_select: {
      type: [Array, Object],
      default: undefined,
    },
    dateFilter: {
      type: [Array, Object],
      default: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  },
  watch: {
    reportdata() {
      this.progressBar = false
    },
    options: {
      async handler() {
        await this.onRequest({
          pagination: this.pagination_render,
        })
      },
    },
  },
  data() {
    return {
      pageSizes: [25, 50, 75, 100],
      options: {},
      progressBar: true,
      loadingpage: false,
      fishing: 'FH',
      cardboard: 'CB',

      seen1: true,
      seen2: false,
      seen3: true,
      seen4: false,
      headersTable: [],

      filter: {
        username: undefined,
        parent_id: undefined,
        level: undefined,
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 25,
        rowsNumber: 0,
      },
      reportdata: [],
      isArray: false,
      providerList: [],
      groupList: [],
      isLoading: false,
      headersTable: [
        {
          text: 'Round ID',
          value: 'roundId',
          cellClass: 'font-weight-bold',
          sortable: false,
          width: '100px',
        },
        {
          text: 'Username',
          value: '_id',
          cellClass: 'font-weight-bold',
          width: '100px',
          sortable: false,
        },

        {
          text: 'Payout',
          value: 'payout',
          sortable: false,
          width: '50px',
          cellClass: 'text-center',
        },
        {
          text: 'Bet',
          value: 'bet',
          sortable: false,
          width: '50px',
          class: 'text-center',
          cellClass: 'text-center',
        },
        {
          text: 'Amount',
          value: 'amount',
          sortable: false,
          width: '50px',
          class: 'text-center',
          cellClass: 'text-center',
        },
        {
          text: 'ชื่อเกม',
          value: 'name',
          sortable: false,
          class: 'text-center',
          width: '100px',
        },
        {
          text: 'ค่ายเกม',
          value: 'provider',
          sortable: false,
          width: '75px',
          class: 'text-center',
          cellClass: 'text-center',
        },
        {
          text: 'ประเภทเกม',
          value: 'type',
          sortable: false,
          width: '75px',
          class: 'text-center',
          cellClass: 'text-center',
        },

        {
          text: 'ถือสู้',
          value: 'shares',
          sortable: false,
          width: '100px',
          class: 'text-center',
          cellClass: 'text-center',
        },
        {
          text: 'สมาชิก',
          value: 'memberWin',
          sortable: false,
        },
        {
          text: 'เอเย่น',
          value: 'agentWin',
          sortable: false,
        },
        {
          text: 'ซิเนียร์',
          value: 'seniorWin',
          sortable: false,
        },
        {
          text: 'หุ้นส่วน',
          value: 'shareWin',
          sortable: false,
        },
        {
          text: 'คอมปะนี',
          value: 'ownerWin',
          sortable: false,
        },
        {
          text: 'SMART BET',
          value: 'smartWin',
          sortable: false,
        },
        {
          text: 'ค่ายเกม',
          value: 'providerwin',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    pagination_render() {
      return this.pagination
    },
    numberFormat() {
      return (number, digit = 2, comma = true) => {
        if (typeof number == 'string') {
          number = this.convertToFloat(number)
        }
        if (!number) {
          return 0
        } else {
          return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: digit,
            maximumFractionDigits: digit,
            useGrouping: comma,
          }).format(number)
        }
      }
    },
    bgFunc() {
      return (inValue) => {
        const value = this.convertToFloat(inValue)
        if (value > 0) {
          return 'positive_text'
        }
        if (value == 0) {
          return ''
        }
        return 'negative_text'
      }
    },
    convertToFloat() {
      return (number) => {
        if (typeof number == 'string') {
          number = number.replace(/[^0-9.-]/g, '')
        }
        return parseFloat(number)
      }
    },
    ...mapGetters('report', {
      datetime: 'getDateTime',
    }),
    ...mapState('auth', ['role']),
    ...mapGetters('auth', ['isRoleLevel']),
  },
  async created() {},
  async fetch() {
    this.onSearch()
  },
  methods: {
    async handlepage(page) {
      this.pagination_render.page = page
      await this.onRequest({
        pagination: this.pagination_render,
      })
    },
    async handlePageSizeChange(size) {
      this.pagination_render.page = 1
      this.pagination_render.rowsPerPage = size
      await this.onRequest({
        pagination: this.pagination_render,
      })
    },
    getpercent(item, level) {
      let result = item.shares.find((x) => x.level === `${level}`)
      if (!result) {
        return 0
      } else {
        return result
      }
    },
    getReport(item, level) {
      let result = item.find((x) => x.level === `${level}`)
      if (!result) {
        return 0
      } else {
        return result
      }
    },
    async userendering(roundid) {
      this.$router.push(`${this.$route.fullPath}&roundId=${roundid}`)
    },
    providerMap(code) {
      return this.$store.state.report.companyList[code]
    },
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport', 'getRoundBySenior']),
    numberWithCommas(x) {
      var parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    getBTPdata(key, targetdata) {
      let dataBTP = targetdata.find((x) => x.level == 6)
      let result = 0.0
      if (dataBTP) {
        if (key === 'bet') {
          result = dataBTP.bet
        } else if (key === 'turnover') {
          if (dataBTP.turnover == 0) {
            result = dataBTP.bet
          } else {
            result = dataBTP.turnover
          }
        } else {
          result = dataBTP.payout
        }
      }
      return this.numberFormat(result)
    },
    async onSearch() {
      this.progressBar = true
      await this.onRequest({
        pagination: this.pagination,
        filter: this.filter,
      })
    },
    getDateTime(date, time) {
      let dateFormat = 'YYYY-MM-DD'
      let timeFormat = 'HH:mm:ss'
      return (
        moment(`${moment(date).format(dateFormat)} ${moment(time).format(timeFormat)}`, 'YYYY-MM-DD HH:mm:ss')
          .utc()
          .format(`${dateFormat} ${timeFormat}`) + 'Z'
      )
    },
    handleClickCopy(text) {
      console.log(text)
    },
    getFilterParameter() {
      let start = undefined
      let end = undefined
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(this.dateFilter.startDate, this.dateFilter.startTime)
        } else {
          start = this.getDateTime(this.dateFilter.startDate, new Date().setHours(0, 0, 0, 0))
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(this.dateFilter.endDate, this.dateFilter.endTime)
        } else {
          end = this.getDateTime(this.dateFilter.endDate, new Date().setHours(23, 59, 59, 999))
        }
      }
      return {
        // ...filter,
        // ...pagination,

        typeCode: this.group_select.join(',') ? this.group_select.join(',') : undefined,
        provider: this.provider_select.join(',') ? this.provider_select.join(',') : undefined,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      }
    },
    async onRequest(props) {
      this.isLoading = true
      try {
        const parameters = this.getFilterParameter(props)

        const { data } = await this.getRoundBySenior({
          ...parameters,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          id: this.$route.query.share_user ? this.$route.query.share_user : undefined,
          senior_user: this.$route.query.senior_user ? this.$route.query.senior_user : undefined,
          username: this.$route.query.username ? this.$route.query.username : undefined,
          agent_user: this.$route.query.agent_user ? this.$route.query.agent_user : undefined,
          role: this.isRoleLevel,
        })

        this.reportdata = data
        this.pagination.rowsNumber = this.reportdata.totalDocs
        this.isLoading = false
      } catch (ex) {
        console.log(ex)
        this.isLoading = false
        // this.$q.loading.hide();
      }
    },
  },
}
</script>
