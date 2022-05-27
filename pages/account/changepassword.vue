<template>
  <div>
    <h2 class="text-center mt-5">Change Password</h2>
    <v-row justify="center" align="center" class="mt-8">
      <div class="col-12 col-sm-6">
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-card-title class="mb-2 text--white">Change password </v-card-title>
              <v-divider></v-divider>
              <div class="my-2">
                <v-text-field
                  label="New password"
                  required
                  outlined
                  dense
                  hide-details="auto"
                  color="purple deep-3"
                  v-model="password"
                  :rules="[(v) => !!v || 'Mew Password is required']"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  class="rounded-0"
                ></v-text-field>
              </div>
              <div class="my-2">
                <v-text-field
                  outlined
                  hide-details="auto"
                  dense
                  label="Re-password"
                  required
                  color="purple deep-3"
                  v-model="repassword"
                  prepend-inner-icon="mdi-lock"
                  :rules="[
                    (v) => !!v || 'passwords are not the same ',
                    (v) => (v && v === this.password) || 'กรอกรหัสให้ตรงกัน',
                  ]"
                  type="password"
                  class="rounded-0"
                ></v-text-field>
              </div>

              <v-btn class="rounded-2 mt-2" block rounded dark @click.prevent="changePassword()">Change Password</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      repassword: '',
      password: '',
      authendata: {},
    }
  },
  methods: {
    ...mapActions('auth', ['change_password']),
    async changePassword() {
      if (this.$refs.form.validate()) {
        try {
          console.log('hi')
          await this.change_password(this.password)
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#card-login {
  .v-card__text {
    background: linear-gradient(135deg, #ce9ffc 0%, #7367f0 100%);
  }
}
</style>
