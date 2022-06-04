<template>
  <div>
    <h2>Lotto Management</h2>

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
            token: this.token,
          },
        }
      )
      this.lotto = res.data
    } catch (error) {}
  },
}
</script>
