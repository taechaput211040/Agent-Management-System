<template>
  <loading-page></loading-page>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import loadingPage from '~/components/form/loadingPage.vue'
export default {
  middleware: 'auth',
  components: { loadingPage },
  async beforeMount() {
    await this.get_profile()
    await this.$router.push('/')
  },
  mounted() {},
  methods: {
    ...mapActions('account', ['get_creditBalance', 'get_profile', 'getPalletePreset']),
  },
}
</script>

<style></style>
