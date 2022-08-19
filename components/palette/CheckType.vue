<template>
  <div>
    <color-input
      v-if="items.type === 'color'"
      :label="items.label"
      :value="items.value"
      @color="(value) => handleEmite(value)"
    ></color-input>
    <!-- <gradient-input></gradient-input> -->
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
  },
}
</script>

<style></style>
