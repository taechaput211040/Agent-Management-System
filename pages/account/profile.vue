<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">User Profile</h1>

          <v-card class="pa-6" v-if="data">
            <v-row class="select-item py-2">
              <h2 class="px-4">User Profile</h2>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row class="select-item py-2">
              <v-col md="4" cols="12">
                <h4 class="px-4">Company Name : {{ data.workspace }}</h4>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col md="4" cols="12">
                <h4 class="px-4">Company Prefix : {{ data.comPrefix }}</h4>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col md="4" cols="12">
                <h4 class="px-4">Role : {{ data.role }}</h4>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
          </v-card>
        </v-container>
      </v-row>
    </div>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      data: undefined,
      isLoading: true,
    }
  },
  async created() {
    const { data } = await this.get_profile()
    this.data = data.result.profile
    this.isLoading = false
  },
  methods: {
    ...mapActions('account', ['get_profile']),
  },
}
</script>