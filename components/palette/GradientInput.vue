<template>
  <div class=" mt-5">
    <h3>{{ label }}</h3>
    <div class="elevation-3 py-2 mt-2">
      <div class="pa-0">
        <v-slider
          v-if="gradient.type === 'linear'"
          class="mt-4"
          hide-details="auto"
          thumb-label="always"
          v-model="gradient.degree"
          max="360"
          min="0"
        >
          <template v-slot:thumb-label="{ value }"> {{ value }}° </template></v-slider
        >
      </div>
      <div class="text-center mt-4">
        <v-btn small rounded @click="gradient.type = 'linear'">linear</v-btn>
        <v-btn small rounded @click="gradient.type = 'radial'">radial</v-btn>
      </div>
      <div class="pa-2">
        <div class="rounded-md elevation-5 mt-4">
          <div class="body-listcolor pa-2">
            <div v-for="(item, i) in gradient.colorlist" :key="i">
              <div class="d-flex">
                <!-- menuColor -->
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div class="col-1" v-bind="attrs" v-on="on">
                      <v-badge tile centered :color="item.color"> </v-badge>
                    </div>
                    <div class="col-7 text-center pa-1" v-bind="attrs" v-on="on">
                      <v-text-field dense hide-details="auto" outlined v-model="item.color"></v-text-field>
                    </div>
                  </template>
                  <v-color-picker v-model="item.color" :value="item.color" @input="changeColor($event, item)">
                  </v-color-picker>
                </v-menu>
                <!-- menuColor -->
                <!-- menuStop -->
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="200"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div class="col-3 text-center pa-1" v-bind="attrs" v-on="on">
                      <v-text-field
                        dense
                        hide-details="auto"
                        type="number"
                        outlined
                        v-model="item.stop"
                      ></v-text-field></div
                  ></template>
                  <v-card class="pt-5">
                    <v-slider v-model="item.stop" max="100" min="0"> </v-slider>
                  </v-card>
                </v-menu>
                <!-- menuStop -->
                <div class="col-1 text-center pa-1">
                  <v-btn
                    color="error"
                    icon
                    medium
                    :disabled="gradient.colorlist.length <= 2"
                    @click="removeItem(gradient.colorlist, i)"
                    ><v-icon>mdi-minus-circle</v-icon></v-btn
                  >
                </div>
              </div>
            </div>
            <div class="text-center">
              <v-btn
                color="primary"
                :disabled="gradient.colorlist.length >= 4"
                small
                rounded
                @click="addColor(gradient.colorlist)"
                ><v-icon>mdi-plus-circle</v-icon>add</v-btn
              >
              <v-btn
                color="error"
                :disabled="gradient.colorlist.length <= 2"
                small
                rounded
                @click="removeColor(gradient.colorlist)"
                ><v-icon>mdi-minus-circle</v-icon>del</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String,
    },

    label: {
      type: String,
      default: 'Input Here',
    },
  },

  data() {
    return {
      color: '',
      colorpick: '',
      type: ['linear', 'radial'],
      gradient: {
        degree: 70,
        type: 'linear',
        colorlist: [
          { color: '#22C1C3', stop: 0 },
          { color: '#FDBB2D', stop: 50 },
        ],
      },
    }
  },
  watch: {
    gradient: {
      deep: true,
      handler(val) {
        this.$emit('color', this.generateColorGradient())
      },
    },
  },
  methods: {
    selectColor(colorlist) {
      this.colorpick = colorlist.color
    },
    changeColor(val, item) {
      item.color = val
    },
    addColor(list) {
      list.push({
        color: '#FDBB2D',
        stop: Math.floor(Math.random() * 101),
      })
    },
    removeColor(list) {
      list.splice(-1)
    },
    removeItem(list, i) {
      list.splice(i, 1)
    },
    generateColorGradient() {
      let dataGradient = this.gradient
      let clist = dataGradient.colorlist
      let grediaun = ''
      for (let i = 0; i < clist.length; i++) {
        grediaun += `, ${clist[i].color} ${clist[i].stop}%`
      }
      return `${dataGradient.type}-gradient(${
        dataGradient.type === 'linear' ? dataGradient.degree + 'deg' : 'circle'
      }${grediaun})`
    },
  },
}
</script>

<style></style>
