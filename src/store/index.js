import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// CRM
import CRMPersons from '@/store/CRM/persons';
import CRMEducations from '@/store/CRM/educations';
import CRMPositions from '@/store/CRM/positions';

export default new Vuex.Store({
  modules: {
    CRMPersons,
    CRMEducations,
    CRMPositions,
  },
});
