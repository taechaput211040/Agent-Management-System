<template>
  <div style="width: 100%" class="row">
    <div class="col-12 col-sm-6">
      <v-card
        class="mx-auto overflow-hidden"
        :style="`color:${text_color}; background:${bgMainColor} !important;`"
        height="200"
        width="100%"
      >
        <v-app-bar :style="`background: ${Color} !important;`">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>MY WEB</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-text> <h1 :style="`color:${text_color} !important;`">background-color</h1> </v-card-text>
      </v-card>
    </div>
    <div class="col-12 col-sm-6">
      <v-list dark nav dense :style="`background:${bgSidebarColor} !important;`">
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item class="v-list-item class-menu pa-1 font-weight-bold" active-class="activeColor">
            <v-list-item-title>menu1</v-list-item-title>
          </v-list-item>

          <v-list-item disabled class="v-list-item class-menu pa-1 font-weight-bold">
            <v-list-item-title color="red--text">menu2</v-list-item-title>
          </v-list-item>

          <v-list-item disabled class="v-list-item class-menu pa-1 font-weight-bold">
            <v-list-item-title>menu3</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ActiveClass() {
      return
    },
  },

  data() {
    return {
      drawer: false,
      group: 0,
    }
  },
  props: {
    Color: { default: String },
    bgSidebarColor: { default: String },
    bgMainColor: { default: String },
    activeMenu: { default: String },
    text_color: { default: String },
  },
  mounted() {
    this.selectColor()
  },
  watch: {
    group() {
      this.drawer = false
    },
    activeMenu() {
      this.selectColor()
    },
  },
  methods: {
    selectColor() {
      //   let boxParaRule
      var el = (document.getElementsByClassName('activeColor')[0].style.background = this.activeMenu)
      console.log(el)
      //   bgColorBtn.style.setProperty('background-color', activeMenu)
    },
  },
}
</script>

<style></style>
