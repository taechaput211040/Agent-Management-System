import Vue from 'vue'
Vue.filter('numberFormat', (value) => {
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
