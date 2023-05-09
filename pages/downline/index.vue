<template>
  <v-flex>
    <!-- header card -->
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <div class="d-sm-flex d-block">
            <h2>Member Management</h2>
            <v-spacer></v-spacer>
          </div>
          <downline-table v-if="Object.keys(this.$route.query).length <= 0"></downline-table>
          <downline-byusertable v-else></downline-byusertable>
        </v-container>
      </v-row>
    </div>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import DownlineByusertable from '~/components/downline/DownlineByusertable.vue'
import DownlineTable from '~/components/downline/DownlineTable.vue'
export default {
  components: { DownlineTable, DownlineByusertable },
  data: () => ({
    isLoading: false,
  }),
}
</script>
