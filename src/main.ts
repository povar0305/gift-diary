import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './assets/styles/main.css'

import vuetify from './plugins/vuetify'
import router from './router'
const app = createApp(App)

import { createPinia } from 'pinia'


app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')