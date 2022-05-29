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
          <downline-table></downline-table>
        </v-container>
      </v-row>
    </div>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import DownlineTable from '~/components/downline/DownlineTable.vue'
export default {
  components: { DownlineTable },
  data: () => ({
    isLoading: false,
  }),
}
</script>
