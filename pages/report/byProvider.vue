<template>
  <div>
    <h2 class="text-center">Report By Provider</h2>
    <div class="rounded-lg ma-3 mt-5 row align-baseline">
      <div class="col-12 pa-3">
        <date-filter-search :filter="dateFilter"></date-filter-search>
      </div>
    </div>
    <report-by-provider :dateFilter="dateFilter"></report-by-provider>
  </div>
</template>
<script>
import DateFilterSearch from '~/components/DateFilterSearch.vue'
export default {
  components: { DateFilterSearch },
  data() {
    return {
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
}
</script>
<style></style>
