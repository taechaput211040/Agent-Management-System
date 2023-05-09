<template>
  <v-card class="rounded-lg elevation-3 pa-3">
    <div class="row">
      <v-col cols="9">
        <h4>{{ title }}</h4>
        <h3 :class="bgFunc(value)">{{ value == NaN ? 0 : value }}</h3>
      </v-col>
      <v-col cols="3" class="pa-0" align-self="center"
        ><v-icon x-large v-if="icon">{{ icon }}</v-icon>
        <div v-else class="pa-2">
          <v-icon x-large>mdi-hexagram</v-icon>
        </div>
      </v-col>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'example',
    },
    value: {
      type: [String, Number],
      default: '999.99',
    },
    icon: {
      type: String,
      default: null,
    },
  },
  computed: {
    bgFunc() {
      return (inValue) => {
        const value = inValue.replace(/,/g, '')

        if (value > 0) {
          return 'positive_text'
        }
        if (value == 0) {
          return ''
        }
        return 'negative_text'
      }
    },
  },
}
</script>

<style></style>
