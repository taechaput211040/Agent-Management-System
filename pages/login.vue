<template>
  <v-app dark>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4" id="card-login">
            <v-card color="#385F73" dark>
              <v-card-text>
                <v-form>
                  <v-card-title class="mb-2 text--white">LOGIN : SMARTBET AGENT </v-card-title>
                  <v-divider></v-divider>
                  <v-text-field
                    label="Enter your username"
                    required
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-0"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    label="Enter your password"
                    required
                    v-model="password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                  ></v-text-field>
                  <v-btn class="rounded-2" x-large block rounded dark @click.prevent="login()">Login</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  layout: 'session',
  data() {
    return {
      username: '',
      password: '',
      authendata: {},
    }
  },
  async beforeMount() {
    this.checklogin()
  },
  methods: {
    ...mapMutations('auth', ['set_login']),
    ...mapActions('auth', {
      auth: 'login',
    }),
    async login() {
      try {
        const response = await this.auth({
          username: this.username,
          password: this.password,
        })
        this.set_login(response.data)
        console.log(response.data)
        if (response.data.key) {
          this.$router.push('/')
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
      // const tolog = this.$axios.defaults.headers.common['Authorization']
      // console.log(tolog);
      // const logindata = {
      //   username: this.username,
      //   password: this.password
      // };
    },
    checklogin() {
      const token = localStorage.getItem('key')
      if (token) {
        this.$router.push('/')
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
