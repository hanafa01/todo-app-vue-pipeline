import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store/index';

import BaseCard from './components/ui/BaseCard'
import BaseDialog from './components/ui/BaseDialog'

const app = createApp(App)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.use(store)
app.mount('#app')
