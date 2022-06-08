<template>
  <v-flex>
    <div v-if="!isLoading">
      <!-- <pre>{{ data }}</pre> -->
      <div>
        <h2>User Profile</h2>
        <div class="pa-3">
          <v-divider class="mb-3"></v-divider>
          <v-row class="select-item" v-if="$store.state.account.profile">
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-domain</v-icon>
              <h4 class="px-4">Company Name : {{ $store.state.account.profile.workspace }}</h4>
            </v-col>
            <v-divider vertical class="d-sm-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-domain</v-icon>
              <h4 class="px-4">Company Prefix : {{ $store.state.account.profile.comPrefix }}</h4>
            </v-col>
            <v-divider vertical class="d-md-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-account-box</v-icon>
              <h4 class="px-4">Role : {{ null || $store.state.account.profile.role }}</h4>
            </v-col>
            <v-divider vertical class="d-sm-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-cash</v-icon>
              <h4 class="px-4">Credit Balance : {{ null || $store.state.account.credit }}</h4>
            </v-col>
          </v-row>
          <v-divider class="mt-3"></v-divider>
          <provider-share></provider-share>
          <!-- <revenue-table></revenue-table> -->
          <!-- <marketshare-table></marketshare-table> -->
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import { mapActions } from 'vuex'
import MarketshareTable from '~/components/market-share/MarketshareTable.vue'
import ProviderShare from '~/components/market-share/ProviderShare.vue'
import RevenueTable from '~/components/market-share/RevenueTable.vue'
export default {
  components: { RevenueTable, MarketshareTable, ProviderShare },
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
