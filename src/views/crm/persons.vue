<template>
  <div class="view-crm-persons">
    <div class="view-crm-persons__btns">
      <VButton class="view-crm-persons__btn-item" @click.native.stop="openAddModal">
        Добавить
      </VButton>
    </div>

    <div class="view-crm-persons__table-container">
      <VTable
        :headerData="headerData"
        :bodyData="filteredPersonsList"
        class="view-crm-persons__table"
        @editById="openEditModal"
        @deleteById="deletePersonById"
      />
    </div>

    <portal to="modal-group">
      <ModalAddPerson
        v-if="showModalAddPerson"
        v-bind="modalPersonAttrs"
        @closeModal="CLOSE_CUSTOM_MODAL"
        @submitForm="submitForm"
      />
    </portal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions,  } from 'vuex';


import ModalAddPerson from '@/components/common/Modals/CRM/ModalAddPerson';
import VTable from '@/components/common/ui/VTable';
import VButton from '@/components/common/ui/Buttons/VButton';

import dayjs from 'dayjs';
import { PERSON_SCHEME, } from '@/utils/schemes/CRM/profile';
import {createPersonRequest, editPersonRequest,} from '@/requestManager/CRM/personsRequests';

export default {
  name: 'ViewCRMPersons',
  components: {
    ModalAddPerson,
    VTable,
    VButton,
  },

  data: () => ({
    editingPersonId: null,
  }),
  computed: {
    ...mapState('CRMPersons', [
      'persons',
    ]),
    ...mapState('CRMEducations', [
      'educations',
    ]),
    ...mapState('Modal', [
      'openedCustomModal',
    ]),

    headerData() {
      const newHeader = [];

      for (let [key, value] of Object.entries(PERSON_SCHEME)) {
        if(value.notShow) continue;

        newHeader.push({
          id: key,
          value: value.label,
          alias: key,
          type: 'string',
        });
      }

      return newHeader;
    },
    filteredPersonsList() {
      //Приводим в правильный для таблицы вид
      const filteredData = [];

      for (let person of this.persons) {
        const newPersonData = [];

        for (let [personKey, personValue] of Object.entries(person)) {
          for (let [key, value] of Object.entries(PERSON_SCHEME)) {
            if (personKey === key) {
              switch (value.type) {
                case 'image':
                  newPersonData.push({type: 'image', imageLink: personValue, alias: key})

                  break;
                case 'date': {
                  let date = personValue ? dayjs(personValue).format(value.format) : '-';
                  newPersonData.push({type: 'string', value: date, alias: key})

                  break;
                }
                default:
                  newPersonData.push({
                    type: value.type,
                    value: personValue || '-',
                    alias: key
                  });
              }

              break;
            }
          }
        }

        filteredData.push({id: person.id, data: newPersonData});
      }

      return filteredData;
    },
    showModalAddPerson() {
      return this.openedCustomModal === 'adding-or-editing-person';
    },
    modalPersonAttrs() {
      if(this.editingPersonId) return { personData: this.persons.find(item => item.id === this.editingPersonId)};

      return null
    },
  },

  async created() {
    try {
      await this.getPersons();
    } catch (e) {
      this.$notify({
        group: 'error',
        type: 'error',
        title: e,
        text: 'Что-то пошло не так!',
      });
    }
  },
  methods: {
    ...mapMutations('Modal', [
      'OPEN_CUSTOM_MODAL',
      'CLOSE_CUSTOM_MODAL',
    ]),
    ...mapActions('CRMEducations', [
      'getEducations',
    ]),
    ...mapActions('CRMPersons', [
      'deletePerson',
      'getPersons',
    ]),
    ...mapMutations('CRMPersons', [
      'ADD_NEW_PERSON',
      'EDIT_PERSON',
    ]),

    openAddModal() {
      this.editingPersonId = null;
      this.OPEN_CUSTOM_MODAL('adding-or-editing-person')
    },
    openEditModal(id) {
      this.editingPersonId = id;
      this.OPEN_CUSTOM_MODAL('adding-or-editing-person')
    },
     async editPerson(personId, requestData) {
      try {
        const response =  await editPersonRequest({ params: {id: personId} }, requestData)

        this.EDIT_PERSON(response.data);
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: e,
          text: 'Что-то пошло не так при редактировании пользователя!',
        });
      }
    },
    async createNewPerson(requestData) {
      try {
        const response = await createPersonRequest( requestData );

        this.ADD_NEW_PERSON(response.data);
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: e,
          text: 'Что-то пошло не так при создании пользователя!',
        });
      }
    },
    async deletePersonById(id) {
      try {
        const response = await this.deletePerson({
          params: {
            id,
          },
        });

        console.log(response);
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: e,
          text: 'Что-то пошло не так при удалении пользователя!',
        });
      }
    },
    async submitForm(requestData, editingId) {
      if(editingId) {
        await this.editPerson(editingId, requestData);
      } else {
        await this.createNewPerson(requestData);
      }

      this.CLOSE_CUSTOM_MODAL();
    },
  },
}
</script>

<style lang="scss" scoped>
.view-crm-persons {
  overflow: hidden;
}

::v-deep .v-table__cell {
  &_avatar {
    width: 100px;
  }
}

.view-crm-persons__table-container {
  max-width: 100%;
  overflow: auto;
}

.view-crm-persons__table {
  margin-top: 25px;

  @media (max-width: 1200px) {
    width: 1100px;
  }
}

.view-crm-persons__btns {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;

  @media (max-width: 650px) {
    margin: 10px 0;
  }
}

.view-crm-persons__btn-item {
  width: 180px;
  height: 35px;

  @media (max-width: 650px) {
    width: 140px;
  }
}
</style>
