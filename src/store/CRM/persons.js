import { getPersonsRequest } from '@/requestManager/CRM/personsRequests';

const state = () => ({
  persons: [],
});

const getters = {
};

const mutations = {
  SET_PERSONS(state, persons) {
    console.log(persons)
  },
};

const actions = {
  async getPersons({ commit }) {
    const response = await getPersonsRequest();

    if(response.status === 200) {
      commit('SET_PERSONS', response)
    }

    return response;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
