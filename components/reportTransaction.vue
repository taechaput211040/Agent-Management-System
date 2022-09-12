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
      <h2 class="mt-3">Report Transaction</h2>
      <template>
        <v-card class="ma-3 justify-center rounded-lg classtable">
          <v-data-table
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
            :headers="headerCustom"
            :items="reportdata"
            :loading="isLoading"
            hide-default-footer
            loading-text="Loading... Please wait"
          >
            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>

            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.roundId`]="{ item }">
              <span @click="userendering(item.roundId)"> {{ item.roundId }}</span>
            </template>
            <template #[`item.time`]="{ item }">
              <div>start : {{ item.startAt | dateFormat }}</div>
              <div>end : {{ item.endAt | dateFormat }}</div>
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
                    bgFunc(numberFormat(getpercent(item, 5).commissionPayout + getpercent(item, 5).winLosePayout))
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
              <!--seniorlogin -->
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2" v-if="isRoleLevel === 4">
                <div
                  class="cursor-pointer"
                  :class="
                    bgFunc(
                      numberFormat(
                        getpercent(item, 0).winLosePayout +
                          getpercent(item, 1).winLosePayout +
                          getpercent(item, 2).winLosePayout +
                          getpercent(item, 3).winLosePayout
                      )
                    )
                  "
                >
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).winLosePayout +
                        getpercent(item, 1).winLosePayout +
                        getpercent(item, 2).winLosePayout +
                        getpercent(item, 3).winLosePayout
                    )
                  }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).commissionPayout +
                        getpercent(item, 1).commissionPayout +
                        getpercent(item, 2).commissionPayout +
                        getpercent(item, 3).commissionPayout
                    )
                  }}
                </div>
                <div
                  :class="
                    bgFunc(
                      numberFormat(
                        getpercent(item, 0).winLosePayout +
                          getpercent(item, 1).winLosePayout +
                          getpercent(item, 2).winLosePayout +
                          getpercent(item, 3).winLosePayout +
                          getpercent(item, 0).commissionPayout +
                          getpercent(item, 1).commissionPayout +
                          getpercent(item, 2).commissionPayout +
                          getpercent(item, 3).commissionPayout
                      )
                    )
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).winLosePayout +
                        getpercent(item, 1).winLosePayout +
                        getpercent(item, 2).winLosePayout +
                        getpercent(item, 3).winLosePayout +
                        getpercent(item, 0).commissionPayout +
                        getpercent(item, 1).commissionPayout +
                        getpercent(item, 2).commissionPayout +
                        getpercent(item, 3).commissionPayout
                    )
                  }}
                </div>
              </div>
              <!-- agentlogin -->
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2" v-else-if="isRoleLevel === 5">
                <div
                  class="cursor-pointer"
                  :class="
                    bgFunc(
                      numberFormat(
                        getpercent(item, 0).winLosePayout +
                          getpercent(item, 1).winLosePayout +
                          getpercent(item, 2).winLosePayout +
                          getpercent(item, 3).winLosePayout +
                          getpercent(item, 4).winLosePayout
                      )
                    )
                  "
                >
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).winLosePayout +
                        getpercent(item, 1).winLosePayout +
                        getpercent(item, 2).winLosePayout +
                        getpercent(item, 3).winLosePayout +
                        getpercent(item, 4).winLosePayout
                    )
                  }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).commissionPayout +
                        getpercent(item, 1).commissionPayout +
                        getpercent(item, 2).commissionPayout +
                        getpercent(item, 3).commissionPayout +
                        getpercent(item, 4).commissionPayout
                    )
                  }}
                </div>
                <div
                  :class="
                    bgFunc(
                      numberFormat(
                        getpercent(item, 0).winLosePayout +
                          getpercent(item, 1).winLosePayout +
                          getpercent(item, 2).winLosePayout +
                          getpercent(item, 3).winLosePayout +
                          getpercent(item, 4).winLosePayout +
                          getpercent(item, 0).commissionPayout +
                          getpercent(item, 1).commissionPayout +
                          getpercent(item, 2).commissionPayout +
                          getpercent(item, 3).commissionPayout +
                          getpercent(item, 4).commissionPayout
                      )
                    )
                  "
                >
                  <v-chip label x-small color="black" dark class="px-1">W/L+com </v-chip>
                  {{
                    numberFormat(
                      getpercent(item, 0).winLosePayout +
                        getpercent(item, 1).winLosePayout +
                        getpercent(item, 2).winLosePayout +
                        getpercent(item, 3).winLosePayout +
                        getpercent(item, 4).winLosePayout +
                        getpercent(item, 0).commissionPayout +
                        getpercent(item, 1).commissionPayout +
                        getpercent(item, 2).commissionPayout +
                        getpercent(item, 3).commissionPayout +
                        getpercent(item, 4).commissionPayout
                    )
                  }}
                </div>
              </div>
              <!-- otherlogin -->
              <div class="pa-1 card-detail-transaction rounded-lg my-2 elevation-2" v-else>
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
        </v-card>
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
        rowsPerPage: 50,
        rowsNumber: 0,
      },
      reportdata: [],
      isArray: false,
      providerList: [],
      groupList: [],
      isLoading: false,
      headersTable: [
        {
          text: 'id',
          value: 'id',
          cellClass: 'font-weight-bold',
          width: '200px',
          sortable: false,
        },
        {
          text: 'ชื่อเกม',
          value: 'name',
          sortable: false,
          class: 'text-center',
          width: '100px',
        },
        {
          text: 'Bet ID',
          value: 'betId',
          sortable: false,
          class: 'text-center',
          width: '150px',
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
          text: 'time',
          value: 'time',
          sortable: false,
          width: '200px',
          align: 'center',
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
          return x.value !== 'shareWin' && x.value !== 'smartWin' && x.value !== 'providerwin'
        })
        return header
      } else if (this.isRoleLevel === 5) {
        let header = this.headersTable.filter((x) => {
          return (
            x.value !== 'shareWin' && x.value !== 'smartWin' && x.value !== 'seniorWin' && x.value !== 'providerwin'
          )
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
    ...mapGetters('auth', ['isRoleLevel']),
    ...mapState('auth', ['role']),
  },
  async created() {},
  async fetch() {
    this.onSearch()
  },
  methods: {
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
    // async userendering(roundid) {
    //   this.$router.push(`${this.$route.fullPath}&roundId=${roundid}`);
    // },
    providerMap(code) {
      return this.$store.state.report.companyList[code]
    },
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport', 'getTransactionByRound']),
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
        provider: this.provider_select.join(',') ? this.provider_select.join(',') : undefined,
        start: moment(start).format(),
        end: moment(end).format(),
      }
    },
    async onRequest(props) {
      this.isLoading = true
      try {
        const parameters = this.getFilterParameter(props)

        const { data } = await this.getTransactionByRound({
          ...parameters,
          id: this.$route.query.share_user ? this.$route.query.share_user : undefined,
          senior_user: this.$route.query.senior_user ? this.$route.query.senior_user : undefined,
          agent_user: this.$route.query.agent_user ? this.$route.query.agent_user : undefined,
          username: this.$route.query.username ? this.$route.query.username : undefined,
          roundId: this.$route.query.roundId ? this.$route.query.roundId : undefined,
          role: this.isRoleLevel,
        })

        this.reportdata = data
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
