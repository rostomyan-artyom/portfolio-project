import { getPositionsRequest } from '@/requestManager/CRM/positionsRequests';

const state = () => ({
  positions: [],
});

const getters = {
};

const mutations = {
  SET_POSITIONS(state, positions) {
    state.positions = positions;
  },
};

const actions = {
  async getPositions({ commit }) {
    const response = await getPositionsRequest();

    if(response.status === 200) {
      commit('SET_POSITIONS', response.data)
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
