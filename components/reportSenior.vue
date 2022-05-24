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
      <h2 class="mt-3">Report Senior</h2>
      <template>
        <div class="ma-3 justify-center white rounded-lg classtable">
          <v-data-table
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
            :headers="headersTable"
            :items="reportdata"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
            <template #[`item._id`]="{ item }">
              <span @click="userendering(item._id)"> {{ item._id }}</span>
            </template>
            <template #[`item.memberWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 6).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 6).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 6).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 6).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 6).com + getReport(item.reports, 6).win) }}
                </div>
              </div>
            </template>
            <template #[`item.agentWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 5).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 5).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 5).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 5).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 5).com + getReport(item.reports, 5).win) }}
                </div>
              </div>
            </template>
            <template #[`item.seniorWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 4).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 4).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 4).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 4).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 4).com + getReport(item.reports, 4).win) }}
                </div>
              </div>
            </template>

            <template #[`item.shareWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 3).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 3).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 3).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 3).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 3).com + getReport(item.reports, 3).win) }}
                </div>
              </div>
            </template>
            <template #[`item.ownerWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 2).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 2).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 2).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 2).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 2).com + getReport(item.reports, 2).win) }}
                </div>
              </div>
            </template>
            <template #[`item.smartWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 1).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 1).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 1).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 1).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 1).com + getReport(item.reports, 1).win) }}
                </div>
              </div>
            </template>
            <template #[`item.providerwin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(getReport(item.reports, 0).win))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(getReport(item.reports, 0).win) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(getReport(item.reports, 0).com) }}
                </div>
                <div :class="bgFunc(numberFormat(getReport(item.reports, 0).win))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{ numberFormat(getReport(item.reports, 0).com + getReport(item.reports, 0).win) }}
                </div>
              </div>
            </template>
          </v-data-table>
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
  data() {
    return {
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
          text: 'Username',
          value: '_id',
          cellClass: 'font-weight-bold',
          width: '200px',
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
  watch: {
    reportdata() {
      this.progressBar = false
    },
  },
  computed: {
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
  },
  async created() {},
  async fetch() {
    this.onSearch()
  },
  methods: {
    getReport(item, level) {
      let result = item.find((x) => x.level === `${level}`)
      if (!result) {
        return 0
      } else {
        return result
      }
    },
    async userendering(username) {
      this.$router.push(`${this.$route.fullPath}&username=${username}`)
    },
    providerMap(code) {
      return this.$store.state.report.companyList[code]
    },
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport', 'getSeniorByShare']),
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
    getFilterParameter({ filter = this.filter, pagination = this.pagination }) {
      if (this.$route.meta.level) {
        this.filter.level = this.$route.meta.level
      }
      if (this.$route.params.id) {
        filter.parent_id = this.$route.params.id
      } else {
        delete filter.parent_id
      }
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
        page: pagination.page,
        limit: pagination.rowsPerPage,
        typeCode: this.group_select.join(',') ? this.group_select.join(',') : undefined,
        providerCode: this.provider_select.join(',') ? this.provider_select.join(',') : undefined,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      }
    },
    async onRequest(props) {
      this.isLoading = true
      try {
        const parameters = this.getFilterParameter(props)

        const { data } = await this.getSeniorByShare({
          ...parameters,
          id: this.$route.query.share_user ? this.$route.query.share_user : undefined,
          senior_user: this.$route.query.senior_user ? this.$route.query.senior_user : undefined,
        })

        this.reportdata = data.docs
        let a = this.providerMap(this.reportdata)
        console.log(a, 'ss')

        // if (this.isArray) {
        //   await Promise.all(
        //     data.results.map(async x => {
        //       const data = await this.$services.company.find_by_id(x.code);

        //       x.data = JSON.parse(JSON.stringify(data));
        //     })
        //   );
        // }
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
