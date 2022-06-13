<template>
  <div>
    <div class="row justify-center mt-5">
      <div class="col-sm-7 col-md-6 col-12">
        <v-card class="rounded-lg pa-3">
          <v-card-title class="pa-1 mb-2">Total Summary <v-spacer></v-spacer></v-card-title>
          <VueApexCharts
            width="100%"
            ref="realtimeChart"
            height="500"
            :options="chartOptions"
            :series="series"
          ></VueApexCharts>
        </v-card>
      </div>
      <div class="col-sm-5 col-md-6 col-12">
        <div class="row pa-0">
          <div class="col-12">
            <v-card height="100%" class="rounded-lg">
              <v-card-title class="justify">
                <v-avatar color="rgb(145 85 253 / 28%)" rounded size="49"
                  ><v-icon x-large color="#9155fd">mdi-currency-usd</v-icon></v-avatar
                ><v-spacer></v-spacer>
                <h3>Credit</h3>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="text-right">
                <h1 class="mt-5">
                  {{ $store.state.account.credit | numberFormat }}
                </h1>
              </v-card-text>
            </v-card>
          </div>
          <div class="col-12">
            <v-card class="rounded-lg">
              <v-card-title class="pa-4 font-weight-bold"
                >Total Summary <v-spacer></v-spacer
                ><v-btn
                  small
                  text
                  rounded
                  color="primary"
                  class="font-weight-bold"
                  @click.stop="$router.push('/report/byUser')"
                  >view all</v-btn
                ></v-card-title
              >
              <v-divider></v-divider>
              <div class="pa-4">
                <div class="row">
                  <div class="col-6 font-weight-bold purple--text">
                    <v-chip color="rgb(145 85 253 / 28%)" label>Role</v-chip>
                  </div>
                  <div class="col-6 text-right font-weight-bold">
                    <v-chip color="rgb(145 85 253 / 28%)" label>W/L+Com.</v-chip>
                  </div>
                </div>

                <div class="renderDashboard row" v-for="(item, i) in getSummarydata()" :key="i">
                  <div class="col-6 font-weight-bold">{{ i }}</div>
                  <div class="col-6 text-right">{{ item | numberFormat }}</div>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapState, mapActions } from 'vuex'
export default {
  components: { VueApexCharts },
  data() {
    return {
      series: [{ name: 'จำนวนยอด', data: [] }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            borderRadius: 15,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        yaxis: {
          show: false,
        },
        fill: {
          type: 'solid',
          fillOpacity: 0.7,
        },
      },

      fillter: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date(),
      },
      dataObject: {
        datain: {
          mama: 10,
        },
      },
    }
  },
  computed: {
    ...mapState('report', ['dashboardData']),
  },
  async beforeMount() {
    await this.getReportSummary()
    await this.getSummarydata()
    await this.mapChartData()
  },
  methods: {
    ...mapActions('report', ['getAllByDashboard']),
    getParameter() {
      let parameters = {
        start: this.fillter.start,
        end: this.fillter.end,
      }
      return parameters
    },
    mapChartData() {
      this.series[0].data = []
      let realtimeData = this.getSummarydata()
      for (let key in realtimeData) {
        this.series[0].data.push({ x: key, y: realtimeData[key] < 0 ? realtimeData[key] * -1 : realtimeData[key] })
      }
      this.$refs.realtimeChart.updateSeries(this.series, false, true)
    },

    async getReportSummary() {
      try {
        if (this.dashboardData) {
          return
        }
        let params = this.getParameter()
        await this.getAllByDashboard(params)
      } catch (error) {
        console.log(error)
      }
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
      return { owner: parseFloat(results).toFixed(2) }
    },
    sumSmartbet() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.smartWin + item.smartCom)
      }, 0)
      return { smart: parseFloat(results).toFixed(2) }
    },
  },
}
</script>

<style></style>
