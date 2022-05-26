<template>
  <!-- <h2 class="mt-4">Market-Share</h2> -->
  <div>
    <v-card class="elevation-3 mt-3">
      <v-card-text class="pa-0 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
        <div class="d-flex align-center py-2">
          <v-btn color="error" class="mx-2" small @click="$router.go(-1)">back</v-btn>
          <h2>Revenue Share : {{ $route.query.username || null }}</h2>
        </div>

        <v-spacer></v-spacer>
        <div class="col-12 col-sm-4 col-md-3 py-2">
          <v-text-field
            v-model="search"
            label="seacrh"
            append-icon="mdi-magnify"
            dense
            solo
            rounded
            hide-details="auto"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-data-table
        :search="search"
        :server-items-length="pagination.rowsNumber"
        :page.sync="pagination.page"
        :items-per-page="pagination.rowsPerPage"
        :options.sync="options"
        class="elevation-3"
        :headers="headersProvider"
        hide-default-footer
        :items="rendering"
      >
        <template #[`item.revenueShare`]="{ item }">
          <v-text-field
            class="centered-input"
            outlined
            disabled
            filled
            :value="`${item.revenueShare} %`"
            dense
            hide-details="auto"
          ></v-text-field>
        </template>
      </v-data-table>
      <v-row align="baseline mt-3 px-2">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
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
      headersProvider: [
        {
          text: 'code',
          value: 'code',
          cellClass: 'font-weight-bold primary--text',
          sortable: false,
        },
        {
          text: 'percent',
          value: 'percent',
          align: 'center',
          sortable: false,
        },
        {
          text: 'commission',
          value: 'commission',
          align: 'center',
          sortable: false,
        },
        {
          text: 'percent_limit',
          value: 'percent_limit',
          align: 'center',
          sortable: false,
        },
        {
          text: 'option_limit',
          value: 'option_limit',
          align: 'center',
          sortable: false,
        },
      ],
      rendering: [],
    }
  },
  async created() {
    this.getRevenueListByuser()
  },
  watch: {
    options: {
      async handler() {
        await this.getRevenueListByuser()
      },
    },
  },

  methods: {
    ...mapActions('marketshare', ['getRevenueProviderByUser']),
    getParameter() {
      let params = {
        username: this.$route.query.username,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
      }
      return params
    },
    async getRevenueListByuser() {
      let parameters = this.getParameter()
      try {
        let { data } = await this.getRevenueProviderByUser(parameters)
        this.pagination.rowsNumber = data.result.count
        this.rendering = data.result.items
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1
      this.pagination.rowsPerPage = size
      this.getRevenueListByuser()
    },
  },
}
</script>

<style></style>
