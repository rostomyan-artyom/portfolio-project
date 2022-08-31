const state = () => ({
  openedCustomModal: null,
});

const mutations = {
  OPEN_CUSTOM_MODAL(state, miniServiceName) {
    state.openedCustomModal = miniServiceName;
  },
  CLOSE_CUSTOM_MODAL(state) {
    console.log('dffdgdfg')
    state.openedCustomModal = null;
  },
  SET_CUSTOM_MODAL_STATUS(state, miniServiceName) {
    state.openedCustomModal = state.openedCustomModal === miniServiceName
      ? null
      : miniServiceName;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
}
