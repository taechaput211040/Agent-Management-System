<template>
  <div>
    <h3>{{ label }}</h3> 
    <v-color-picker v-model="color"></v-color-picker>
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
