<template>
  <modal
    name="modal-add-person"
    :width="470"
    height="580"
    :adaptive="true"
    @before-open="beforeOpen"
  >
    <div class="modal-add-person__content">
      <p class="modal-add-person__title">
        Добавление новой персоны
      </p>

      <ModalAddPersonForm
        v-bind="formAttrs"
        @updateGender="updateGender"
        @changeActiveSelectItem="changeActiveSelectItem"
        @changeInput="changeInput"
        @changeDate="changeDate"
      />
    </div>
  </modal>
</template>

<script>
import { mapActions, mapGetters,} from 'vuex';

import ModalAddPersonForm from '@/components/common/Modals/CRM/ModalAddPerson/ModalAddPersonForm';

export default {
  name: 'ModalAddPerson',
  components: {
    ModalAddPersonForm,
  },


  data() {
    return {
      inputList: [
        {
          id: 1,
          value: '',
          label: 'Полное имя',
          placeholder: 'Введите полное имя',
        },
      ],

      genderTypes: [
        { title: 'Мужчина', active: true, },
        { title: 'Женщина', active: false, },
      ],
      dateOfBirth: new Date(),

      selectsList: [
        {
          id: 1,
          label: 'Должность',
          optionsAlias: 'positions',
          options: [],
          activeId: null,
        },
        {
          id: 2,
          label: 'Образование',
          optionsAlias: 'educations',
          options: [],
          activeId: null,
        },
      ]
    }
  },
  computed: {
    ...mapGetters('CRMPositions', [
      'positions',
    ]),
    ...mapGetters('CRMEducations', [
      'educations',
    ]),
    formAttrs() {
      return {
        inputList: this.inputList,
        genderTypes: this.genderTypes,
        dateOfBirth: this.dateOfBirth,
        selectsList: this.selectsList,
      };
    },
  },

  methods: {
    ...mapActions('CRMPositions', [
      'getPositions',
    ]),
    ...mapActions('CRMEducations', [
      'getEducations',
    ]),
    updateGender(activeIndex) {
      this.genderTypes.forEach((item, index) => item.active = index === activeIndex);
    },
    async beforeOpen() {
      await Promise.all([
        !this.positions.length ?  this.getPositions() : '',
        !this.educations.length ?  this.getEducations() : '',
      ]);

      for(let selectItem of this.selectsList) {
        const options = this[selectItem.optionsAlias];
        options ? selectItem.options = options : '';
      }
    },
    changeActiveSelectItem(selectGroupItemId, activeId) {
      for(let selectGroup of this.selectsList) {
        if(selectGroup.id === selectGroupItemId) {
          selectGroup.activeId = activeId;

          break;
        }
      }
    },
    changeInput(inputId, inputValue) {
      for(let inputItem of this.inputList) {
        if(inputItem.id === inputId) {
          inputItem.value = inputValue;

          break;
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

.modal-add-person__content {
  padding: 25px;
}

.modal-add-person__title {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #000;
}
</style>
