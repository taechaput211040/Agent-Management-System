<template>
  <div>
    <h2>Landingpage Menagement</h2>
    <iframe
      class="mt-3"
      frameborder="none"
      width="100%"
      height="100vh"
      :src="`https://admin-static.smart-ai-api.com/#/?token=${encodeURIComponent(this.token)}`"
      style="min-height: 100vh"
    />
  </div>
</template>

<script>
export default {
  // name: 'PageName',
  computed: {
    token() {
      return localStorage.getItem('key')
    },
  },
}
</script>
