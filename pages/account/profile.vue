<template>
  <v-flex>
    <div v-if="!isLoading">
      <!-- <pre>{{ data }}</pre> -->
      <div>
        <h2>User Profile</h2>
        <div class="pa-3">
          <v-divider class="mb-3"></v-divider>
          <v-row class="select-item" v-if="data">
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-domain</v-icon>
              <h4 class="px-4">Company Name : {{ data.workspace }}</h4>
            </v-col>
            <v-divider vertical class="d-sm-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-domain</v-icon>
              <h4 class="px-4">Company Prefix : {{ data.comPrefix }}</h4>
            </v-col>
            <v-divider vertical class="d-md-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-account-box</v-icon>
              <h4 class="px-4">Role : {{ null || data.role }}</h4>
            </v-col>
            <v-divider vertical class="d-sm-block d-none"></v-divider>
            <v-col sm="6" md="3" cols="12" class="d-flex align-center">
              <v-icon>mdi-cash</v-icon>
              <h4 class="px-4">Credit Balance : {{ null || $store.state.account.credit }}</h4>
            </v-col>
          </v-row>
          <v-divider class="mt-3"></v-divider>
          <!-- <revenue-table></revenue-table> -->
          <marketshare-table></marketshare-table>
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
import RevenueTable from '~/components/market-share/RevenueTable.vue'
export default {
  components: { RevenueTable, MarketshareTable },
  data() {
    return {
      search: '',
      data: undefined,
      isLoading: false,
    }
  },
  async created() {
    const { data } = await this.get_profile()
    this.data = data.result.profile
  },
  methods: {
    ...mapActions('account', ['get_profile']),
  },
}
</script>
