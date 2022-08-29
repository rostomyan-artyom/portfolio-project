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

      <form class="modal-add-person__form" @submit.prevent>
        <div
          v-for="inputItem in inputList"
          :key="inputItem.id"
          class="modal-add-person__form-item"
        >
          <p class="modal-add-person__label">
            {{ inputItem.label }}
          </p>

          <VInput
            :value="inputItem.value"
            :placeholder="inputItem.placeholder"
          />
        </div>

        <div class="modal-add-person__form-item">
          <p class="modal-add-person__label modal-add-person__label_center">
            Пол
          </p>

          <VSwitch
            :switchList="genderTypes"
            class="modal-add-person__switch"
            @selectItem="updateGender"
          />
        </div>

        <div class="modal-add-person__form-item">
          <p class="modal-add-person__label">
            Образование
          </p>

          <VueSelect
            v-model="activeEducation"
            :options="educations"
            :reduce="item => item.id"
            :getOptionLabel="item => item.title"
          />
        </div>

        <div class="modal-add-person__form-item">
          <p class="modal-add-person__label">
            Должность
          </p>

          <VueSelect
            v-model="activePosition"
            :options="positions"
            :reduce="item => item.id"
            :getOptionLabel="item => item.title"
          />
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapState,} from 'vuex';

import VueSelect from 'vue-select';
import VInput from '@/components/common/ui/Inputs/VInput';
import VSwitch from '@/components/common/ui/Switches/VSwitch';

export default {
  name: 'ModalAddPerson',
  components: {
    VueSelect: VueSelect,
    VInput,
    VSwitch,
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
        {
          id: 2,
          value: '',
          label: 'Дата рождения',
          placeholder: 'Выберите дату рождения',
          type: 'date'
        },
      ],
      selectsList: [
        {
          id: 1,
          title: 'Должность',
          options: '',
        },
        {
          id: 2,
          title: 'Образование',
          options: this.educations,
        },
      ],
      genderTypes: [
        { title: 'Мужчина', active: true, },
        { title: 'Женщина', active: false, },
      ],
      activeEducation: null,
      activePosition: null,
    }
  },
  computed: {
    ...mapState('CRMEducations', [
      'educations',
    ]),
    ...mapState('CRMPositions', [
      'positions',
    ]),
  },

  methods: {
    ...mapActions('CRMEducations', [
      'getEducations',
    ]),
    ...mapActions('CRMPositions', [
      'getPositions',
    ]),
    updateGender(activeIndex) {
      this.genderTypes.forEach((item, index) => item.active = index === activeIndex);
    },
    async beforeOpen() {
      await Promise.all([
        !this.educations.length ?  this.getEducations() : '',
        !this.positions.length ?  this.getPositions() : '',
      ]);
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

.modal-add-person__form-item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}

.modal-add-person__input {
  width: 250px;
}

.modal-add-person__form {
  margin-top: 25px;
}

.modal-add-person__switch {
  width: 200px;
  height: 40px;
  margin: 0 auto;
}

.modal-add-person__label {
  font-size: 17px;
  color: #1a1a1a;
  margin-bottom: 10px;
  &_center {
    text-align: center;
  }
}
</style>
