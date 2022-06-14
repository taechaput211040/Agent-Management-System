<template>
  <v-card>
    <div class="d-flex align-center pa-1">
      <v-btn color="error" class="mx-3" small @click="$router.go(-1)">back</v-btn>
      <h2>Add Owner</h2>
    </div>

    <v-divider></v-divider>
    <v-form ref="formCreate" v-model="valid">
      <div class="pa-2">
        <div class="row pa-5">
          <div class="col-12 col-sm-6 pa-1">
            <small class="font-weigh-bold">Username</small>
            <v-text-field
              hide-details="auto"
              label="username"
              v-model="formCreate.username"
              :rules="[(v) => !!v || 'Username  is required']"
              dense
              outlined
            >
            </v-text-field>
          </div>
          <div class="col-12 col-sm-6 col-md-2 pa-1">
            <small class="font-weigh-bold error--text">**กรอกอย่างน้อย1ตัวอักษรเพื่อสุ่ม Prefix</small>
            <v-text-field
              hide-details="auto"
              v-model="formCreate.comPrefix"
              label="Owner Prefix"
              dense
              @keyup.enter="checkprefix(formCreate.comPrefix)"
              @keypress="(e) => rangeInput(e, 2, formCreate.comPrefix)"
              onkeypress="
                return (
                  (event.charCode >= 65 && event.charCode <= 90) ||
                  (event.charCode >= 97 && event.charCode <= 122) ||
                  (event.charCode >= 48 && event.charCode <= 57)
                )
              "
              required
              outlined
              :rules="[(v) => !!v || 'กรอก Prefix อย่างน้อย 1 ตัวอักษร']"
              solo
            >
              <template slot="append" v-if="formCreate.comPrefix.length == 1">
                <v-btn :loading="loadingPrefix" @click="checkprefix(formCreate.comPrefix)" dark color="primary" small>
                  Random</v-btn
                >
              </template>
              <template slot="append" v-if="formCreate.comPrefix.length == 2">
                <v-btn :loading="loadingPrefix" @click="checkprefix(formCreate.comPrefix)" dark color="primary" small>
                  Check</v-btn
                >
              </template>
            </v-text-field>
          </div>

          <div class="col-12 pa-1">
            <small class="font-weigh-bold">Password</small>
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
          <div class="col-12 pa-1">
            <small class="font-weigh-bold">Re-Password</small>
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
      role: 'OWNER',
      comPrefix: '',
      agentPrefix: undefined,
      isClone: false,
      groups: [],
    },
    valid: false,
  }),
  computed: {
    ...mapGetters('auth', ['isRoleLevel']),
  },

  async beforeMount() {},
  methods: {
    ...mapActions('account', ['create_SubAccont', 'checkPrefixOwner']),
    async checkprefix(item) {
      let parameters = {
        search: item.toLowerCase(),
        limit: 100,
        page: 1,
      }
      this.loadingPrefix = true
      let result
      try {
        let { data } = await this.checkPrefixOwner(parameters)
        result = data.docs
      } catch (error) {
        console.log(error)
      }
      this.loadingPrefix = false
      if (item.length == 1) {
        let randomIndex = Math.floor(Math.random() * parseInt(result.length + 1))
        this.formCreate.comPrefix = result[randomIndex].prefix
      }
      if (item.length == 2) {
        let searchwords = result.find((word) => word.prefix === item.toLowerCase())
        if (searchwords) {
          this.formCreate.comPrefix = item.toLowerCase()
          this.$swal({
            icon: 'success',
            title: `OWNER Prefix นี้สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
        } else {
          this.$swal({
            icon: 'error',
            title: `OWNER Prefix  นี้ไม่สามารถใช้ได้`,
            showConfirmButton: false,
            timer: 1000,
          })
          this.formCreate.comPrefix = ''
        }
      }
    },
    rangeInput(self, length, itemmodel) {
      // console.log(itemmodel);
      if (itemmodel == undefined) {
        itemmodel = ''
      } else if (/[0-9]|[A-z]/g.test(self.key) && itemmodel.length >= length) {
        self.preventDefault()
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
            // console.log(this.formCreate)
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
  },
}
</script>

<style></style>
