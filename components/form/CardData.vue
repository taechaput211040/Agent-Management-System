<template>
  <v-card class="rounded-lg elevation-3 pa-3">
    <div class="row">
      <v-col cols="9">
        <h4>{{ title }}</h4>
        <h3 :class="bgFunc(value)">{{ value !== NaN ? value : 0 }}</h3>
      </v-col>
      <v-col cols="3" class="pa-0" align-self="center"
        ><v-icon x-large v-if="icon">{{ icon }}</v-icon>
        <div v-else class="pa-2">
          <img
            src="https://image.smart-ai-api.com/public/image-storage-betkub/images/20210811100859a9261ec6ff414acaaaa677c9ad7c83a7.png"
            alt="John" class="mt-2"
            style="width: auto; height: 100%; max-width: 100%"
          />
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
