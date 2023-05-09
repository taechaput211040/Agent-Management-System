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
import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.use(VueFriendlyIframe)
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
              type: 'color_text',
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
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color_text', value: '#E9E9E9' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#1E1E1E' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#1E1E1E' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color_text', value: '#FFFFFF' },
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
              type: 'color_text',
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
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color_text', value: '#000000' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#FFFFFF' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#FFFFFF' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color_text', value: '#000000' },
            bgTable: { label: 'สีพื้นหลังตาราง', type: 'color', value: '#FFFFFF' },
          },
        },
      },
      menu: [
        {
          title: 'Dashboard',
          to: '/',
          icon: 'mdi-view-dashboard',
          permission: 'dashboard_read',
          status: 1,
        },
        {
          title: 'Account',
          to: '/account',
          icon: 'mdi-shield-account',
          status: 1,
          subLinks: [
            {
              icon: 'mdi-account',
              text: 'Profile',
              to: '/account/profile',
              status: 1,
            },
            {
              icon: 'mdi-key-variant',
              text: 'Change Password',
              to: '/account/changepassword',
              status: 1,
            },
          ],
        },
        {
          title: 'Sub Account',
          to: '/subaccount',
          icon: 'mdi-text-account',
          permission: 'sub-account_read',
          status: 1,
        },
        {
          title: 'Downline Management',
          to: '/downline',
          icon: 'mdi-sitemap',
          permission: 'downline_read',
          status: 1,
        },  {
          title: 'Setting System',
          to: '/settingsystem',
          icon: 'mdi-cog',
          permission: 'member_read',
          status: 1,
        },
        {
          title: 'Member Management',
          to: '/member',
          icon: 'mdi-human-male-male',
          permission: 'member_read',
          status: 1,
        },
        {
          title: 'Lotto Management',
          to: '/lotto',
          icon: 'mdi-slot-machine',
          permission: 'lotto-management_read',
          status: 1,
        },
        {
          title: 'Report',
          icon: 'mdi-chart-multiple',
          to: '/report',
          status: 1,
          permission: 'report_read',
          subLinks: [
            {
              icon: 'mdi-chart-donut',
              text: 'Report By provider',
              to: '/report/byProvider',
              permission: 'report_read',
              status: 1,
            },
            {
              icon: 'mdi-chart-timeline-variant-shimmer',
              text: 'Report By User',
              to: '/report/byUser',
              permission: 'report_read',
              status: 1,
            },
          ],
        },
        {
          title: 'Check Outstanding',
          to: '/outstanding',
          icon: 'mdi-set-center',
          permission: 'check-outstanding_read',
          status: 2,
        },
        {
          title: 'Staff Logs',
          to: '/stafflog',
          icon: 'mdi-account-tie-outline',
          permission: 'staff-log_read',
          status: 2,
        },
        {
          title: 'Palette Management',
          to: '/palette',
          icon: 'mdi-palette',
          status: 1,
        },
      ],
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
