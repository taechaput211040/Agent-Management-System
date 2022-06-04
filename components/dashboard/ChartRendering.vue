<template>
  <div>
    <div class="row pa-0 mt-5">
      <div class="col-sm-8 col-md-4 col-12 pa-0">
        <v-card class="justify-center elevation-1 rounded-lg classtable"
          ><VueApexCharts
            type="radialBar"
            width="100%"
            height="450"
            :options="chartOptions"
            :series="series"
          ></VueApexCharts>
        </v-card>
      </div>
      <div class="col-sm-6 col-md-4 col-12 pa-0">
        <pre> {{ getSummarydata() }}</pre>
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
      series: [44, 55, 67, 83],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 5,
              size: '30%',
              image: undefined,
            },
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249
                },
              },
            },
          },
        },

        stroke: {
          lineCap: 'round',
        },
        colors: ['#3d128b', '#6835c5', '#9155fd', '#c48eff'],
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
      },

      fillter: {
        start: '2022-03-31T17:00:00.000Z',
        end: '2022-06-03T16:59:59.000Z',
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
      return { member: results }
    },
    sumAgent() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.agentWin + item.agentCom)
      }, 0)
      return { agent: results }
    },
    sumSenior() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.seniorWin + item.shareCom)
      }, 0)
      return { senior: results }
    },
    sumShare() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.shareWin + item.shareCom)
      }, 0)
      return { share: results }
    },
    sumOwner() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.ownerWin + item.ownerCom)
      }, 0)
      return { owner: results }
    },
    sumSmartbet() {
      let results = this.dashboardData?.docs?.reduce((initVal, item) => {
        return (initVal += item.smartWin + item.smartCom)
      }, 0)
      return { smart: results }
    },
  },
}
</script>

<style></style>
