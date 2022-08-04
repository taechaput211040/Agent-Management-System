<template>
  <div>
    <h2>Lotto Management</h2>
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> -->
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
      console.log(res, 'res')
      console.log(this.token, 'token')

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
}
</script>
