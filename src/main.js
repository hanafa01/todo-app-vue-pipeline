import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Toaster from "@meforma/vue-toaster";
import store from './store/index';
import router from './router'

import BaseCard from './components/ui/BaseCard'
import BaseDialog from './components/ui/BaseDialog'

const app = createApp(App)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.use(router)
app.use(store)
app.use(Toaster);
app.mount('#app')
