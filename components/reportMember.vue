<template>
  <v-flex>
    <div class="text-right mx-3 d-flex justify-end align-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <v-text-field
          hide-details="auto"
          @keyup.enter="onSearch()"
          label="กรอก username"
          dense
          outlined
          v-model.trim="searchUsername"
        ></v-text-field>
      </div>

      <v-btn color="success" @click="onSearch()">
        <v-icon left> mdi-magnify </v-icon>
        Search
      </v-btn>
    </div>
    <div v-if="!loadingpage">
      <v-btn color="red" v-if="this.isRoleLevel != 5" @click="$router.go(-1)" dark small class="ma-3">Back</v-btn>
      <h2 class="mt-3">Report Member</h2>
      <template>
        <div class="ma-3 justify-center rounded-lg classtable">
          <v-data-table
            :server-items-length="pagination.rowsNumber"
            :options.sync="options"
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
            :headers="headerCustom"
            :items="reportdata"
            hide-default-footer
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
            <template #[`item._id`]="{ item }">
              <span class="user_pointer" @click="userendering(item._id)"> {{ item._id }}</span>
            </template>
            <template #[`item.payout`]="{ item }">
              {{ numberFormat(getReport(item.reports, 6).pay) }}
            </template>
            <template #[`item.bet`]="{ item }">
              {{ numberFormat(getReport(item.reports, 6).bet) }}
            </template>
            <template #[`item.turnover`]="{ item }">
              {{ numberFormat(getReport(item.reports, 6).turn) }}
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
              <!-- seniorlogin -->
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2" v-if="isRoleLevel === 4">
                <div
                  class="cursor-pointer"
                  :class="
                    bgFunc(
                      numberFormat(
                        getReport(item.reports, 0).win +
                          getReport(item.reports, 1).win +
                          getReport(item.reports, 2).win +
                          getReport(item.reports, 3).win
                      )
                    )
                  "
                >
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).win +
                        getReport(item.reports, 1).win +
                        getReport(item.reports, 2).win +
                        getReport(item.reports, 3).win
                    )
                  }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).com +
                        getReport(item.reports, 1).com +
                        getReport(item.reports, 2).com +
                        getReport(item.reports, 3).com
                    )
                  }}
                </div>
                <div
                  :class="
                    bgFunc(
                      numberFormat(
                        getReport(item.reports, 0).win +
                          getReport(item.reports, 1).win +
                          getReport(item.reports, 2).win +
                          getReport(item.reports, 3).win +
                          getReport(item.reports, 0).com +
                          getReport(item.reports, 1).com +
                          getReport(item.reports, 2).com +
                          getReport(item.reports, 3).com
                      )
                    )
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).win +
                        getReport(item.reports, 1).win +
                        getReport(item.reports, 2).win +
                        getReport(item.reports, 3).win +
                        getReport(item.reports, 0).com +
                        getReport(item.reports, 1).com +
                        getReport(item.reports, 2).com +
                        getReport(item.reports, 3).com
                    )
                  }}
                </div>
              </div>
              <!-- agentlogin -->
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2" v-else-if="isRoleLevel === 5">
                <div
                  class="cursor-pointer"
                  :class="
                    bgFunc(
                      numberFormat(
                        getReport(item.reports, 0).win +
                          getReport(item.reports, 1).win +
                          getReport(item.reports, 2).win +
                          getReport(item.reports, 3).win +
                          getReport(item.reports, 4).win
                      )
                    )
                  "
                >
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).win +
                        getReport(item.reports, 1).win +
                        getReport(item.reports, 2).win +
                        getReport(item.reports, 3).win +
                        getReport(item.reports, 4).win
                    )
                  }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).com +
                        getReport(item.reports, 1).com +
                        getReport(item.reports, 2).com +
                        getReport(item.reports, 3).com +
                        getReport(item.reports, 4).com
                    )
                  }}
                </div>
                <div
                  :class="
                    bgFunc(
                      numberFormat(
                        getReport(item.reports, 0).win +
                          getReport(item.reports, 1).win +
                          getReport(item.reports, 2).win +
                          getReport(item.reports, 3).win +
                          getReport(item.reports, 4).win +
                          getReport(item.reports, 0).com +
                          getReport(item.reports, 1).com +
                          getReport(item.reports, 2).com +
                          getReport(item.reports, 3).com +
                          getReport(item.reports, 4).com
                      )
                    )
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{
                    numberFormat(
                      getReport(item.reports, 0).win +
                        getReport(item.reports, 1).win +
                        getReport(item.reports, 2).win +
                        getReport(item.reports, 3).win +
                        getReport(item.reports, 4).win +
                        getReport(item.reports, 0).com +
                        getReport(item.reports, 1).com +
                        getReport(item.reports, 2).com +
                        getReport(item.reports, 3).com +
                        getReport(item.reports, 4).com
                    )
                  }}
                </div>
              </div>
              <!-- otherlogin -->
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2" v-else>
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
                v-model="pagination.page"
                :total-visible="7"
                @input="handlePageChange(pagination.page)"
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
  data() {
    return {
      eventSearch: false,
      searchUsername: '',
      pageSizes: [5, 10, 15, 25],
      options: {},
      progressBar: true,
      loadingpage: false,
      fishing: 'FH',
      cardboard: 'CB',

      seen1: true,
      seen2: false,
      seen3: true,
      seen4: false,

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
          width: '120px',
        },
        {
          text: 'Payout',
          value: 'payout',
          sortable: false,
          width: '60px',
          align: 'center',
        },
        {
          text: 'Bet',
          value: 'bet',
          sortable: false,
          width: '60px',
          class: 'text-center',
          align: 'center',
        },

        {
          text: 'turnover',
          value: 'turnover',
          sortable: false,
          width: '60px',
          class: 'text-center',
          align: 'center',
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
    headerCustom() {
      if (this.isRoleLevel === 4) {
        let header = this.headersTable.filter((x) => {
          return x.value !== 'shareWin' && x.value !== 'smartWin'
        })
        return header
      } else if (this.isRoleLevel === 5) {
        let header = this.headersTable.filter((x) => {
          return x.value !== 'shareWin' && x.value !== 'smartWin' && x.value !== 'seniorWin'
        })
        return header
      } else {
        return this.headersTable
      }
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
    getReport(item, level) {
      let result = item.find((x) => x.level === `${level}`)
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
    async userendering(username) {
      if (this.isRoleLevel == 6 || this.isRoleLevel == 5) {
        this.$router.push(`${this.$route.fullPath}?agent_user=${this.$store.state.auth.username}&username=${username}`)
      } else {
        this.$router.push(`${this.$route.fullPath}&username=${username}`)
      }
    },
    providerMap(code) {
      return this.$store.state.report.companyList[code]
    },
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport', 'getUserByAgent']),
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
      this.eventSearch = !this.eventSearch
      this.$emit('tougle', this.eventSearch)
      this.pagination.page = 1
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
          .format(`${dateFormat} ${timeFormat}`)
      )
    },
    handleClickCopy(text) {
      console.log(text)
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      await this.onRequest({
        pagination: this.pagination,
      })
    },
    async handlePageChange(size) {
      this.pagination.page = size
      await this.onRequest({
        pagination: this.pagination,
      })
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
      end: moment(end).format('YYYY-MM-DD HH:mm:ss') + 'Z',
        start: moment(start).format('YYYY-MM-DD HH:mm:ss') + 'Z',
      }
    },
    async onRequest(props) {
      this.isLoading = true
      try {
        const parameters = this.getFilterParameter(props)
        const { data } = await this.getUserByAgent({
          ...parameters,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          id: this.$route.query.share_user ? this.$route.query.share_user : undefined,
          senior_user: this.$route.query.senior_user ? this.$route.query.senior_user : undefined,
          agent_user: this.$route.query.agent_user ? this.$route.query.agent_user : this.$store.state.auth.username,
          role: this.isRoleLevel,
          username: this.searchUsername || this.searchUsername !== '' ? this.searchUsername.toLowerCase() : undefined,
        })

        this.reportdata = data.docs
        this.pagination.rowsNumber = data.pageInfo.total
        let a = this.providerMap(this.reportdata)
        // console.log(a, 'ss')

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
