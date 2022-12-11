import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import vueDebounce from 'vue-debounce'
import VueCountdown from '@chenfengyuan/vue-countdown';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/import'

window.$ = window.jquery = require('jquery');

const SweetAlert = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
const debounceConfig = {
    lock: false,
    listenTo: 'keyup',
    defaultTime: '300ms',
    fireOnEmpty: false,
    trim: false
}

const app = createApp(App)


app.component(VueCountdown.name, VueCountdown);

app.use(store)
.use(router)
.use(VueSweetalert2, SweetAlert)
.use(vueDebounce, debounceConfig)
.use(Toast)
.mount('#app')
