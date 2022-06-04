<template>
  <div v-if="!rendering.length <= 0">
    <h2 class="mt-4">Market-Share</h2>
    <div class="mt-4">
      <v-card class="elevation-3">
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
        <v-data-table :search="search" class="elevation-3" :headers="headersProvider" :items="rendering">
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
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      search: '',
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
    ...mapActions('account', ['getProvider']),
    async getProviderRender() {
      try {
        let { data } = await this.getProvider()
        this.rendering = data
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
