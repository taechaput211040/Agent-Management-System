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
          <div class="col-12 col-sm-3 pa-2">
            <v-text-field
              hide-details="auto"
              v-model="formCreate.agentPrefix"
              label="Agent Prefix"
              dense
              :filled="isRoleLevel >= 5"
              :disabled="isRoleLevel >= 5"
              max="2"
              required
              outlined
              :rules="[(v) => !!v || 'Agent Prefix  is required']"
              solo
            >
              <v-tooltip bottom slot="append" v-if="formCreate.agentPrefix.length == 1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :loading="loadingPrefix"
                    @click="checkprefix(formCreate.agentPrefix)"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    fab
                    x-small
                  >
                    <v-icon>mdi-transition</v-icon></v-btn
                  >
                </template>
                <span>Random Prefix</span>
              </v-tooltip>
              <v-tooltip bottom slot="append" v-if="formCreate.agentPrefix.length == 2">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :loading="loadingPrefix"
                    @click="checkprefix(formCreate.agentPrefix)"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    fab
                    x-small
                  >
                    <v-icon>mdi-check-circle</v-icon></v-btn
                  >
                </template>
                <span>Check Prefix</span>
              </v-tooltip>
            </v-text-field>
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
    loadingPrefix: false,
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
      if (this.isRoleLevel >= 5) {
        this.formCreate.agentPrefix =
          this.$store.state.account.profile.agentPrefix || this.$store.state.account.profile.agentPrefix != ''
            ? this.$store.state.account.profile.agentPrefix
            : null
      }
    }
    this.formCreate.role = this.checkRole()
    console.log(this.isRoleLevel, 'use for check agent prefix')
  },
  methods: {
    ...mapActions('account', ['create_SubAccont', 'checkPrefixAgent']),
    async checkprefix(item) {
      console.log(item.length, 'lengthPrefix')
      let parameters = {
        search: item.toLowerCase(),
        limit: 100,
        page: 1,
      }
      this.loadingPrefix = true
      let result
      try {
        let { data } = await this.checkPrefixAgent(parameters)
        console.log(data, 'listdata')
        result = data.docs
      } catch (error) {
        console.log(error)
      }
      this.loadingPrefix = false
      console.log(result, 'rsulte')
      if (item.length == 1) {
        let randomIndex = Math.floor(Math.random() * parseInt(result.length + 1))
        console.log(result[randomIndex], 'random')
        this.formCreate.agentPrefix = result[randomIndex].prefix
      }
      if (item.length == 2) {
        let searchwords = result.find((word) => word.prefix === item)
        if (searchwords)
          this.$swal({
            icon: 'success',
            title: `Agent Prefix นี้สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
        else {
          this.$swal({
            icon: 'error',
            title: `Agent Prefix ${item} นี้ไม่สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
          this.formCreate.agentPrefix = ''
        }
      }
    },
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
