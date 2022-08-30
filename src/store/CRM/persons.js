import { deletePersonByIdRequest, getPersonsRequest } from '@/requestManager/CRM/personsRequests';

const state = () => ({
  persons: [],
});

const getters = {};

const mutations = {
  SET_PERSONS(state, persons) {
    state.persons = persons;
  },
  DELETE_PERSON(state, personId) {
    console.log('пошла жара', personId)
    state.persons = state.persons.filter(({ id }) => (
      id !== personId
    ))
  },
};

const actions = {
  async getPersons({ commit }) {
    const response = await getPersonsRequest();

    if(response.status === 200) {
      commit('SET_PERSONS', response.data)
    }

    return response;
  },
  async deletePerson({ commit }, {params}) {
    const response = await deletePersonByIdRequest({ params });

    if(response.status === 200) {
      commit('DELETE_PERSON', params.id);
    }

    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
