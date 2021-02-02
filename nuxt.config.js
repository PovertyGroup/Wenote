export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Wenote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/font.css',
    '@/assets/css/style.css',
    'element-ui/lib/theme-chalk/index.css',
    'mavon-editor/dist/css/index.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/mavon-editor'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: '@/static/icon.png'
    },
    meta: {
      name: 'Wenote',
      description: '在线笔记平台。'
    },
    manifest: {
      name: 'Wenote',
      short_name: 'Wenote',
      lang: 'zh',
      background_color: '#ffffff',
      theme_color: 'blue',
      start_url: '/home',
      display: 'standalone'
    },
    workbox: {
      enabled: true,
      autoRegister: true,
      offlineAssets: ['@/assets/font/Dream.ttf'],
      offline: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },

  server: {
    host: '0' // default: localhost
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'about',
        path: '/about',
        redirect: '/viewnote/5fb922d85703375b1ccf28dc'
      }),
      routes.push({
        name: '404',
        path: '/*',
        redirect: '/404'
      })
    }
  }
}
