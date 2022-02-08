module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'project2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [ 
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'css', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' },
      // { rel: 'stylesheet', type: 'css', href: 'https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/users/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: true,
          user: {
            url: '/api/users/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: '/auth/login', // User will be redirected to this path if login is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      home: '/' // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  serverMiddleware: [
    '~/api/index.js'
  ]
}
