<template>
  <!-- <h2 class="mt-4">Market-Share</h2> -->
  <div class="dl_rendering">
    <div v-if="isLoading" class="loading"><loading-page></loading-page></div>
    <div>
      <v-card-text class="pa-0 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
        <div class="d-flex align-center pa-2">
          <h2>Revenue Share : {{ username || null }}</h2>
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
        :server-items-length="paginationProvider.rowsNumber"
        :page.sync="paginationProvider.page"
        :items-per-page="paginationProvider.rowsPerPage"
        :options.sync="options"
        class="elevation-3"
        :headers="headersProvider"
        hide-default-footer
        :items="rendering"
      >
        <template #[`item.commission`]="{ item }">
          <v-text-field
            dense
            outlined
            type="number"
            v-model="item.commission"
            hide-details="auto"
            :disabled="!item.edit_status"
          ></v-text-field>
        </template>
        <template #[`item.percent`]="{ item }">
          <v-text-field
            dense
            outlined
            :suffix="item.edit_status ? `limit : ${item.percent_limit}` : null"
            v-model="item.percent"
            hide-details="auto"
            :disabled="!item.edit_status"
            type="number"
          ></v-text-field>
        </template>
        <!-- <template #[`item.percent_limit`]="{ item }">
          <v-text-field
            dense
            type="number"
            outlined
            v-model="item.percent_limit"
            hide-details="auto"
            :disabled="!item.edit_status"
          ></v-text-field>
        </template> -->
        <!-- <template #[`item.option_limit`]="{ item }">
          <v-text-field
            dense
            outlined
            type="number"
            v-model="item.option_limit"
            hide-details="auto"
            :disabled="!item.edit_status"
          ></v-text-field>
        </template> -->

        <template #[`item.actions`]="{ item }">
          <v-btn color="primary" small v-if="!item.edit_status" @click="item.edit_status = !item.edit_status"
            >edit</v-btn
          >
          <v-btn color="success" small v-else @click="item.edit_status = !item.edit_status">save</v-btn>
        </template>
      </v-data-table>
      <v-row align="baseline" class="mt-3">
        <v-col cols="12" sm="2">
          <v-select
            dense
            hide-details="auto"
            solo
            v-model="paginationProvider.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChangeProvider"
            label="Items per Page"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10">
          <v-pagination
            v-model="paginationProvider.page"
            :total-visible="7"
            :length="Math.ceil(paginationProvider.rowsNumber / paginationProvider.rowsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import loadingPage from '../form/loadingPage.vue'
export default {
  components: { loadingPage },
  props: {
    username: {
      type: String,
      default: () => undefined,
    },
  },

  data() {
    return {
      isLoading: false,
      pageSizes: [5, 10, 15, 25],
      paginationProvider: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      options: {},
      search: '',
      headersProvider: [
        {
          text: 'code',
          value: 'code',
          align: 'center',
          cellClass: 'font-weight-bold primary--text',
          sortable: false,
          width: '200px',
        },
        {
          text: 'percent',
          value: 'percent',
          align: 'center',
          sortable: false,
          width: '300px',
        },
        // {
        //   text: 'commission',
        //   value: 'commission',
        //   align: 'center',
        //   sortable: false,
        // },
        // {
        //   text: 'option_limit',
        //   value: 'option_limit',
        //   align: 'center',
        //   sortable: false,
        //   width: '300px',
        // },
        {
          text: 'actions',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      rendering: [],
    }
  },
  watch: {
    options: {
      async handler() {
        await this.getRevenueListByuser()
      },
    },
    username() {
      this.setPage()
      this.getRevenueListByuser()
    },
  },

  methods: {
    setPage() {
      this.paginationProvider = {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      }
    },
    ...mapActions('marketshare', ['getRevenueProviderByUser']),
    getParameterProvider() {
      let params = {
        username: this.username,
        page: this.paginationProvider.page,
        limit: this.paginationProvider.rowsPerPage,
      }
      return params
    },
    async getRevenueListByuser() {
      this.isLoading = true
      let parameters = this.getParameterProvider()
      try {
        let { data } = await this.getRevenueProviderByUser(parameters)
        this.paginationProvider.rowsNumber = data.result.count
        this.rendering = data.result.items

        this.rendering = this.rendering.map((object) => {
          return { ...object, edit_status: false }
        })
        console.log(this.rendering, 'statuse')
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    async handlePageSizeChangeProvider(size) {
      this.paginationProvider.page = 1
      this.paginationProvider.rowsPerPage = size
      this.getRevenueListByuser()
    },
  },
}
</script>

<style></style>
