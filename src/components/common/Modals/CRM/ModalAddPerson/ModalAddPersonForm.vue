<template>
  <form class="modal-add-person-form" @submit.prevent>
    <div
      v-for="inputItem in inputList"
      :key="inputItem.id"
      class="modal-add-person-form__item"
    >
      <p class="modal-add-person-form__label">
        {{ inputItem.label }}

        <span
          v-if="inputItem.tooltipt"
          v-tooltip="inputItem.tooltipt"
          class="modal-add-person-form__tooltip"
        >
          ?
        </span>
      </p>

      <VInput
        :value="inputItem.value"
        :placeholder="inputItem.placeholder"
        @changeValue="$emit('changeInput', inputItem.id, $event)"
      />
    </div>

    <div class="modal-add-person-form__item">
      <p class="modal-add-person-form__label">
        Дата рождения
      </p>

      <VDatepicker :value="dateOfBirth" @input="$emit('changeDate', $event)" />
    </div>

    <div class="modal-add-person-form__item">
      <p class="modal-add-person-form__label modal-add-person-form__label_center">
        Пол
      </p>

      <VSwitch
        :switchList="genderTypes"
        class="modal-add-person-form__switch"
        @selectItem="$emit('updateGender', $event)"
      />
    </div>

    <div
      v-for="selectItem in selectsList"
      :key="selectItem.id + 2"
      class="modal-add-person-form__item"
    >
      <p class="modal-add-person-form__label">
        {{ selectItem.label }}
      </p>

      <VSelect
        :value="selectItem.activeId"
        :options="selectItem.options"
        :reduce="item => item.id"
        :getOptionLabel="item => item.title"
        @input="$emit('changeActiveSelectItem', selectItem.id, $event)"
      />
    </div>

    <VButton class="modal-add-person-form__submit-btn" @click.native="createNewUser">
      {{ editingMode ? 'Сохранить' : 'Создать' }}
    </VButton>
  </form>
</template>

<script>
import VSelect from '@/components/common/ui/VSelect';
import VInput from '@/components/common/ui/Inputs/VInput';
import VSwitch from '@/components/common/ui/Switches/VSwitch';
import VDatepicker from '@/components/common/ui/VDatepicker';
import VButton from '@/components/common/ui/Buttons/VButton';

export default {
  name: 'ModalAddPersonForm',
  components: {
    VSelect,
    VInput,
    VSwitch,
    VDatepicker,
    VButton,
  },

  props: {
    inputList: {
      type: Array,
      default: () => ([]),
    },
    genderTypes: {
      type: Array,
      default: () => ([]),
    },
    dateOfBirth: { type: [Number, Date] },
    selectsList: {
      type: Array,
      default: () => ([]),
    },
    createdAt: [Number, Date],
    editingMode: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    calculateAge(dateString) {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    async createNewUser() {
      try {
        const requestData = { avatar: '', fullName: '', dateOfBirth: '', gender: '', post: '', education: '', createdAt: '', };

        for(let inputItem of this.inputList) {
          requestData[inputItem.requestAlias] = inputItem.value;
        }

        for(let selectItem of this.selectsList) {
          const activeOptionTitle = selectItem.options.find(item => item.id === selectItem.activeId)?.title;

          if(activeOptionTitle) {
            requestData[selectItem.requestAlias] = activeOptionTitle;
          }
        }

        requestData.dateOfBirth = this.dateOfBirth;
        requestData.gender = this.genderTypes.find(item => item.active).title;
        requestData.createdAt = this.createdAt || new Date();

        this.$emit('submitForm', requestData);
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: e,
          text: 'Что-то пошло не так!',
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-add-person-form__item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}

.modal-add-person-form {
  margin-top: 25px;

  @media (max-height: 650px) {
    margin-top: 15px;
  }
}

.modal-add-person-form__switch {
  width: 200px;
  height: 40px;
  margin: 0 auto;
}

.modal-add-person-form__label {
  font-size: 17px;
  color: #1a1a1a;
  margin-bottom: 10px;
  &_center {
    text-align: center;
  }
}


.modal-add-person-form__tooltip {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  min-width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 9px;
  background-color: #2c2c2c;
  color: #fff;
}
.modal-add-person-form__submit-btn {
  width: 300px;
  height: 35px;
  margin: 50px auto 0 auto;

  @media (max-height: 650px) {
    height: 33px;
    margin: 20px auto 0;
  }

  @media (max-width: 450px) {
    width: 100%;
  }
}

::v-deep .vs__dropdown-toggle {
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid $borderColor;
  background-color: #fff;
}
</style>
