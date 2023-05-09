<template>
  <div class="row  mt-2">
    <h3 class="col-12">{{ label }}</h3>
    <div class="col-12 pa-0 d-flex justify-center">
      <v-color-picker flat v-model="color"></v-color-picker>
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
      color: this.value || '',
      placeholder: this.label || '',
      type: 'hex',
      hex: '#FF00FF',
    }
  },
  watch: {
    color(value) {
      this.$emit('color', value)
    },
    value(value) {
      this.color = this.value
    },
  },
}
</script>

<style></style>
