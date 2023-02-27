<template>
  <!-- <h2 class="mt-4">Market-Share</h2> -->
  <div class="dl_rendering">
    <div v-if="isLoading" class="loading"><loading-page></loading-page></div>
    <div>
      <v-card-text class="py-2 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
        <div class="d-flex align-center pa-2">
          <h2>Revenue Share : {{ username || null }}</h2>
        </div>

        <v-spacer></v-spacer
        ><v-btn color="purple darken-4" dark @click="settingAllMaximumn" v-show="downline == false"
          >ตั้งค่าสูงสุด</v-btn
        >
      </v-card-text>
      <v-card class="classtable">
        <v-data-table
          :search="search"
          :page.sync="paginationProvider.page"
          :items-per-page.sync="paginationProvider.rowsPerPage"
          :server-items-length="paginationProvider.rowsNumber"
          :headers="downline == false ? headersProvider : headersProvider.filter((x) => x.value !== 'actions')"
          hide-default-footer
          :items="rendering"
        >
          <template #[`item.code`]="{ item }">
            {{ providerName(item.code) || item.code }}
          </template>
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
              v-model.number="item.percent"
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
            <v-btn color="success" small v-else @click="saveConfig(item)">save</v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-row align="baseline" class="mt-3">
        <v-col cols="12" sm="2">
          <v-select
            outlined
            @change="changePageSize"
            hide-details="auto "
            dense
            v-model="paginationProvider.rowsPerPage"
            :items="pageSizes"
            label="รายการต่อหน้า"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10">
          <v-pagination
            @input="pagechange(paginationProvider.page)"
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
    downline: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {},
  data() {
    return {
      isLoading: false,
      pageSizes: [50, 100],
      paginationProvider: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100,
        rowsNumber: 0,
      },
      options: {},
      search: '',
      headersProvider: [
        {
          text: 'Provider',
          value: 'code',
          align: 'center',
          cellClass: 'font-weight-bold primary--text',
          width: '400px',
        },
        {
          text: 'percent(%)',
          value: 'percent',
          align: 'center',
          sortable: false,
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
          width: '200px',
        },
      ],
      rendering: [],
    }
  },
  mounted() {
    this.getRevenueListByuser()
    this.isLoading = false
  },
  watch: {
    username() {
      this.setPage()
      this.getRevenueListByuser()
    },
  },

  methods: {
    providerName(val) {
      let provider = this.$store.state.auth?.provider[val]
      return provider
    },
    changePageSize(size) {
      this.paginationProvider.page = 1
      this.paginationProvider.rowsPerPage = size
      this.getRevenueListByuser()
    },
    pagechange(value) {
      this.paginationProvider.page = value
      this.getRevenueListByuser()
    },
    async saveConfig(item) {
      let bodyConfig = {
        code: item.code,
        username: this.username,
        percent: item.percent,
        commission: 0,
        option: 0,
      }
      this.$swal({
        title: 'Are you sure you want to set Marketshare',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.updateMarketsharebyProvider(bodyConfig)
            this.$swal({
              icon: 'success',
              title: `Success`,
              showConfirmButton: false,
              timer: 1500,
            })
            item.edit_status = !item.edit_status
            await this.getRevenueListByuser()
          } catch (error) {
            item.edit_status = !item.edit_status
            this.$swal({
              icon: 'error',
              title: `${error.response.data.message}`,
              showConfirmButton: false,
              timer: 1500,
            })
            await this.getRevenueListByuser()
          }
        }
      })
      // console.log(item, 'item')

      console.log(bodyConfig, 'save')
    },

    setPage() {
      this.paginationProvider = {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100,
        rowsNumber: 0,
      }
    },
    ...mapActions('marketshare', ['getRevenueProviderByUser', 'updateMarketsharebyProvider']),
    getParameterProvider() {
      let params = {
        username: this.username,
        page: this.paginationProvider.page,
        limit: this.paginationProvider.rowsPerPage,
      }
      return params
    },
    getMainProvider() {
      let params = {
        username: this.$store.state.auth.username,
        page: this.paginationProvider.page,
        limit: this.paginationProvider.rowsPerPage,
      }
      return params
    },
    async getRevenueListByuser() {
      this.isLoading = true
      let parameters = this.getParameterProvider()
      let getMainProvider = this.getMainProvider()
      let { data: mainData } = await this.getRevenueProviderByUser(getMainProvider)
      console.log(mainData, 'main')
      try {
        let { data } = await this.getRevenueProviderByUser(parameters)
        this.rendering = data.result.items
        this.paginationProvider.rowsNumber = data.result.count
        this.rendering = this.rendering.map((object, index) => {
          object.percent_limit = mainData.result.items[index].percent
          return { ...object, edit_status: false }
        })
        this.rendering = this.rendering
          .map((x) => {
            if (this.$store.state.auth.provider[x.code]) {
              return x
            }
          })
          .filter((y) => y)
        this.isLoading = false
      } catch (error) {
        this.rendering = []
        this.isLoading = false
        this.$swal({
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
      this.isLoading = false
    },
    async settingAllMaximumn() {
      this.$swal({
        title: 'Are you sure you want to set to maximum all provider ?',
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true
          try {
            await Promise.all(
              await this.rendering.map(async (items) => {
                let payload = {
                  code: items.code,
                  username: this.username,
                  percent: items.percent_limit,
                  commission: 0,
                  option: 0,
                }
                if (items.percent != items.percent_limit) {
                  await this.updateMarketsharebyProvider(payload)
                  this.isLoading = false
                }
              })
            )
            this.$swal({
              title: 'Update Success!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000,
            }).then(async (result) => {
              if (result) {
                await this.getRevenueListByuser()
              }
            })
          } catch (error) {
            this.isLoading = false
            console.log(error)
          }
        }
      })
    },
  },
}
</script>

<style></style>
