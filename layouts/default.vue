<template>
  <v-app>
    <v-app-bar clipped-left class="elevation-1" color="white" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <img
        src="https://smart-binary.cloud/storage/smartagent/logo_smartbet.png"
        class="img_logo"
        @click="$router.push('/')"
      />
      <v-spacer />
      <div class="d-none d-sm-block">
        <v-btn icon @click.prevent="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
        <v-chip rounded outlined class="mx-1"
          >{{ $store.state.account.credit | numberFormat }}<v-icon right>mdi-cash</v-icon></v-chip
        >
      </div>

      <!-- <v-speed-dial direction="bottom left" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-btn @click.prevent="switchBackToAdmin">Back To Admin</v-btn>
        <v-btn @click.prevent="switch_auth = true">Swith</v-btn>
        <v-btn @click="logout" fab dark small color="red">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial> -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small v-bind="attrs" v-on="on" rounded outlined>
            <v-icon left>mdi-account-circle</v-icon>{{ $store.state.auth.username }}
            <v-icon small class="hidden-sm-and-down" right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.prevent="switchBackToAdmin" v-show="isStaff">
            <v-list-item-icon>
              <v-icon>mdi-shield-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Back To Admin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.prevent="switch_auth = true" v-show="isStaff">
            <v-list-item-icon>
              <v-icon>mdi-account-switch</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Switch</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.prevent="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app dark fixed>
      <v-card class="d-block d-sm-none elevation-3 mx-3 mt-3">
        <v-card-text>
          <div style="justify-content: space-between; display: flex">
            <v-chip rounded outlined class="ma-1">User : {{ $store.state.auth.username }}</v-chip>

            <v-btn class="ma-1" icon @click.prevent="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-icon class="mx-2">{{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-weather-night' }}</v-icon>
            </v-btn>
          </div>

          <v-chip rounded outlined class="ma-1">Credit : {{ $store.state.account.credit | numberFormat }}</v-chip>
        </v-card-text>
      </v-card>
      <v-list nav dense class="mt-5">
        <div v-for="(link, i) in navigationMenu" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :disabled="link.status == 2"
            :to="link.to"
            class="v-list-item class-menu pa-1 font-weight-bold"
            active-class="bg-primary-grediaun"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="link.title" />
            <v-badge
              color="error"
              right
              style="z-index: -1"
              v-if="link.status == 2"
              :disabled="link.status == 2"
              icon="mdi-tools"
              inline
              overlap
            ></v-badge>
          </v-list-item>
          <v-list-group
            color="deep-purple lighten-2 "
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </template>
            <v-list-item
              class="pa-1"
              style="padding-left: 8px !important"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              :disabled="sublink.status == 2"
              active-class="bg-primary-grediaun"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
              <v-badge
                color="error"
                right
                style="z-index: -1"
                v-if="sublink.status == 2"
                :disabled="sublink.status == 2"
                icon="mdi-tools"
                inline
                overlap
              ></v-badge>
            </v-list-item>
          </v-list-group>
        </div>
        <div class="pa-1">
          <v-list-item @click="logout()" class="pa-0">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <v-slide-x-transition>
          <Nuxt />
        </v-slide-x-transition>
      </v-container>
    </v-main>
    <v-dialog v-model="switch_auth" persistent width="600px">
      <v-card class="pa-5">
        <div class="text-h6">กรุณากรอก username ที่ต้องการ authentication</div>
        <v-form style="width: 100%" class="q-gutter-sm" @submit.prevent="submitauthen">
          <span class="q-gutter-md" style="width: 100%">
            <v-text-field
              v-model="switchauthtoagent.usernameByAuthen"
              required
              color="primary"
              label="Username"
              clearable
              hide-details="auto"
            />
          </span>
          <v-card-actions align="right">
            <v-btn outlined rounded color="red" @click="switch_auth = false">ยกเลิก</v-btn>
            <v-btn @click="submitauthen" color="primary">ยืนยัน</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-footer> </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      isStaff: false,
      fillter: {
        start: '2022-03-31T17:00:00.000Z',
        end: '2022-06-03T16:59:59.000Z',
      },
      switchauthtoagent: {
        usernameByAuthen: '',
      },
      switch_auth: false,
      fab: false,
      dialogOutside: false,
      dialogInside: false,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          title: 'Dashboard',
          to: '/',
          icon: 'mdi-view-dashboard',
          status: 1,
        },
        {
          title: 'Account',
          to: '/account',
          icon: 'mdi-shield-account',
          status: 1,
          subLinks: [
            {
              icon: 'mdi-account',
              text: 'Profile',
              to: '/account/profile',
              status: 1,
            },
            {
              icon: 'mdi-key-variant',
              text: 'Change Password',
              to: '/account/changepassword',
              status: 1,
            },
          ],
        },
        {
          title: 'Sub Account',
          to: '/subAccount',
          icon: 'mdi-text-account',
          status: 1,
        },
        {
          title: 'Downline Management',
          to: '/downline/downlineManagement',
          icon: 'mdi-sitemap',
          status: 2,
        },
        {
          title: 'Lotto Management',
          to: '/lotto',
          icon: 'mdi-slot-machine',
          status: 1,
        },
        {
          title: 'Landing Page Management',
          to: '/landinpage',
          icon: 'mdi-page-layout-header',
          status: 0,
        },
        {
          title: 'Member Page Management',
          to: '/mamberpage',
          icon: 'mdi-page-layout-body',
          status: 0,
        },
        {
          title: 'Report',
          icon: 'mdi-chart-multiple',
          status: 1,
          subLinks: [
            {
              icon: 'mdi-chart-donut',
              text: 'Report By provider',
              to: '/report/byProvider',
              status: 2,
            },
            {
              icon: 'mdi-chart-timeline-variant-shimmer',
              text: 'Report By User',
              to: '/report/byUser',
              status: 1,
            },
          ],
        },
        {
          title: 'Check Outstanding',
          to: '/outstanding',
          icon: 'mdi-set-center',
          status: 2,
        },
        {
          title: 'Staff Logs',
          to: '/stafflog',
          icon: 'mdi-account-tie-outline',
          status: 2,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SMART AGENT',
    }
  },
  computed: {
    ...mapGetters('auth', ['token']),
    ...mapState('account', ['profile']),
    navigationMenu() {
      return this.items.filter((x) => x.status != 0)
    },
  },
  async fetch() {
    await this.get_creditBalance()
  },
  async created() {
    await this.get_profile()
    if (this.profile) {
      this.isStaff = this.profile.isStaff
    }

    // await this.checkauthen();
    // const managementMenu = ['staff', 'company', 'shareholder', 'senior', 'agent', 'member'].map((x) => ({
    //   title: `${x.charAt(0).toUpperCase() + x.slice(1)} Management`,
    //   to: `/${x}`,
    //   icon:
    //     x == 'member'
    //       ? 'mdi-account-group'
    //       : x == 'senior'
    //       ? 'mdi-account-tie'
    //       : x == 'agent'
    //       ? 'mdi-account-supervisor'
    //       : 'mdi-office-building',
    // }))
    // const insert = (arr, index, newItem) => {
    //   if (Array.isArray(newItem)) {
    //     return [
    //       // part of the array before the specified index
    //       ...arr.slice(0, index),
    //       // inserted item
    //       ...newItem,
    //       // part of the array after the specified index
    //       ...arr.slice(index),
    //     ]
    //   }
    //   return [
    //     // part of the array before the specified index
    //     ...arr.slice(0, index),
    //     // inserted item
    //     newItem,
    //     // part of the array after the specified index
    //     ...arr.slice(index),
    //   ]
    // }
    // const menu = insert(
    //   this.items,
    //   this.items.findIndex((x) => x.title.toLowerCase() == 'setting'),
    //   managementMenu
    // )
    // this.items = menu
  },
  watch: {
    switch_auth(newValue) {
      if (newValue) {
        this.switchauthtoagent.usernameByAuthen = ''
      }
    },
  },
  methods: {
    ...mapActions('account', ['get_creditBalance', 'get_profile']),
    async submitauthen() {
      try {
        const { data } = await this.$axios.get(`/api/v2/authenticate/token/${this.switchauthtoagent.usernameByAuthen}`)
        const { data: userProfile } = await this.$axios.get('/api/v1/authenticate/profile', {
          headers: {
            Authorization: data.key,
          },
        })
        const token = this.token
        const profile = { ...userProfile, ...data }
        profile.role = profile.level
        console.log(profile, 'user')
        this.set_login(profile)
        // console.log("is_switch_admin", true);
        // console.log("admin_token", token);
        localStorage.setItem('is_switch_admin', true)
        localStorage.setItem('admin_token', token)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      } finally {
        this.switch_auth = false
      }
    },
    async switchBackToAdmin() {
      try {
        const { data } = await this.$axios.get('/api/v1/authenticate/profile', {
          headers: {
            Authorization: localStorage.getItem('admin_token'),
          },
        })
        const profile = { ...data }
        profile.role = profile.level
        profile.key = localStorage.getItem('admin_token')
        this.set_login(profile)
        console.log(profile, 'back authen')
      } finally {
        console.log('final')
      }
    },
    ...mapMutations('auth', ['set_logout', 'set_login']),
    ...mapMutations('report', ['setdata_logout']),
    ...mapMutations('account', ['clear_account']),
    async logout() {
      console.log('logout')
      try {
        let token = localStorage.getItem('key')
        if (token) {
          localStorage.clear()
          this.set_logout()
          this.setdata_logout()
          this.clear_account()
          this.$router.push('/login')
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
