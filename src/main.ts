import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';




// import 'primevue/resources/themes/lara-light-purple/theme.css'
import 'primevue/resources/themes/md-light-indigo/theme.css'

// import 'primevue/resources/themes/lara-dark-purple/theme.css'

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'



const app = createApp(App)
app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.use(ToastService);
app.mount('#app')
