<template>
  <div>
    <v-card class="  mt-3" v-if="!this.$route.query.username">
      <v-card-text class="pa-0 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
        <h2 class="ml-2 py-3">Market Share</h2>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-data-table
        :server-items-length="pagination.rowsNumber"
        :page.sync="pagination.page"
        :items-per-page="pagination.rowsPerPage"
        :search="search"
        class=" "
        :options.sync="options"
        :headers="headers"
        hide-default-footer
        :items="rendering"
      >
        <template #[`item.username`]="{ item }">
          <v-btn text color="primary" class="font-weight-bold">{{ item.username }}</v-btn>
        </template>
      </v-data-table>
      <v-row align="baseline pa-3">
        <v-col cols="12" sm="2">
          <v-select
            dense
            hide-details="auto"
            solo
            v-model="pagination.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChange"
            label="Items per Page"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10">
          <v-pagination
            v-model="pagination.page"
            :total-visible="7"
            :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card>
    <div v-else>
      <revenue-table></revenue-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RevenueTable from './RevenueTable.vue'
export default {
  components: { RevenueTable },
  data() {
    return {
      pageSizes: [5, 10, 15, 25],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      },
      options: {},
      search: '',
      headers: [
        {
          text: 'username',
          value: 'username',
          cellClass: 'font-weight-bold primary--text',
        },
        {
          text: 'role',
          value: 'role',
          align: 'center',
          sortable: false,
          cellClass: 'font-weight-bold',
          width: '150px',
        },
      ],
      rendering: [],
    }
  },
  mounted() {
    this.getMember()
  },
  watch: {
    options: {
      async handler() {
        await this.getMember()
      },
    },
  },
  methods: {
    ...mapActions('marketshare', ['getMemberMarketShare']),
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getMember()
    },

    getParameter() {
      let params = {
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
      }
      return params
    },
    async getMember() {
      try {
        let parameters = this.getParameter()
        let { data } = await this.getMemberMarketShare(parameters)
        this.rendering = data.result.items
        this.pagination.rowsNumber = data.result.count
        this.rendering = this.rendering.filter((x) => {
          return x.level > 0
        })
        console.log(this.rendering, 'sasa')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
