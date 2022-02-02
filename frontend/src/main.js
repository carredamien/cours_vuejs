import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Vuex from 'vuex'
import createStore from './store/index'


createApp(App).use(router)
.use(Vuex)
.use(createStore)
.use(VueAxios, axios)
.mount('#app')

