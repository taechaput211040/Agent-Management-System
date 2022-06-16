import Vue from 'vue'
import dayjs from 'dayjs' //import dayjs in your main.js
Vue.filter('numberFormat', (value) => {
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
Vue.filter('dateFormat', (value) => {
  return dayjs(value).format('YYYY/MM/DD HH:mm:ss')
})
