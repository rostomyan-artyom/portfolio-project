<template>
  <div class="modal-add-person">
    <div class="modal-add-person__header">
      <p class="modal-add-person__title">
        Добавление новой персоны
      </p>

      <button class="modal-add-person__close-btn" @click="$emit('closeModal')">
        <CrossIcon class="modal-add-person__close-icon" />
      </button>
    </div>


    <ModalAddPersonForm
      v-bind="formAttrs"
      @updateGender="updateGender"
      @changeActiveSelectItem="changeActiveSelectItem"
      @changeInput="changeInput"
      @changeDate="changeDate"
      @submitForm="$emit('submitForm', $event, personData.id || null)"
    />
  </div>
</template>

<script>
import { mapActions, mapState,} from 'vuex';

import ModalAddPersonForm from '@/components/common/Modals/CRM/ModalAddPerson/ModalAddPersonForm';
import CrossIcon from '@/assets/icons/common/cross.svg';
import { PERSON_SCHEME } from '@/utils/schemes/CRM/profile';

export default {
  name: 'ModalAddPerson',
  components: {
    ModalAddPersonForm,
    CrossIcon,
  },

  props: {
    personData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputList: [
        {
          id: 1,
          value: '',
          requestAlias: 'fullName',
          label: 'Полное имя',
          placeholder: 'Введите полное имя',
        },
        {
          id: 2,
          value: '',
          requestAlias: 'avatar',
          label: 'Ссылка на фото',
          tooltipt: '(нет полноценного клиент-серверного api для загрузки file), а base64 грузить в Json server не хочется. и не уверен что получится:) Но поверь мне на слово, грузить файл в formData я умею :D',
          placeholder: 'https://...',
        },
      ],

      genderTypes: [
        { title: 'Мужчина', active: true, },
        { title: 'Женщина', active: false, },
      ],
      dateOfBirth: null,

      selectsList: [
        {
          id: 1,
          label: 'Должность',
          optionsAlias: 'positions',
          requestAlias: 'post',
          options: [],
          activeId: null,
        },
        {
          id: 2,
          label: 'Образование',
          optionsAlias: 'educations',
          requestAlias: 'education',
          options: [],
          activeId: null,
        },
      ],

      createdAt: new Date(),
    }
  },
  computed: {
    ...mapState('CRMPositions', [
      'positions',
    ]),
    ...mapState('CRMEducations', [
      'educations',
    ]),
    formAttrs() {
      return {
        inputList: this.inputList,
        genderTypes: this.genderTypes,
        dateOfBirth: this.dateOfBirth,
        selectsList: this.selectsList,
        createdAt: this.createdAt,
        editingMode: !!(this.personData.id),
      };
    },
  },

  async created() {
    try {
      await this.startedRequests();

      //если в пропсе есть данные о персоне(для изменения) - обновляем данные в формочках
      const personDataEntries = Object.entries(this.personData);
      personDataEntries.length ? this.fillFormWithPropsData(personDataEntries): '';
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
    ...mapActions('CRMPositions', [
      'getPositions',
    ]),
    ...mapActions('CRMEducations', [
      'getEducations',
    ]),
    async startedRequests() {
      await Promise.all([
        !this.positions.length ?  this.getPositions() : '',
        !this.educations.length ?  this.getEducations() : '',
      ]);

      for(let selectItem of this.selectsList) {
        const options = this[selectItem.optionsAlias];
        options ? selectItem.options = options : '';
      }
    },
    fillFormWithPropsData(personDataEntries) {
      for(let [key, value] of personDataEntries) {
        for(let [schemeKey, schemeValue] of Object.entries(PERSON_SCHEME)) {
         if(key === schemeKey) {
           switch (schemeValue.inputAlias) {
             case 'inputList': {
                this.changeInput(key, value, 'requestAlias');
                break;
             }
             case 'dateOfBirth':
               console.log(key, value);
               this.dateOfBirth = new Date(value);
               break;
             case 'selectsList':
               this.startingChangeSelectList(key, value)
               break;
             case 'createdAt':
               this.createdAt = value;
               break;
           }

           break;
         }
        }
      }
    },
    updateGender(activeIndex) {
      this.genderTypes.forEach((item, index) => item.active = index === activeIndex);
    },
    changeActiveSelectItem(comparisonValue, newValue, comparisonKey = 'id') {
      for(let selectGroup of this.selectsList) {
        if(selectGroup[comparisonKey] === comparisonValue) {
          selectGroup.activeId = newValue;

          break;
        }
      }
    },
    changeInput(comparisonValue, newValue, comparisonKey = 'id') {
      for(let inputItem of this.inputList) {
        if(inputItem[comparisonKey] === comparisonValue) {
          inputItem.value = newValue;

          break;
        }
      }
    },
    // Костыль - по скольку с апи приходит текст должности, а в коде я использую active-id - мне прийдется искать активный active-option строго в самих опциях.
    // Т.к нет полноценного апи!!!
    startingChangeSelectList(selectAlias, value) {
      for(let selectValue of Object.values(this.selectsList)) {
        if(selectValue.requestAlias === selectAlias) {
          const activeOption = selectValue.options.find(item => item.title === value);

          if(activeOption) selectValue.activeId = activeOption.id;
        }
      }
    },
    changeDate(date) {
      this.dateOfBirth = date;
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'vue-select/dist/vue-select.css';

.modal-add-person {
  padding: 25px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 10px 0 rgba(89, 89, 89, 0.5);
  width: 450px;

  @media (max-height: 650px) {
    padding: 10px;
    max-height: 90vh;
    overflow-y: auto;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
}

.modal-add-person__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-add-person__title {
  font-weight: 500;
  font-size: 18px;
  color: #000;
  @media (max-width: 650px) {
    font-size: 16px;
  }
}

.modal-add-person__close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 6px;
  transition: .2s;
  &:hover {
    background-color: #e7e7e7;
  }
}

.modal-add-person__close-icon {
  width: 14px;
  min-width: 14px;
  height: 14px;
}
</style>
