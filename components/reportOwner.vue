<template>
  <v-flex>
    <div class="text-right mx-3">
      <v-btn color="success" @click="onSearch()">
        <v-icon left> mdi-magnify </v-icon>
        Search
      </v-btn>
    </div>

    <div v-if="!loadingpage">
      <v-btn color="red" @click="$router.go(-1)" v-if="isRoleLevel != 2" dark small class="mx-3">Back</v-btn>
      <h2 class="mt-3">Report Company</h2>
      <div class="row pa-3">
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data icon="mdi-account" title="ยอดรวมสมาชิก" :value="sumMember()"></card-data>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data icon="mdi-account-multiple" title="ยอดรวม Agent" :value="sumAgent()"></card-data>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data icon="mdi-clipboard-account" title="ยอดรวม Senior" :value="sumSenior()"></card-data>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data icon="mdi-sale" title="ยอดรวม หุ้นส่วน" :value="sumShare()"></card-data>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data icon="mdi-domain" title="ยอดรวม คอมปะนี" :value="sumOwner()"></card-data>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-2 pa-2">
          <card-data title="ยอดรวม Smartbet" icon="mdi-hexagram" :value="sumSmartbet()"></card-data>
        </div>
      </div>
      <template>
        <v-card class="ma-3 pb-1 justify-center rounded-lg classtable">
          <v-data-table
            hide-default-footer
            :server-items-length="pagination.rowsNumber"
            :items-per-page.sync="pagination.rowsPerPage"
            :page.sync="pagination.page"
            :headers="headersTable"
            :items="reportdata.docs"
            :options.sync="options"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
            <td v-if="isLoading" colspan="100%">
              <div class="center">
                <div class="lds-hourglass"></div>

                <div>loading...</div>
              </div>
            </td>
            <template #[`item._id`]="{ item }">
              <span class="cursor-pointer user_pointer" @click="userendering(item._id)">
                {{ providerMap(item._id) || item._id.share }}
              </span>
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
              <div class="pa-1 rounded-lg card-detail my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.memberWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.memberWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.memberCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.memberCom + item.memberWin))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.memberCom + item.memberWin) }}
                </div>
              </div>
            </template>
            <template #[`item.agentWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.agentWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.agentWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.agentCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.agentCom + item.agentWin))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.agentCom + item.agentWin) }}
                </div>
              </div>
            </template>
            <template #[`item.seniorWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.seniorWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.seniorWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.seniorCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.seniorCom + item.seniorWin))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.seniorCom + item.seniorWin) }}
                </div>
              </div>
            </template>
            <template #[`item.shareWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.shareWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.shareWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.shareCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.shareCom + item.shareWin))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.shareCom + item.shareWin) }}
                </div>
              </div>
            </template>
            <template #[`item.ownerWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.ownerWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.ownerWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.ownerCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.ownerCom + item.ownerWin))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.ownerCom + item.ownerWin) }}
                </div>
              </div>
            </template>
            <template #[`item.smartWin`]="{ item }">
              <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
                <div class="cursor-pointer" :class="bgFunc(numberFormat(item.smartWin))">
                  <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
                  {{ numberFormat(item.smartWin + item.providerWin) }}
                </div>
                <div class="purple--text">
                  <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
                  {{ numberFormat(item.smartCom + item.providerCom) }}
                </div>
                <div :class="bgFunc(numberFormat(item.smartCom + item.smartWin + item.providerWin + item.providerCom))">
                  <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
                  {{ numberFormat(item.smartCom + item.smartWin + item.providerWin + item.providerCom) }}
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
                @input="handlePageChange(pagination.page)"
                v-model="pagination.page"
                :total-visible="7"
                :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
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
import CardData from './form/CardData.vue'
export default {
  components: { CardData },
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
          sortable: false,
        },
        { text: 'Bet', value: 'providerBet', sortable: false },
        { text: 'Turn over', value: 'providerTurn', sortable: false },
        { text: 'Payout', value: 'providerPay', sortable: false },
        {
          text: 'สมาชิก',
          value: 'memberWin',
          sortable: false,
          cellClass: 'text-center',
        },
        {
          text: 'เอเย่น',
          value: 'agentWin',
          sortable: false,
          cellClass: 'text-center',
        },
        {
          text: 'ซิเนียร์',
          value: 'seniorWin',
          sortable: false,
          cellClass: 'text-center',
        },
        {
          text: 'หุ้นส่วน',
          value: 'shareWin',
          sortable: false,
          cellClass: 'text-center',
        },
        {
          text: 'คอมปะนี',
          value: 'ownerWin',
          sortable: false,
          cellClass: 'text-center',
        },
        {
          text: 'SMART BET',
          value: 'smartWin',
          sortable: false,
          cellClass: 'text-center',
        },
      ],
    }
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
  computed: {
    pagination_render() {
      return this.pagination
    },
    numberFormat() {
      return (number, digit = 2, comma = true) => {
        if (typeof number == 'string') {
          number = this.convertToFloat(number)
        }
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: digit,
          maximumFractionDigits: digit,
          useGrouping: comma,
        }).format(number)
      }
    },
    bgFunc() {
      return (inValue) => {
        const value = this.convertToFloat(inValue.replace(/,/g, ''))

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
  },
  async created() {},
  async fetch() {
    this.onSearch()
  },
  methods: {
    sumMember() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.memberWin + item.memberCom)
      }, 0)
      return this.numberFormat(results)
    },
    sumAgent() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.agentWin + item.agentCom)
      }, 0)
      return this.numberFormat(results)
    },
    sumSenior() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.seniorWin + item.shareCom)
      }, 0)
      return this.numberFormat(results)
    },
    sumShare() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.shareWin + item.shareCom)
      }, 0)
      return this.numberFormat(results)
    },
    sumOwner() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.ownerWin + item.ownerCom)
      }, 0)
      return this.numberFormat(results)
    },
    sumSmartbet() {
      let results = this.reportdata?.docs?.reduce((initVal, item) => {
        return (initVal += item.smartWin + item.smartCom + item.providerWin + item.providerCom)
      }, 0)
      return this.numberFormat(results)
    },
    async handlePageSizeChange(size) {
      this.pagination_render.page = 1
      this.pagination_render.rowsPerPage = size
      await this.onRequest({
        pagination: this.pagination_render,
      })
    },
    async handlePageChange(size) {
      this.pagination_render.page = size
      await this.onRequest({
        pagination: this.pagination_render,
      })
    },
    async userendering(user) {
      this.$router.push(`${this.$route.path}?share_user=${user.share}`)
    },
    providerMap(code) {
      return this.$store.state.report.companyList[code]
    },
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport', 'getOwnerByIdV2']),
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

        const { data } = await this.getOwnerByIdV2({
          ...parameters,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          id: this.$route.query.company ? this.$route.query.company : undefined,
          role: this.isRoleLevel,
        })

        this.reportdata = data
        this.pagination.rowsNumber = this.reportdata.pageInfo.total
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
