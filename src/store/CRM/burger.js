const state = () => ({
  burgerShow: true,
});

const mutations = {
  TOGGLE_BURGER_SHOW(state) {
    state.burgerShow = !state.burgerShow;
  },
};

const actions = {
  toggleBurgerShow({ commit }) {
    commit('TOGGLE_BURGER_SHOW');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
