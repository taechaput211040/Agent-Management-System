import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Agent Back Office',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Agent Management System',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        'http-equiv': 'Content-Security-Policy',
        // name: 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios', '~/plugins/formatter'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-element-ui',
    '@nuxtjs/dayjs',
    'vue-sweetalert2/nuxt',
  ],

  dayjs: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    defaultTimeZone: 'Asia/Bangkok',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: 'https://kong-api-proxy-qlws7pv5wa-as.a.run.app',
    // proxy: true,
  },

  // proxy: {
  //   '/v1alpha': {
  //     target: 'https://kong-api-proxy-qlws7pv5wa-as.a.run.app',
  //     changeOrigin: true,
  //   },

  //   '/api/V2/': {
  //     target: 'https://backend-v2.smart-exchange.io',
  //     pathRewrite: {
  //       '^/apiV2/': '',
  //     },
  //   },
  // },
  server: {
    port: process.env.APP_PORT || 8123, // default: 3000
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // adding the below object made the compilation time go up again to
  //"normal"
  loaders: {
    vue: {
      prettify: false,
    },
  },
  /*
   ** You can extend webpack config here
   */
  extend(config, ctx) {
    config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    mode: 'history',
  },
}
