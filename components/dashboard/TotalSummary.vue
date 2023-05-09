<template>
  <div class="my-5 pa-3">
    <h2>
      Total winlose by :
      <v-chip color="success" outlined label class="font-italic font-weight-bold">{{
        this.$store.state.auth.username
      }}</v-chip>
    </h2>
    <div class="py-3 row justify-center mt-2">
      <div
        class="col-12 col-sm-4 col-md-4 col-lg-2"
        :class="[{ 'col-lg-4': isRoleLevel === 5 }, { 'col-lg-3': isRoleLevel === 4 }]"
        v-for="(item, i) in getSummarydata()"
        :key="i"
      >
        <v-card class="pa-3 rounded-lg">
          <div class="font-weight-bold text-center">{{ i }}</div>
          <div class="text-center my-2" :class="[{ 'green--text darken-3': item > 0 }, { 'error--text': item < 0 }]">
            <v-progress-circular v-if="isLoading" indeterminate color="blue-grey"></v-progress-circular>
            <h2 v-else>{{ item | numberFormat }}</h2>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as moment from 'moment'
export default {
  props: {
    event: true,
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
  computed: {
    ...mapGetters('auth', ['isRoleLevel']),
  },
  watch: {
    event: {
      handler: function (val) {
        this.getReportSummary()
      },

      deep: true,
    },
  },
  data() {
    return {
      isLoading: false,
      dashboardData: {},
    }
  },

  async mounted() {
    await this.getReportSummary()
  },
  methods: {
    ...mapActions('report', ['getAllByDashboard']),
    getDateTime(date, time) {
      let dateFormat = 'YYYY-MM-DD'
      let timeFormat = 'HH:mm:ss'
      return moment(`${moment(date).format(dateFormat)} ${moment(time).format(timeFormat)}`, 'YYYY-MM-DD HH:mm:ss')
        .utc()
        .format(`${dateFormat} ${timeFormat}`)
    },
    getParameter() {
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
        typeCode: this.group_select.join(',') ? this.group_select.join(',') : undefined,
        provider: this.provider_select.join(',') ? this.provider_select.join(',') : undefined,
        end: moment(end).format('YYYY-MM-DD HH:mm:ss') + 'Z',
        start: moment(start).format('YYYY-MM-DD HH:mm:ss') + 'Z',
      }
    },
    async getReportSummary() {
      this.isLoading = true
      try {
        let params = this.getParameter()
        let { data } = await this.getAllByDashboard(params)
        this.dashboardData = data
        await this.getSummarydata()
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
      this.isLoading = false
    },
    getSummarydata() {
      let graphData = {
        ...this.sumMember(),
        ...this.sumAgent(),
        ...this.sumSenior(),
        ...this.sumShare(),
        ...this.sumOwner(),
        ...this.sumSmartbet(),
      }
      if (this.isRoleLevel == 4) {
        graphData = {
          ...this.sumMember(),
          ...this.sumAgent(),
          ...this.sumSenior(),
          company:
            parseFloat(this.sumOwner().company) +
            parseFloat(this.sumSmartbet().smart) +
            parseFloat(this.sumShare().share),
        }
      } else if (this.isRoleLevel == 5) {
        graphData = {
          ...this.sumMember(),
          ...this.sumAgent(),
          ...this.sumSenior(),
          senior:
            parseFloat(this.sumSenior().senior) +
            parseFloat(this.sumOwner().company) +
            parseFloat(this.sumSmartbet().smart) +
            parseFloat(this.sumShare().share),
        }
      }
      return graphData
    },
    sumMember() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.memberWin + item.memberCom)
      }, 0)
      return { member: parseFloat(results).toFixed(2) }
    },
    sumAgent() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.agentWin + item.agentCom)
      }, 0)
      return { agent: parseFloat(results).toFixed(2) }
    },
    sumSenior() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.seniorWin + item.shareCom)
      }, 0)
      return { senior: parseFloat(results).toFixed(2) }
    },
    sumShare() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.shareWin + item.shareCom)
      }, 0)
      return { share: parseFloat(results).toFixed(2) }
    },
    sumOwner() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.ownerWin + item.ownerCom)
      }, 0)
      return { company: parseFloat(results).toFixed(2) }
    },
    sumSmartbet() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.smartWin + item.smartCom + item.providerWin + item.providerCom)
      }, 0)
      return { smart: parseFloat(results).toFixed(2) }
    },
  },
}
</script>

<style></style>
