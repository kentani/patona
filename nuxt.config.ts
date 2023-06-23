// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'PATONA',
      titleTemplate: 'PATONA',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      htmlAttrs: {
        lang: 'ja'
      },
    }
  },
  ssr: false,
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectID: process.env.FIREBASE_PROJECT_ID,
      firebaseStoragebucket: process.env.FIREBASE_STORAGEBUCKET,
      firebaseMessagingSenderID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppID: process.env.FIREBASE_APP_ID,
    }
  },
})
