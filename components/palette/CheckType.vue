<template>
  <div class="text-center mt-5">
    <div v-show="items.type === 'color' || items.type === 'linear'">
      <v-btn @click="showInput(items, 'color')" color="black white--text"> color </v-btn>
      <v-btn @click="showInput(items, 'linear')" class="grad_btn"> linear </v-btn>
    </div>
    <color-input
      v-if="items.type === 'color' || items.type ==='color_text'"
      :label="items.label"
      :value="items.value"
      @color="(value) => handleEmite(value)"
    ></color-input>
    <gradient-input
      v-if="items.type === 'linear'"
      :label="items.label"
      :value="items.value"
      @color="(value) => handleEmite(value)"
    ></gradient-input>
  </div>
</template>

<script>
import ColorInput from './ColorInput.vue'
import GradientInput from './GradientInput.vue'
export default {
  props: {
    items: {
      default: Object,
    },
  },
  components: { ColorInput, GradientInput },
  methods: {
    handleEmite(value) {
      let targetItemEdit = this.items
      targetItemEdit.value = value
      this.$emit('input', targetItemEdit)
    },
    showInput(items, type) {
      items.type = type
    },
  },
}
</script>

<style></style>
