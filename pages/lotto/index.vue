<template>
  <div>
    <h2>Lotto Management</h2>
    <!--  -->
    <!--  -->
    <div class="card-showtheme" v-if="getOS() === 'iOS' || getOS() === 'Mac OS'">
      <a :href="lottoLink" target="_blank">
        <img src="https://smart-binary.cloud/storage/Provider/VV_lotto.webp" class="lotto_class mt-4" />
      </a>
    </div>
    <!-- -->
    <div v-else>
      <iframe
        class="mt-3"
        v-if="lottoLink"
        frameborder="none"
        width="100%"
        height="100vh"
        :src="lottoLink"
        style="min-height: 100vh"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lotto',
  data() {
    return {
      lotto: undefined,
    }
  },
  head: {
    meta: [
      // creates a meta description tag in header.
      { name: 'description', content: 'My description' },
    ],
  },
  computed: {
    token() {
      return localStorage.getItem('key')
    },
    lottoLink() {
      return this.lotto?.link
    },
  },
  async created() {
    try {
      const res = await this.$axios.post(
        'https://lotto-launchgame-service-ehhif4jpyq-as.a.run.app/api/auth/smart_agent_loging',
        {},
        {
          params: {
            token: `Bearer ${this.token}`,
          },
        }
      )

      this.lotto = res.data
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
  methods: {
    getOS() {
      var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS'
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS'
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows'
      } else if (/Android/.test(userAgent)) {
        os = 'Android'
      } else if (/Linux/.test(platform)) {
        os = 'Linux'
      }

      return os
    },
  },
}
</script>
