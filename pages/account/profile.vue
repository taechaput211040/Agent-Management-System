<template>
  <v-flex>
    <div>
      <!-- <pre>{{ data }}</pre> -->
      <div>
        <h2>User Profile</h2>
        <div class="mt-3">
          <v-row v-if="$store.state.account.profile">
            <v-col sm="6" md="6" lg="3" cols="12">
              <card-view
                title="Company Name"
                :value="$store.state.account.profile.workspace"
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
          <!-- <provider-share></provider-share> -->
          <!-- <revenue-table></revenue-table> -->
          <!-- <marketshare-table></marketshare-table> -->
        </div>
      </div>
    </div>
    <loading-page v-if="isLoading"></loading-page>
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
      search: '',
      data: undefined,
      isLoading: false,
    }
  },

  methods: {
    ...mapActions('account', ['get_profile']),
  },
}
</script>
