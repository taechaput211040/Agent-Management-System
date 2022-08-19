<template>
  <v-app dark>
    <div class="show">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async beforeMount() {
    await this.CheckOrganize()
  },
  methods: {
    ...mapActions('account', ['getPalletePreset', 'CreateOrganizePalette', 'CreatePreset']),
    async CheckOrganize() {
      try {
        await this.getPalletePreset()
      } catch (error) {
        console.log(error)
        await this.setNewAccount()
      }
    },
    async setNewAccount() {
      try {
        let body = {
          domain: window.location.origin,
          status: true,
        }
        let { data } = await this.CreateOrganizePalette(body)
        if (data) {
          let payout = { id: data.id, detail: this.$store.state.palette }
          await this.CreatePreset(payout)
          this.$swal({
            icon: 'success',
            title: 'Set Defult Palette Success',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          })
        }
        console.log(window.location.origin, 'norest')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.show {
  height: 100vh;
  overflow: hidden;
}
</style>
