<template>
  <div>
    <!-- {{ $store.state.account.profile.isStaff }} -->
    <downline-create v-if="!$store.state.account.profile.isStaff"></downline-create>
    <downline-createowner v-else></downline-createowner>
  </div>
</template>

<script>
import DownlineCreate from '~/components/downline/DownlineCreate.vue'
import DownlineCreateowner from '~/components/downline/DownlineCreateowner.vue'

export default {
  components: { DownlineCreate, DownlineCreateowner },
}
</script>

<style></style>
