<template>
  <div>
    <loading-page v-if="isLoading"></loading-page>
    <div v-if="!rendering.length <= 0">
      <h2 class="mt-4">Market-Share</h2>
      <!-- {{ options }} -->
      <div class="mt-4">
        <v-card class="elevation-3 classtable">
          <v-card-text class="pa-0 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
            <h2 class="ml-2 pt-3">Revenue Share</h2>
            <v-spacer></v-spacer>
            <div class="col-12 col-sm-4 col-md-3">
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
            :options.sync="options"
            class="elevation-3"
            :items-per-page.sync="options.itemsPerPage"
            :page.sync="options.page"
            :headers="headersProvider"
            hide-default-footer
            :items="rendering"
          >
            <template #[`item.name`]="{ item }">
               {{ providerName(item.code) || item.code }}
            </template>
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
          <v-row align="baseline" class="ma-3">
            <v-col cols="12" sm="2" lg="2" xl="1">
              <v-select
                outlined
                hide-details="auto "
                dense
                v-model="options.itemsPerPage"
                :items="pageSizes"
                label="รายการต่อหน้า"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="10" lg="10">
              <v-pagination
                v-model="options.page"
                :total-visible="7"
                :length="Math.ceil(rendering.length / options.itemsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import loadingPage from '../form/loadingPage.vue'
export default {
  components: { loadingPage },
  data() {
    return {
      isLoading: false,
      search: '',
      options: {},
      pageSizes: [10, 30, 50 , 100],
      headersProvider: [
        {
          text: 'Provider Name',
          value: 'name',
          cellClass: 'font-weight-bold primary--text',
        },
        {
          text: 'Revenue Share(%)',
          value: 'revenueShare',
          align: 'center',
          sortable: false,
          cellClass: 'font-weight-bold',
          width: '150px',
        },
      ],
      rendering: [],
    }
  },
  async created() {
    this.getProviderRender()
  },
  methods: {
     providerName(val) {
      let provider = this.$store.state.auth?.provider[val]
      return provider
    },
    ...mapActions('account', ['getProvider']),
    async getProviderRender() {
      this.isLoading = true
      try {
        let { data } = await this.getProvider()
        this.rendering = data
        this.rendering = this.rendering
          .map((x) => {
            if (this.$store.state.auth.provider[x.code]) {
              return x
            }
          })
          .filter((y) => y)
      } catch (error) {
        console.log(error)
        this.rendering = []
      }
      this.isLoading = false
    },
  },
}
</script>

<style></style>
