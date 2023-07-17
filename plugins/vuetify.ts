import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    background2: '#dddddd',
    font: '#4e4e4e',
    green1: '#006666',
    green2: 'c85554',
    black: '#4e4e4e',
    text: '#4e4e4e'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components
    },
    directives: {
      ...directives
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'customLightTheme',
      themes: {
        customLightTheme,
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
