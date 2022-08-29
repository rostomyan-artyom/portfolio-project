import { getEducationsRequest } from '@/requestManager/CRM/educationsRequests';

const state = () => ({
  educations: [],
});

const getters = {
};

const mutations = {
  SET_EDUCATIONS(state, educations) {
    state.educations = educations;
  },
};

const actions = {
  async getEducations({ commit }) {
    const response = await getEducationsRequest();

    if(response.status === 200) {
      commit('SET_EDUCATIONS', response.data)
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
