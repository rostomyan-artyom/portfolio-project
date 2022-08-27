<template>
  <div class="view-crm">
    <CrmHeader />

    <div class="view-crm__table-container">
      <div class="view-crm__btns">
        <VButton class="view-crm__btn-item" @click.native="addPerson">
          Добавить
        </VButton>
      </div>

      <VTable
        :headerData="headerData"
        :bodyData="filteredPersonsList"
        class="view-crm__table"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import CrmHeader from '@/components/crm/CrmHeader';
import VTable from '@/components/common/ui/VTable';
import VButton from '@/components/common/ui/Buttons/VButton';

const personScheme = {
  avatar: {
    type: 'image'
  },
  fullName: {
    type: 'string'
  },
  age: {
    type: 'string'
  },
  gender: {
    type: 'string'
  },
  post: {
    type: 'string'
  },
  education: {
    type: 'string'
  },
  createdAt: {
    type: 'date',
    format: 'DD.MM.YYYY HH:mm'
  },
}

export default {
  name: 'ViewCRM',
  components: {
    CrmHeader,
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
    personsList: [],
  }),
  computed: {
    filteredPersonsList() {
      const filteredData = [];

      for(let person of this.personsList) {
        const newPersonData = [];

        const personKeys = Object.keys(person);

        for(let personKey of personKeys) {
          for(let [key, value] of Object.entries(personScheme)) {
            if(personKey === key) {
              if(value.type === 'image') {
                newPersonData.push({ type: 'image', imageLink: person[personKey], alias: key })

                break;
              }

              if(value.type === 'date') {
                const date = dayjs(person[personKey]).format(value.format);
                newPersonData.push({ type: 'string', value: date, alias: key })

                break;
              }

              newPersonData.push({ type: 'string', value: person[personKey] || '-', alias: key });
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
      const persons = await this.axios.get('/persons');

      console.log(persons)

      this.personsList = persons.data;
    } catch(e) {
      console.log(e);
    }
  },

  methods: {
    addPerson() {
      console.log('fssfd')
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-table__cell {
  &_avatar {
    width: 100px;
  }
}

.view-crm__table-container {
  overflow-x: auto;
}

.view-crm__table {
  max-height: 750px;
  margin-top: 25px;
  @media (max-width: 1200px) {
    width: 1000px;
  }
}

.view-crm__btns {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.view-crm__btn-item {
  width: 180px;
  height: 35px;
}
</style>
