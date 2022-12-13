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
          <div class="col-12 col-sm-3 pa-1" v-if="$store.state.auth.role != 'OWNER'">
            Agent Prefix
            <v-text-field
              hide-details="auto"
              v-model.trim="formCreate.agentPrefix"
              placeholder="Agent Prefix"
              dense
              autocomplete="username"
              :filled="isRoleLevel >= 5"
              :disabled="isRoleLevel >= 5"
              max="2"
              @keypress="(e) => rangeInput(e, 2, formCreate.agentPrefix)"
              onkeypress="
                return (
                  (event.charCode >= 65 && event.charCode <= 90) ||
                  (event.charCode >= 97 && event.charCode <= 122) ||
                  (event.charCode >= 48 && event.charCode <= 57)
                )
              "
              required
              outlined
              :rules="[(v) => !!v || 'Agent Prefix  is required']"
            >
              <template slot="append" v-if="formCreate.agentPrefix.length == 1">
                <v-btn :loading="loadingPrefix" @click="checkprefix(formCreate.agentPrefix)" dark color="primary" small>
                  Random</v-btn
                >
              </template>
              <template slot="append" v-if="formCreate.agentPrefix.length == 2">
                <v-btn :loading="loadingPrefix" @click="checkprefix(formCreate.agentPrefix)" dark color="primary" small>
                  Check</v-btn
                >
              </template>
            </v-text-field>
          </div>
          <div class="col-12 col-sm-6 pa-1">
            Username
            <v-text-field
              hide-details="auto"
              placeholder="username"
              v-model="formCreate.username"
              :disabled="
                checkRole() !== 'SHAREHOLDER' && !(formCreate.agentPrefix.length > 1 && checktrueProfix != false)
              "
              :prefix="prefixRole + this.formCreate.agentPrefix"
              :rules="[(v) => !!v || 'Username  is required']"
              dense
              outlined
            >
            </v-text-field>
          </div>

          <div class="col-12 col-sm-3 pa-1">
            Role
            <v-text-field
              hide-details="auto"
              filled
              placeholder="role"
              v-model="formCreate.role"
              :value="checkRole()"
              disabled
              dense
              outlined
            ></v-text-field>
          </div>

          <div class="col-12 pa-1">
            Password
            <v-text-field
              placeholder="password"
              v-model="formCreate.password"
              type="password"
              hide-details="auto"
              :rules="[(v) => !!v || 'Password is required']"
              dense
              outlined
              autocomplete="new-password"
            ></v-text-field>
          </div>
          <div class="col-12 pa-1">
            Re-Password
            <v-text-field
              placeholder="Re-password"
              v-model="rePassword"
              type="password"
              :rules="[
                (v) => !!v || 'Re-Passwords is Required ',
                (v) => (v && v === this.formCreate.password) || 'Re-passwords are not the same ',
              ]"
              hide-details="auto"
              dense
              autocomplete="off"
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
    checktrueProfix: false,
    valid: false,
    prefixRole: 'prefix',
    roleToCrate: 'OWNER',
  }),
  watch: {
    'formCreate.agentPrefix'(value) {
      if (value) {
        console.log('+')
        this.formCreate.username = ''
        this.formCreate.password = ''
        this.rePassword = ''
        this.formCreate.isClone = false
        this.$refs.formCreate.resetValidation()
        this.checktrueProfix = false
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['isRoleLevel']),
  },

  async beforeMount() {
    if (this.$store.state.account.profile) {
      this.prefixRole = this.$store.state.account.profile.comPrefix
      this.formCreate.comPrefix = this.$store.state.account.profile.comPrefix
    }
    this.formCreate.role = this.checkRole()
    console.log(this.checkRole(), 'use for check agent prefix')
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
      if (item.length == 1 && result) {
        let randomIndex = Math.floor(Math.random() * parseInt(result.length + 1))
        console.log(result[randomIndex], 'random')
        this.formCreate.agentPrefix = result[randomIndex].prefix
        this.checktrueProfix = false
      }
      if (item.length == 2 && result) {
        let searchwords = result.find((word) => word.prefix === item)
        if (searchwords) {
          this.$swal({
            icon: 'success',
            title: `Agent Prefix นี้สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
          this.checktrueProfix = true
        } else {
          this.$swal({
            icon: 'error',
            title: `Agent Prefix ${item} นี้ไม่สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
          this.formCreate.agentPrefix = ''
          this.checktrueProfix = false
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
          allowOutsideClick: false,
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (this.$store.state.auth.role == 'OWNER') {
              this.formCreate.agentPrefix = undefined
            }
            try {
              let body = {
                username:
                  this.formCreate.comPrefix +
                  (this.formCreate.agentPrefix ? this.formCreate.agentPrefix : '') +
                  this.formCreate.username,
                password: this.formCreate.password,
                role: 'OWNER',
                comPrefix: this.formCreate.comPrefix,
                agentPrefix: this.formCreate.agentPrefix,
                isClone: false,
                groups: [],
              }

              await this.create_SubAccont(body)
              this.$swal({
                icon: 'success',
                title: 'Registered Success',
                showConfirmButton: false,
                allowOutsideClick: false,
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
      let roletoRendering = undefined
      if (this.isRoleLevel == 0) {
        roletoRendering = 'OWNER'
      } else if (this.isRoleLevel == 2) {
        roletoRendering = 'SHAREHOLDER'
      } else if (this.isRoleLevel == 3) {
        roletoRendering = 'SENIOR'
      } else if (this.isRoleLevel == 4) {
        roletoRendering = 'AGENT'
      } else if (this.isRoleLevel == 5) {
        roletoRendering = 'MEMBER'
      } else {
        roletoRendering = undefined
      }
      return roletoRendering
    },
    rangeInput(self, length, itemmodel) {
      // console.log(itemmodel);
      if (itemmodel == undefined) {
        itemmodel = ''
      } else if (/[0-9]|[A-z]/g.test(self.key) && itemmodel.length >= length) {
        self.preventDefault()
      }
    },
  },
}
</script>

<style></style>
