import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ViewHome from '@/views/home';
import serviceCrmRoute from '@/router/serviceCrmRoute';

const routes = [
  {
    path: '/',
    name: 'app',
    component: ViewHome,
  },
  ...serviceCrmRoute,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
