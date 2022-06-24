<template>
  <v-card class="rounded-lg elevation-3 pa-3">
    <div class="row">
      <v-col cols="3" align-self="center" class="text-center pa-0">
        <v-icon color="rgb(145 85 253 )" x-large v-if="icon">{{ icon }}</v-icon> </v-col
      ><v-divider vertical class="d-md-block d-none"></v-divider>
      <v-col cols="9">
        <h4>{{ title }}</h4>
        <h2>{{ typeof value == 'number' ? numFormat(value) : value }}</h2>
      </v-col>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
  },
  methods: {
    numFormat(value) {
      return Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
}
</script>

<style></style>
