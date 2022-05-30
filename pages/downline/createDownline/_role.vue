<template>
  <v-card>
    <div class="d-flex align-center pa-2">
      <v-btn color="error" class="mx-3" small @click="$router.go(-1)">back</v-btn>
      <h2>Add Downline : {{ this.$route.params.role }}</h2>
    </div>

    <v-divider></v-divider>

    <div class="pa-2">
      <v-form ref="form" v-model="valid">
        <div class="row pa-5">
          <div class="col-12 col-sm-6 pa-2">
            <v-text-field hide-details="auto" label="username" :prefix="prefixRole" dense outlined> </v-text-field>
          </div>
          <div class="col-12 col-sm-3 pa-2">
            <v-text-field
              hide-details="auto"
              filled
              label="role"
              :value="roleToCrate"
              disabled
              dense
              outlined
            ></v-text-field>
          </div>
          <div class="col-12 col-sm-6 pa-2">
            <v-text-field hide-details="auto" label="Name" dense outlined></v-text-field>
          </div>
          <div class="col-12 col-sm-6 pa-2">
            <v-text-field label="Credit" type="number" hide-details="auto" dense outlined></v-text-field>
          </div>
          <div class="col-12 col-sm-6 pa-2">
            <v-text-field label="phone" hide-details="auto" dense outlined></v-text-field>
            <!-- <v-text-field v-model="vtime" ></v-text-field> -->
          </div>
          <div class="col-12 pa-2">
            <v-text-field label="password" type="password" hide-details="auto" dense outlined></v-text-field>
          </div>
          <div class="col-12 pa-2">
            <v-text-field label="Re-password" type="password" hide-details="auto" dense outlined></v-text-field>
          </div>
        </div>
      </v-form>

      <v-card-actions align="right">
        <v-spacer></v-spacer>
        <v-btn push rounded color="success">Submit </v-btn>
        <v-btn push rounded color="error" @click="modal_add = false">Cancel</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    formCreate: {
      username: '',
      password: '',
      role: 'OWNER',
      comPrefix: '',
      agentPrefix: '',
      isClone: true,
      groups: [],
    },
    prefixRole: 'prefix',
    roleToCrate: 'OWNER',
  }),
  created() {
    console.log(this.$route.params.role)
  },
  methods: {
    ...mapActions('account', ['create_SubAccont']),
  },
}
</script>

<style></style>
