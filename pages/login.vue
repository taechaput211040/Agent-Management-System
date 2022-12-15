<template>
  <v-app>
    <loading-page v-if="isLoading"></loading-page>
    <div class="row form">
      <div class="d-none d-lg-block pa-0 col-lg-7 col overflow-hidden">
        <div class="bg-left"></div>
      </div>
      <div class="d-flex align-center auth-bg col-lg-5 col-12">
        <div class="row pa-md-5 pa-3">
          <div class="mx-auto col-sm-8 col-md-6 col-lg-12 col-12">
            <div class="elevation-0 pa-sm-6 white--text">
              <v-form>
                <div class="justify-center text-center">
                  <img :src="image ? image : this.webPalette.logo" class="img_logo" />
                </div>
                <!-- <div class="justify-center text-center">
                  <img
                    src="https://smart-binary.cloud/storage/smartagent/logo_smartbet.png"
                    class="img_logo"
                    @click="$router.push('/')"
                  />
                </div> -->

                <div class="text-center white--text my-3">
                  <!-- <h1 class="amber--text darken-4">BETKUB COMPANY</h1> -->
                  <h2>Agent Management</h2>
                  <h2>System</h2>
                </div>
                <v-text-field
                  dark
                  color="purple "
                  label="Enter your username"
                  required
                  outlined
                  prepend-inner-icon="mdi-account"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  dark
                  color="purple"
                  label="Enter your password"
                  required
                  outlined
                  :type="hidden ? 'password' : 'text'"
                  @click:append="() => (hidden = !hidden)"
                  v-model="password"
                  :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-inner-icon="mdi-lock"
                  @keyup.enter="login()"
                ></v-text-field>
                <v-btn class="login-Btn" color="#9155fd" x-large block dark @click.prevent="login()">Login</v-btn>
                <v-card-actions class="text--secondary">
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import loadingPage from '~/components/form/loadingPage.vue'
export default {
  components: { loadingPage },
  layout: 'session',
  data() {
    return {
      hidden: String,
      image: '',
      isLoading: false,
      username: '',
      password: '',
      authendata: {},
    }
  },
  async beforeMount() {
    this.checklogin()
  },
  created() {
    this.$vuetify.theme.dark = true
  },
  computed: {
    ...mapState('account', ['webPalette']),
  },
  methods: {
    ...mapMutations('auth', ['set_login']),
    ...mapActions('auth', {
      auth: 'login',
    }),
    async login() {
      this.isLoading = true
      try {
        const response = await this.auth({
          username: this.username,
          password: this.password,
        })
        this.set_login(response.data)
        console.log(response.data)
        if (response.data.key) {
          this.$router.push('/redirect')
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
      this.isLoading = false
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
.bg-left {
  background-image: url('https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-4/assets/auth-v2-login-illustration-dark.c163247b.png');
  background-position: center center;
  background-size: contain;
  background-color: #28243d !important;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: 10px;
  height: 100%;
}
.auth-bg {
  background: #312d4b;
}
.login-Btn {
  box-shadow: 0 0px 0px 0px #9155fd !important;
}
.login-Btn:hover {
  box-shadow: 0 1px 20px 1px #9155fd !important;
}
</style>
