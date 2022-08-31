import { deletePersonRequest, getPersonsRequest } from '@/requestManager/CRM/personsRequests';

const state = () => ({
  persons: [],
});

const mutations = {
  SET_PERSONS(state, persons) {
    state.persons = persons;
  },
  DELETE_PERSON(state, personId) {
    state.persons = state.persons.filter(({ id }) => (
      id !== personId
    ))
  },
  ADD_NEW_PERSON(state, person) {
    state.persons.push(person);
  },
  EDIT_PERSON(state, person) {
    const actualPerson = state.persons.find(item => item.id === person.id);
    const actualPersonIndex = state.persons.indexOf(actualPerson);

    if(actualPersonIndex !== -1) {
      state.persons.splice(actualPersonIndex, 1, person);
    }
  }
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
    const response = await deletePersonRequest({ params });

    if(response.status === 200) {
      commit('DELETE_PERSON', params.id);
    }

    return response;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
