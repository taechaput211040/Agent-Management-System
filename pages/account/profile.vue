<template>
  <v-flex>
    <div>
      <loading-page v-if="isLoading"></loading-page>
      <!-- <pre>{{ data }}</pre> -->
      <div>
        <h2>User Profile</h2>
        <div class="mt-3">
          <v-row v-if="$store.state.account.profile">
            <v-col sm="6" md="6" lg="3" cols="12">
              <card-view
                title="Company Name"
                :value="$store.state.account.profile.company ? $store.state.account.profile.company : `smart`"
                icon="mdi-domain"
              ></card-view>
            </v-col>
            <v-col sm="6" md="6" lg="3" cols="12">
              <card-view
                title="Company Prefix"
                :value="$store.state.account.profile.comPrefix"
                icon="mdi-domain"
              ></card-view>
            </v-col>
            <v-col sm="6" md="6" lg="3" cols="12">
              <card-view title="Role" :value="$store.state.account.profile.role" icon="mdi-account-box"></card-view>
            </v-col>
            <v-col sm="6" md="6" lg="3" cols="12">
              <card-view
                title="Credit Balance"
                :value="null || $store.state.account.credit"
                icon="mdi-cash"
              ></card-view>
            </v-col>
          </v-row>
          <div>
            <h2>ประวัติการโยกเงิน</h2>
            <v-card class="classtable">
              <v-data-table
                class="ma-2"
                :headers="headersHistory"
                :options.sync="options"
                :items="itemHistory.docs"
                :server-items-length="itemHistory.count"
                :footer-props="{
                  showFirstLastPage: true,
                  'items-per-page-text': '',
                  'items-per-page-options': [10, 25, 50, 100],
                }"
              >
                <template #[`item.no`]="{ index }">
                  {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
                </template>
                <template #[`item.credit`]="{ item }"
                  ><div class="font-weight-bold" :class="item.credit > 0 ? 'success--text' : 'error--text'">
                    {{ item.credit | numberFormat }}
                  </div>
                </template>
                <template #[`item.createdAt`]="{ item }"> {{ item.createdAt | dateFormat }} </template></v-data-table
              >
            </v-card>
          </div>
          <!-- <provider-share></provider-share> -->
          <revenue-table
            class="mt-4"
            :downline="true"
            :username="$store.state.auth.username"
            ref="table"
          ></revenue-table>
          <!-- <revenue-table class="mt-4" :username="$store.state.auth.username" ref="table"></revenue-table> -->
          <!-- <marketshare-table></marketshare-table> -->
        </div>
      </div>
    </div>
    <!-- <loading-page v-if="isLoading"></loading-page> -->
  </v-flex>
</template>
<script>
import { mapActions } from 'vuex'
import CardView from '~/components/form/CardView.vue'
import LoadingPage from '~/components/form/loadingPage.vue'
import MarketshareTable from '~/components/market-share/MarketshareTable.vue'
import ProviderShare from '~/components/market-share/ProviderShare.vue'
import RevenueTable from '~/components/market-share/RevenueTable.vue'
export default {
  components: { RevenueTable, MarketshareTable, ProviderShare, LoadingPage, CardView },
  data() {
    return {
      loading: false,
      options: {},
      itemHistory: [],
      headersHistory: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          sortable: false,
        },
        {
          text: 'username',
          value: 'username',
          sortable: false,
        },
        {
          text: 'type',
          value: 'type',
          sortable: false,
        },
        {
          text: 'Credit',
          value: 'credit',
          sortable: false,
        },
        {
          text: 'Date/Time',
          value: 'createdAt',
          sortable: false,
        },
        {
          text: 'Type Ref.',
          value: 'ref.type',
          sortable: false,
        },
        {
          text: 'username ปลายทาง',
          value: 'ref.username',
          sortable: false,
        },
        {
          text: 'role',
          value: 'ref.role',
          sortable: false,
        },
      ],
      search: '',
      data: undefined,
      isLoading: false,
    }
  },
  async fetch() {
    await this.getCreditLog()
  },
  watch: {
    options: {
      handler() {
        this.getCreditLog()
      },
    },
  },
  methods: {
    ...mapActions('account', ['get_profile']),
    ...mapActions('downline', ['getHistoryCredit']),
    ...mapActions('marketshare', ['getRevenueProviderByUser', 'updateMarketsharebyProvider']),

    async getCreditLog() {
      this.isLoading = true
      let params = this.getParameterHistory(this.$store.state.auth.username)
      try {
        let { data } = await this.getHistoryCredit(params)
        this.itemHistory = data.result
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
      this.open_history = true
    },
    getParameterHistory(username) {
      let params = {
        limit: this.options.itemsPerPage,
        page: this.options.page,
        username: username,
        type: undefined,
      }
      return params
    },
  },
}
</script>
