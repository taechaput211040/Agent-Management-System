import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import auth from './auth'
import account from './account'
import provider from './provider'
import group from './group'
import report from './report'
import marketshare from './marketshare'
import downline from './downline'
import member from './member'
import state from './auth/state'
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(ElementUI, {
  locale,
})
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      auth,
      provider,
      account,
      group,
      report,
      marketshare,
      downline,
      member,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    state: {
      presetPallette: null,
      palette: {
        darkApp: {
          menu: {
            navberColor: { label: 'สีพื้นหลัง navber ข้างบน', type: 'color', value: '#1A1426' },
            sidebarColor: {
              label: 'สีพื้นหลัง sidebar ด้านข้าง',
              type: 'color',
              value: '#1F1D31',
            },
            bgColor: {
              label: 'สีพื้นหลัง Background',
              type: 'color',
              value: '#28243d',
            },
            textColor: {
              label: 'สีตัวอักษร web',
              type: 'color',
              value: '#ffffff',
            },
            activeMenuColor: {
              label: 'สีตอนกดปุ่ม menu',
              type: 'color',
              value: '#9155fd',
            },
          },
          card: {
            cardBgColor: { label: 'สี card', type: 'color', value: '#1F1D31' },
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color', value: '#E9E9E9' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#1E1E1E' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#1E1E1E' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color', value: '#FFFFFF' },
            bgTable: { label: 'สีพื้นหลังตาราง', type: 'color', value: '#1f1d31' },
          },
        },
        lightApp: {
          menu: {
            navberColor: { label: 'สีพื้นหลัง navber ข้างบน', type: 'color', value: '#FFFFFF' },
            sidebarColor: {
              label: 'สีพื้นหลัง sidebar ด้านข้าง',
              type: 'color',
              value: '#1f1d31',
            },
            bgColor: {
              label: 'สีพื้นหลัง Background',
              type: 'color',
              value: '#f4f5fa',
            },
            textColor: {
              label: 'สีตัวอักษร web',
              type: 'color',
              value: '#000000',
            },
            activeMenuColor: {
              label: 'สีตอนกดปุ่ม menu',
              type: 'color',
              value: '#9155fd',
            },
          },
          card: {
            cardBgColor: { label: 'สี card', type: 'color', value: '#FFFFFF' },
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color', value: '#000000' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#FFFFFF' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#FFFFFF' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color', value: '#000000' },
            bgTable: { label: 'สีพื้นหลังตาราง', type: 'color', value: '#FFFFFF' },
          },
        },
      },
    },
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./v2'], () => {
  //     const newShowcase = require('./v2').default
  //     Store.hotUpdate({ modules: { showcase: newShowcase } })
  //   })
  // }

  return Store
}
