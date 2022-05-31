<template>
  <v-card>
    <div class="d-flex align-center pa-2">
      <v-btn color="error" class="mx-3" small @click="$router.go(-1)">back</v-btn>
      <h2>Add Downline : {{ checkRole() }}</h2>
    </div>

    <v-divider></v-divider>
    <v-form ref="formCreate" v-model="valid">
      <div class="pa-2">
        <div class="row pa-5">
          <div class="col-12 col-sm-6 pa-2">
            <v-text-field
              hide-details="auto"
              label="username"
              v-model="formCreate.username"
              :prefix="prefixRole"
              :rules="[(v) => !!v || 'Username  is required']"
              dense
              outlined
            >
            </v-text-field>
          </div>
          <div class="col-12 col-sm-3 pa-2" >
            <v-text-field
              hide-details="auto"
              v-model="formCreate.agentPrefix"
              label="Agent Prefix"
              dense
              :filled="isRoleLevel >= 4"
              :disabled="isRoleLevel >= 4"
              required
              :rules="[(v) => !!v || 'Agent Prefix  is required']"
              outlined
            ></v-text-field>
          </div>
          <div class="col-12 col-sm-3 pa-2">
            <v-text-field
              hide-details="auto"
              filled
              label="role"
              v-model="formCreate.role"
              :value="checkRole()"
              disabled
              dense
              outlined
            ></v-text-field>
          </div>

          <div class="col-12 pa-2">
            <v-text-field
              label="password"
              v-model="formCreate.password"
              type="password"
              hide-details="auto"
              dense
              outlined
              :rules="[(v) => !!v || 'Password is required']"
            ></v-text-field>
          </div>
          <div class="col-12 pa-2">
            <v-text-field
              label="Re-password"
              v-model="rePassword"
              type="password"
              :rules="[
                (v) => !!v || 'Re-Passwords is Required ',
                (v) => (v && v === this.formCreate.password) || 'Re-passwords are not the same ',
              ]"
              hide-details="auto"
              dense
              outlined
            ></v-text-field>
          </div>
        </div>

        <v-card-actions align="right">
          <v-spacer></v-spacer>
          <v-btn push rounded color="success" @click="registerDownline()">Submit </v-btn>
          <v-btn push rounded color="error" @click="$router.go(-1)">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    rePassword: '',
    formCreate: {
      username: '',
      password: '',
      role: '',
      comPrefix: '',
      agentPrefix: '',
      isClone: false,
      groups: [],
    },
    valid: false,
    prefixRole: 'prefix',
    roleToCrate: 'OWNER',
  }),
  computed: {
    ...mapGetters('auth', ['isRoleLevel']),
  },
  async beforeMount() {
    if (this.$store.state.account.profile) {
      this.prefixRole = this.$store.state.account.profile.comPrefix
      this.formCreate.comPrefix = this.$store.state.account.profile.comPrefix
      this.formCreate.agentPrefix =
        this.$store.state.account.profile.agentPrefix || this.$store.state.account.profile.agentPrefix != ''
          ? this.$store.state.account.profile.agentPrefix
          : null
    }
    this.formCreate.role = this.checkRole()
    console.log(this.isRoleLevel, 'use for check agent prefix')
  },
  methods: {
    ...mapActions('account', ['create_SubAccont']),
    async registerDownline() {
      if (this.$refs.formCreate.validate()) {
        this.$swal({
          title: 'Are you sure you want to register downline?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await this.create_SubAccont(this.formCreate)
              this.$swal({
                icon: 'success',
                title: 'Registered Success',
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  this.$router.push('/downline/downlineManagement')
                }
              })
            } catch (error) {
              this.$swal({
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        })
      }
    },
    checkRole() {
      let role = this.$route.params.role ? this.$route.params.role : undefined
      let roletoRendering = undefined
      if (role === 'ADMIN') {
        roletoRendering = 'OWNER'
      } else if (role === 'OWNER') {
        roletoRendering = 'SHAREHOLDER'
      } else if (role === 'SHAREHOLDER') {
        roletoRendering = 'SENIOR'
      } else if (role === 'SENIOR') {
        roletoRendering = 'AGENT'
      } else if (role === 'AGENT') {
        roletoRendering = 'MEMBER'
      } else {
        roletoRendering = undefined
      }
      return roletoRendering
    },
  },
}
</script>

<style></style>
