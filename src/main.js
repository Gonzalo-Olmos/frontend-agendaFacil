import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import './axios'
import './style.css'
import App from './App.vue'

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';



const app = createApp(App);
// Use plugin with optional defaults
app.use(VCalendar, {})
app.use(pinia)
app.use(router)
app.use(VueSweetalert2)
app.mount('#app')
