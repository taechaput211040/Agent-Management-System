<template>
  <v-card class="rounded-lg elevation-3 pa-3" :style="`background: ${cardColor} !important;`">
    <div class="row">
      <v-col cols="9">
        <h4 :style="`color: ${textColor} !important;`">example</h4>
        <h3 class="success--text">999</h3>
      </v-col>
      <v-col cols="3" class="pa-2" align-self="center">
        <v-icon x-large right>mdi-hexagram</v-icon>
      </v-col>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    cardColor: { default: String },
    textColor: { default: String },
  },
}
</script>

<style></style>
