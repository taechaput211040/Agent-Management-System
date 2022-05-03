<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container >
          <h3 class="text-center mt-2">Dashboard</h3>
          <div class="ma-3 pa-3  rounded-lg">
            <v-row class="select-item py-2">
              <h4 class="pa-4">ประเภทเกม:</h4>

              <v-col>
                <v-row class="my-2">
                  <v-checkbox
                    class="my-0 mx-1"
                    v-for="(item, index) in groupList"
                    :key="index"
                    v-model="group_select"
                    :value="item.code"
                    hide-details="auto"
                    :label="item.name"
                  ></v-checkbox>
                  <v-checkbox class="my-0 mx-1" v-model="group_select" :value="fishing" label="FISHING" />
                  <v-checkbox class="my-0 mx-1" v-model="group_select" :value="cardboard" label="CARDBOARD" />
                </v-row>
                <v-card-actions>
                  <v-btn
                    v-if="seen1 == true"
                    dark
                    color="teal"
                    size="small"
                    toggle-color="teal"
                    @click="selectall('game')"
                    >เลือกทั้งหมด
                  </v-btn>
                  <v-btn
                    dark
                    v-if="seen2 == true"
                    size="small"
                    color="deep-orange"
                    toggle-color="teal"
                    @click="unselectAll('game')"
                    >ไม่เลือกทั้งหมด
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </div>
          <div class="ma-3 pa-3 rounded-lg">
            <v-row class="select-item py-2">
              <h4 class="pa-4">ผู้ให้บริการ:</h4>

              <v-col>
                <v-row class="my-2">
                  <v-checkbox
                    class="mx-1"
                    v-for="(item, index) in providerList"
                    :key="index"
                    v-model="provider_select"
                    :value="item.code"
                    hide-details="auto"
                    :label="item.name"
                  ></v-checkbox>
                </v-row>
                <v-card-actions>
                  <v-btn
                    v-if="seen3 == true"
                    dark
                    color="teal"
                    size="small"
                    toggle-color="teal"
                    @click="selectall('provider')"
                    >เลือกทั้งหมด
                  </v-btn>
                  <v-btn
                    dark
                    v-if="seen4 == true"
                    size="small"
                    color="deep-orange"
                    toggle-color="teal"
                    @click="unselectAll('provider')"
                    >ไม่เลือกทั้งหมด
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </div>

          <v-row class="select-item py-2">
            <h2 class="px-4">รายงานผลประกอบการ</h2>
          </v-row>
          <div class="rounded-lg ma-3 pa-6 mt-5 row align-baseline">
            <div class="col-10">
              <date-filter-search :filter="dateFilter"></date-filter-search>
            </div>
            <v-btn color="success" @click="$refs.winlose.onSearch()">
              <v-icon left> mdi-magnify </v-icon>
              Search
            </v-btn>
          </div>
          <!-- report admin -->
          <report-winlose
            ref="winlose"
            v-if="this.role <= 2 && !this.$route.query.company && !this.$route.query.share_user"
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-winlose>
          <!-- report admin -->
          <!-- report owner -->
          <report-owner
            v-if="this.role <= 2 && this.$route.query.company && !this.$route.query.share_user"
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-owner>
          <!-- report owner -->
          <!-- report share --><report-share
            v-if="
              (this.role <= 2 &&
                this.$route.query.share_user &&
                !this.$route.query.senior_user &&
                !this.$route.query.senior_user_toagent) ||
              (this.role == 3 && !this.$route.query.senior_user)
            "
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-share>
          <!-- report share -->
          <!-- report senior -->

          <report-agent
            v-if="
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                !this.$route.query.agent_user &&
                !this.$route.query.username) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                !this.$route.query.agent_user &&
                !this.$route.query.username) ||
              (this.role == 4 && !this.$route.query.agent_user && !this.$route.query.username) ||
              (this.role == 5 && !this.$route.query.agent_user && !this.$route.query.username)
            "
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-agent>
          <!-- report member -->
          <report-member
            v-if="
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                !this.$route.query.username) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                !this.$route.query.username) ||
              (this.role == 4 && this.$route.query.agent_user && !this.$route.query.username) ||
              (this.role == 5 && this.$route.query.agent_user && !this.$route.query.username)
            "
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-member>
          <!-- report member -->
          <!-- report senior -->
          <!-- report round -->
          <report-round
            v-if="
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role == 4 &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role == 4 && this.$route.query.username && !this.$route.query.roundId) ||
              (this.role == 5 &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                !this.$route.query.roundId) ||
              (this.role == 6 && !this.$route.query.roundId)
            "
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-round>
          <report-transaction
            v-if="
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                this.$route.query.username &&
                this.$route.query.roundId) ||
              (this.role <= 2 &&
                this.$route.query.share_user &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                this.$route.query.roundId) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                this.$route.query.username &&
                this.$route.query.roundId) ||
              (this.role == 3 &&
                this.$route.query.senior_user &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                this.$route.query.roundId) ||
              (this.role == 4 && this.$route.query.username && this.$route.query.roundId) ||
              (this.role == 4 &&
                this.$route.query.agent_user &&
                this.$route.query.username &&
                this.$route.query.roundId) ||
              (this.role == 5 &&
                this.$route.query.username &&
                this.$route.query.roundId &&
                this.role == 6 &&
                this.$route.query.username &&
                this.$route.query.roundId)
            "
            :group_select="group_select"
            :provider_select="provider_select"
            :dateFilter="dateFilter"
          ></report-transaction>
          <!-- report round -->
        </v-container>
      </v-row>
    </div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ReportAgent from '../components/reportAgent.vue'
import ReportMember from '../components/reportMember.vue'
import ReportOwner from '../components/reportOwner.vue'
import ReportSenior from '../components/reportSenior.vue'
import ReportTransaction from '../components/reportTransaction.vue'
import reportWinlose from '../components/reportWinlose.vue'
export default {
  components: {
    reportWinlose,
    ReportOwner,
    ReportSenior,
    ReportTransaction,
    ReportAgent,
    ReportMember,
  },
  data() {
    return {
      seen1: true,
      seen2: false,
      seen3: true,
      seen4: false,
      isLoading: false,
      provider_select: [],
      providerList: [],
      groupList: [],
      group_select: [],
      fishing: 'FH',
      cardboard: 'CB',
      dateFilter: {
        startDate:
          new Date().getDate() !== 1
            ? new Date().setDate(1)
            : new Date(new Date().getFullYear(), new Date().getMonth() - 1).setDate(1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().setDate(new Date().getDate() - 1),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }
  },
  computed: {
    ...mapState('auth', ['role']),
  },
  async created() {
    try {
      this.loadingpage = true
      this.getProvider()
      this.getGroup()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions('provider', { load_provider: 'load' }),
    ...mapActions('group', ['load_list']),
    ...mapActions('report', ['getAllReport']),
    async getProvider() {
      try {
        const { data } = await this.load_provider()
        if (data) {
          sessionStorage.setItem('provider_list_filter', this.providerList)
          this.providerList = data
          this.provider_code = this.providerList
            .filter((item, index) => this.providerList.findIndex((r) => r.code == item.code) == index)
            .map((x) => x.code)
        }

        this.loadingpage = false
      } catch (ex) {
        console.log(ex)
        this.loadingpage = false
      }
    },
    async getGroup() {
      try {
        const {
          data: { results },
        } = await this.load_list()
        if (results) {
          this.groupList = results.filter((item, index) => results.findIndex((r) => r.code == item.code) == index)

          sessionStorage.setItem('group_list_filter', this.groupList)
        }
      } catch (ex) {
        console.log(ex)
      }
    },
    selectall(typeselect) {
      if (typeselect === 'game') {
        this.group_select = this.groupList
          .filter((item, index) => this.groupList.findIndex((r) => r.code == item.code) == index)
          .map((x) => x.code)
        this.group_select.push(this.fishing, this.cardboard)
        this.seen1 = false
        this.seen2 = true
      } else if (typeselect === 'provider') {
        this.provider_select = this.providerList
          .filter((item, index) => this.providerList.findIndex((r) => r.code == item.code) == index)
          .map((x) => x.code)
        this.seen3 = false
        this.seen4 = true
      }
    },
    unselectAll(typeselect) {
      if (typeselect === 'game') {
        this.group_select = []
        this.seen1 = true
        this.seen2 = false
      } else if (typeselect === 'provider') {
        this.provider_select = []
        this.seen3 = true
        this.seen4 = false
      }
    },
  },
}
</script>
