<template>
  <div>
    <h2>Dashboard</h2>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6">
        <v-card
          ><v-card-title class="black white--text pa-3" dark> Company </v-card-title>
          <div class="pa-3">Company</div>
        </v-card>
      </div>
      <div class="col-12">
        <v-card class="elevation-3">
          <v-tabs background-color="indigo" dark centered flat>
            <v-tab>Sport</v-tab>
            <v-tab>Casino</v-tab>
            <v-tab>Slot</v-tab>
            <v-tab>Horse Racing</v-tab>
            <v-tab>Esport</v-tab>
            <v-tab>Fishing</v-tab>
            <v-tab-item>
              <v-card class="pa-3">
                <v-card-text class="indigo lighten-3 white--text"><h2>Revenue Share</h2> </v-card-text>
                <v-data-table class="elevation-3" :headers="headersProvider" :items="rendering"> </v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      headersProvider: [
        {
          text: 'Provider Name',
          value: 'name',
          cellClass: 'font-weight-bold',
        },
        {
          text: 'Revenue Share(%)',
          value: 'revenueShare',
          align: 'center',
          sortable: false,
          cellClass: 'font-weight-bold',
          width: '200px',
        },
      ],
      rendering: [],
    }
  },
  mounted() {
    this.getProviderRender()
  },
  methods: {
    ...mapActions('account', ['getProvider']),
    async getProviderRender() {
      try {
        let { data } = await this.getProvider()
        console.log(data, 'renderdata')
        this.rendering = data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
