export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Agent-Betkub",
    title: "Agent-Betkub",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  proxy: {
    "/api/": {
      // target: "http://192.168.1.123:5000",
      // target: "http://localhost:5000",
      target: "https://backend-v2.smart-exchange.io",
      changeOrigin: true
    },

    "/apiV2/": {
      target: "https://report-seamless-api-report-kdz5uqbpia-as.a.run.app",
      pathRewrite: { "^/apiV2/": "" }
    }
  },
  server: {
    port: 8080 // default: 3000
  },
  mode: "spa",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "nuxt-element-ui", "@nuxtjs/dayjs"],
  dayjs: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    defaultTimeZone: "Asia/Tokyo",
    plugins: [
      "utc", // import 'dayjs/plugin/utc'
      "timezone" // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },
  axios: {
    proxy: true,
    // baseURL: "https://agent.bet-kub.com",
    crossDomain: true,
    proxyHeaders: false,
    credentials: true
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
