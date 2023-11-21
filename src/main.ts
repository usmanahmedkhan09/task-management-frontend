import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button'


import 'primevue/resources/themes/lara-light-purple/theme.css'
// import 'primevue/resources/themes/lara-dark-purple/theme.css'

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/primevue.css'



const app = createApp(App)
app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.component('Button', Button)
app.mount('#app')
