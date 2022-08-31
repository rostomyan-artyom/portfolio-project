import Vue from 'vue';

// VueAxios
import VueAxios from 'vue-axios';
import axios from '@/initial/axios';
Vue.use(VueAxios, axios);

// VTooltip
import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

// PortalVue
import PortalVue from 'portal-vue';
Vue.use(PortalVue);

// VueNotification
import VueNotification from 'vue-notification';
Vue.use(VueNotification);
