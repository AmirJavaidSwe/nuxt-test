// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/firebase.js',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['@nuxt/image'],
  },
  routeRules: {
    '/': { redirect: '/posts' },
    '/posts': { ssr: false },
    '/auth/login': { ssr: false },
    '/admin/**': { ssr: false },
  }
})
