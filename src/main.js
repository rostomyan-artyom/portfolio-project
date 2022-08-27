import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from '@/initial/axios';

import '@/initial/vue-modules';

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
