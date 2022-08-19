<template>
  <div>
    <h2 class="text-center">Palette Management</h2>
    <div class="text-center my-4">
      <v-btn
        :color="index === `darkApp` ? 'black white--text' : 'white black--text'"
        v-for="(item, index) in mainitem"
        rounded
        class="mx-1"
        :key="index"
        @click="selectData(index, item)"
        >{{ index }}</v-btn
      >
    </div>
    <div>
      <!-- {{ renderItem }} -->
      <div v-for="(item, index) in renderItem" :key="index">
        <div class="elevation-4 my-5 rounded justify-center row pa-3">
          <h1 class="text-center text-decoration-underline my-2 font-italic" v-if="index === 'menu'">
            GENERAL SETTING
          </h1>
          <h1 class="text-center text-decoration-underline my-2 font-italic" v-else>
            {{ index.toUpperCase() }} SETTING
          </h1>

          <div class="col-12 row justify-center">
            <card-detial
              v-if="index === 'card'"
              :cardColor="renderItem.card.cardBgColor.value"
              :textColor="renderItem.card.cardTextColor.value"
              class="col-lg-3 col-xl-2 col-md-4 col-sm-5"
            ></card-detial>
            <navbar-detail
              :bgSidebarColor="renderItem.menu.sidebarColor.value"
              :Color="renderItem.menu.navberColor.value"
              :bgMainColor="renderItem.menu.bgColor.value"
              :text_color="renderItem.menu.textColor.value"
              :activeMenu="renderItem.menu.activeMenuColor.value"
              v-if="index === 'menu'"
              class="col-lg-3 col-xl-6 col-md-8 col-sm-12 col-12"
            ></navbar-detail>
            <table-detail
              :bgHeader="renderItem.table.colorTable.value"
              :bgBody="renderItem.table.colorBodyTable.value"
              :textColor="renderItem.table.colorTextTable.value"
              :bgTable="renderItem.table.bgTable.value"
              class="pa-0 col-lg-3 col-xl-6 col-md-8 col-sm-12 col-12"
              v-if="index === 'table'"
            ></table-detail>
          </div>
          <div class="col-12 row justify-center">
            <div v-for="(itemChild, j) in item" :key="j">
              <check-type
                class="mx-2"
                :items="itemChild"
                :class="{
                  hideclass:
                    (j === 'sidebarColor' && $vuetify.theme.dark === false) ||
                    (j === 'activeMenuColor' && $vuetify.theme.dark === false),
                }"
              >
              </check-type>
            </div>

            <!-- @input="(value) => handleEmiteData(value, j)" -->

            <!-- {{ item }} -->
          </div>
        </div>
      </div>
      <div class="text-center">
        <v-btn color="success" @click="savePallette()">save</v-btn>
        <v-btn color="primary" @click="refresh()">refresh</v-btn>
        <v-btn color="black" dark @click="backtobeginer()">restore</v-btn>
      </div>
    </div>
    <!-- <color-input></color-input>
    <gradient-input></gradient-input> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CardData from '~/components/form/CardData.vue'
import CheckType from '~/components/palette/CheckType.vue'
import ColorInput from '~/components/palette/ColorInput.vue'
import CardDetial from '~/components/palette/example/CardDetial.vue'
import NavbarDetail from '~/components/palette/example/NavbarDetail.vue'
import TableDetail from '~/components/palette/example/TableDetail.vue'
import GradientInput from '~/components/palette/GradientInput.vue'
export default {
  components: { ColorInput, GradientInput, CardData, CheckType, CardDetial, NavbarDetail, TableDetail },
  data() {
    return {
      renderItem: {},
      mainitem: {},
      dataExample: {},
      theme: true,
    }
  },
  computed: {
    ...mapState('account', ['webPalette']),
  },
  // watch: {
  //   '$vuetify.theme.isDark': {
  //     handler: function (val) {
  //       t
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  async mounted() {
    this.theme = this.$vuetify.theme.dark
    let current_palette = JSON.parse(sessionStorage.getItem('current_palette'))
    if (current_palette) {
      this.mainitem = JSON.parse(sessionStorage.getItem('current_palette'))
    } else {
      this.mainitem = this.webPalette.palette
      sessionStorage.setItem('current_palette', JSON.stringify(this.mainitem))
    }

    await this.selectData()
  },
  methods: {
    ...mapActions('account', ['updatePalette']),
    ...mapMutations('account', ['setPallete']),
    async getPresetByOrganize() {},
    async selectData(index) {
      if (!index) {
        this.renderItem = this.mainitem['darkApp']
        this.$vuetify.theme.dark = true
      } else {
        this.renderItem = this.mainitem[index]
        if (index === 'darkApp') {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
      }
      console.log(this.$vuetify.theme.isDark)
    },
    handleEmiteData(value, index) {
      console.log(this.selectData())
    },

    async savePallette() {
      // console.log(this.mainitem,'main')
      const body = {
        web_id: this.webPalette.web_id,
        presetId: this.webPalette.presetId,
        detail: this.mainitem,
      }
      try {
        this.$swal({
          title: 'Are you sure you want to Update Pallete ?',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              let { data } = await this.updatePalette(body)
              console.log(data)
              sessionStorage.setItem('current_palette', JSON.stringify(data.palette))
              this.$swal({
                icon: 'success',
                title: 'Update Pallete Success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  await location.reload()
                  //refreshandredirect/
                }
              })
            } catch (error) {
              this.$swal({
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    refresh() {
      this.mainitem = JSON.parse(sessionStorage.getItem('current_palette'))
      this.selectData()
    },
    async backtobeginer() {
      const body = {
        web_id: this.webPalette.web_id,
        presetId: this.webPalette.presetId,
        detail: this.$store.state.palette,
      }
      try {
        this.$swal({
          title: 'Are you sure you want to Restore Pallete ?',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              let { data } = await this.updatePalette(body)
              console.log(data)
              sessionStorage.setItem('current_palette', JSON.stringify(data.palette))
              this.$swal({
                icon: 'success',
                title: 'Restore Pallete Success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  await location.reload()
                  //refreshandredirect/
                }
              })
            } catch (error) {
              this.$swal({
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // renderingTheme(theme) {
    //   if (theme === 'dark') {
    //     this.item = this.renderPalace.darkApp
    //   } else if (theme === 'light') {
    //     this.item = this.renderPalace.lightApp
    //   }
    // },
  },
  async destroyed() {
    await this.selectData()
    console.log('refresh')
  },
}
</script>

<style></style>
