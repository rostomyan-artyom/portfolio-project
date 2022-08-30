<template>
  <div class="view-crm-persons">
    <div class="view-crm-persons__btns">
      <VButton class="view-crm-persons__btn-item" @click.native="addPerson">
        Добавить
      </VButton>
    </div>

    <div class="view-crm-persons__table-container">
      <div class="view-crm-persons__table-a">
        <VTable
          :headerData="headerData"
          :bodyData="filteredPersonsList"
          class="view-crm-persons__table"
        />
      </div>
    </div>

    <ModalAddPerson />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import dayjs from 'dayjs';
import VTable from '@/components/common/ui/VTable';
import VButton from '@/components/common/ui/Buttons/VButton';
import ModalAddPerson from '@/components/common/Modals/CRM/ModalAddPerson';

import { personScheme } from '@/utils/schemes/CRM/profile';

export default {
  name: 'ViewCRMPersons',
  components: {
    ModalAddPerson,
    VTable,
    VButton,
  },

  data: () => ({
    headerData: [
      {
        id: 1,
        type: 'string',
        alias: 'avatar',
        value: 'Аватарка'
      },
      {
        id: 2,
        type: 'string',
        alias: 'fullName',
        value: 'ФИО',
      },
      {
        id: 3,
        type: 'string',
        value: 'Возраст',
      },
      {
        id: 4,
        type: 'string',
        value: 'Пол',
      },
      {
        id: 5,
        type: 'string',
        value: 'Должность',
      },
      {
        id: 6,
        type: 'string',
        value: 'Образование',
      },
      {
        id: 7,
        type: 'string',
        value: 'Дата создания',
      },
    ],
  }),
  computed: {
    ...mapState('CRMPersons', [
      'persons',
    ]),
    ...mapState('CRMEducations', [
      'educations',
    ]),
    filteredPersonsList() {
      const filteredData = [];

      for(let person of this.persons) {
        const newPersonData = [];

        const personKeys = Object.keys(person);

        for(let personKey of personKeys) {
          for(let [key, value] of Object.entries(personScheme)) {
            if(personKey === key) {
              switch (value.type) {
                case 'image':
                  newPersonData.push({ type: 'image', imageLink: person[personKey], alias: key })

                  break;
                case 'date': {
                  const date = dayjs(person[personKey]).format(value.format);
                  newPersonData.push({ type: 'string', value: date, alias: key })

                  break;
                }
                default:
                  newPersonData.push({ type: value.type, value: person[personKey] || '-', alias: key });
              }

              break;
            }
          }
        }

        filteredData.push({id: person.id, data: newPersonData});
      }

      return filteredData;
    },
  },

  async created() {
    try {
      await Promise.all([
        this.getPersons(),
      ]);
    } catch(e) { console.log(e); }
  },

  methods: {
    ...mapActions('CRMEducations', [
      'getEducations',
    ]),
    ...mapActions('CRMPersons', [
      'getPersons',
    ]),
    addPerson() {
      this.$modal.show('modal-add-person');
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
  overflow: hidden;
}

.view-crm-persons__table-a {
  overflow: auto;
  width: 100%;
}

.view-crm-persons__table {
  max-height: 750px;
  margin-top: 25px;
  @media (max-width: 1200px) {
    width: 1100px;
  }
}

.view-crm-persons__btns {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.view-crm-persons__btn-item {
  width: 180px;
  height: 35px;
}
</style>
