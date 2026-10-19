import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './assets/styles/main.css'

import vuetify from './plugins/vuetify.js'

const app = createApp(App)

app.use(vuetify)

app.mount('#app')