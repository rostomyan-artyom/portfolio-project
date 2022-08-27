import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewHome from "@/views/home";
import  ViewCRM from '@/views/crm';

Vue.use(VueRouter);



const routes = [
  {
    path: '/',
    name: 'app',
    component: ViewHome,
  },
  {
    path: '/crm',
    name: 'crm',
    meta: { layout: 'crm' },
    component: ViewCRM,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
