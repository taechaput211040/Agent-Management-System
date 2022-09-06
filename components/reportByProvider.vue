<template>
  <div>
    <div class="text-right mx-3">
      <v-btn color="success" @click="onSearch()">
        <v-icon left> mdi-magnify </v-icon>
        Search
      </v-btn>
    </div>
    <v-card class="ma-3 pb-1 justify-center rounded-lg classtable">
      <v-data-table
        :server-items-length="pagination.rowsNumber"
        :items-per-page.sync="pagination.rowsPerPage"
        :page.sync="pagination.page"
        :items="randerReport"
        hide-default-footer
        :loading="isLoading"
        :headers="headerProvider"
      >
        <template #[`item._id`]="{ item }">
          <span class="cursor-pointer">
            {{ providerName(item._id) || item._id }}
          </span>
        </template>
        <template #[`item.provider`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.pnWin > 0 }, { 'error--text': item.pnWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.pnWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.ptCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.pnWin + item.ptCom > 0 },
                { 'error--text': item.pnWin + item.ptCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.pnWin + item.ptCom) | numberFormat }}
            </div>
          </div>
        </template>
        <template #[`item.member`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.memWin > 0 }, { 'error--text': item.memWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.memWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.memCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.memWin + item.memCom > 0 },
                { 'error--text': item.memWin + item.memCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.memWin + item.memCom) | numberFormat }}
            </div>
          </div>
        </template>
        <template #[`item.agent`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.agWin > 0 }, { 'error--text': item.agWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.agWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.agCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.agWin + item.agCom > 0 },
                { 'error--text': item.agWin + item.agCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.agWin + item.agCom) | numberFormat }}
            </div>
          </div>
        </template>
        <template #[`item.share`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.shWin > 0 }, { 'error--text': item.shWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.shWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.shCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.shWin + item.shCom > 0 },
                { 'error--text': item.shWin + item.shCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.shWin + item.shCom) | numberFormat }}
            </div>
          </div>
        </template>
        <template #[`item.company`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.owWin > 0 }, { 'error--text': item.owWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.owWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.owCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.owWin + item.owCom > 0 },
                { 'error--text': item.owWin + item.owCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.owWin + item.owCom) | numberFormat }}
            </div>
          </div>
        </template>
        <template #[`item.smart`]="{ item }">
          <div class="pa-1 card-detail rounded-lg my-2 elevation-2">
            <div
              class="cursor-pointer"
              :class="[{ 'success--text': item.ptWin > 0 }, { 'error--text': item.ptWin < 0 }]"
            >
              <v-chip label x-small color="primary" dark class="px-1">W/L</v-chip>
              {{ item.ptWin | numberFormat }}
            </div>
            <div class="purple--text">
              <v-chip label x-small color="purple" dark class="px-1">com</v-chip>
              {{ item.ptCom | numberFormat }}
            </div>
            <div
              :class="[
                { 'success--text': item.ptWin + item.ptCom > 0 },
                { 'error--text': item.ptWin + item.ptCom < 0 },
              ]"
            >
              <v-chip label x-small color="black" dark class="px-1">W/L+com</v-chip>
              {{ (item.ptWin + item.ptCom) | numberFormat }}
            </div>
          </div>
        </template>
      </v-data-table>
      <v-row align="baseline" class="ma-3">
        <v-col cols="12" sm="2">
          <v-select
            dense
            solo
            hide-details="auto"
            v-model="pagination.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChange"
            label="Items per Page"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination
            v-model="pagination.page"
            @input="handlePageChange(pagination.page)"
            :total-visible="7"
            :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          ></v-pagination>
        </v-col> </v-row
    ></v-card>
  </div>
</template>

<script>
import * as moment from 'moment'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      pageSizes: [10, 20, 50],
      randerReport: [],
      isLoading: false,
      pagination: {
        sortBy: 'desc',
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      headerProvider: [
        {
          text: 'Provider Name',
          value: '_id',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },

        {
          text: 'member',
          value: 'member',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
        {
          text: 'agent',
          value: 'agent',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
        {
          text: 'หุ้นส่วน',
          value: 'share',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
        {
          text: 'คอมปะนี',
          value: 'company',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
        {
          text: 'SMARTBET',
          value: 'smart',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Provider',
          value: 'provider',
          cellClass: 'font-weight-bold',
          sortable: false,
          align: 'center',
        },
      ],
    }
  },
  props: {
    dateFilter: {
      type: [Array, Object],
      default: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  },
  async mounted() {
    await this.getReportdata()
  },
  methods: {
    providerName(val) {
      let provider = this.$store.state.auth?.provider[val]
      return provider
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getReportdata()
    },
    async handlePageChange(size) {
      this.pagination.page = size
      this.getReportdata()
    },
    ...mapActions('report', ['getProviderReport']),
    onSearch() {
      this.getReportdata()
    },
    getDateTime(date, time) {
      let dateFormat = 'YYYY-MM-DD'
      let timeFormat = 'HH:mm:ss'
      return (
        moment(`${moment(date).format(dateFormat)} ${moment(time).format(timeFormat)}`, 'YYYY-MM-DD HH:mm:ss')
          .utc()
          .format(`${dateFormat} ${timeFormat}`) + 'Z'
      )
    },
    getParameter(params = undefined) {
      let start = undefined
      let end = undefined
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(this.dateFilter.startDate, this.dateFilter.startTime)
        } else {
          start = this.getDateTime(this.dateFilter.startDate, new Date().setHours(0, 0, 0, 0))
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(this.dateFilter.endDate, this.dateFilter.endTime)
        } else {
          end = this.getDateTime(this.dateFilter.endDate, new Date().setHours(23, 59, 59, 999))
        }
      }
      params = {
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
        limit: this.pagination.rowsPerPage ? this.pagination.rowsPerPage : undefined,
        page: this.pagination.page ? this.pagination.page : undefined,
      }
      return params
    },
    async getReportdata() {
      this.isLoading = true
      let params = this.getParameter()
      try {
        let { data } = await this.getProviderReport(params)
        this.randerReport = data[0].docs
        this.pagination.rowsNumber = data[0].pageInfo[0].total
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
      this.isLoading = false
    },
  },
}
</script>

<style></style>
