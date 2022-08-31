import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//Общее
import Modal from '@/store/common/modal';

// CRM
import CRMBurger from '@/store/CRM/burger';
import CRMPersons from '@/store/CRM/persons';
import CRMEducations from '@/store/CRM/educations';
import CRMPositions from '@/store/CRM/positions';

export default new Vuex.Store({
  modules: {
    Modal,
    CRMBurger,
    CRMPersons,
    CRMEducations,
    CRMPositions,
  },
});
