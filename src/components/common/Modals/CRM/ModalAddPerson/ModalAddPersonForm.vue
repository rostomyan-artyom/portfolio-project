<template>
  <form class="modal-add-person-form" @submit.prevent>
    <div
      v-for="inputItem in inputList"
      :key="inputItem.id"
      class="modal-add-person-form__item"
    >
      <p class="modal-add-person-form__label">
        {{ inputItem.label }}
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

      <VueSelect
        :value="selectItem.activeId"
        :options="selectItem.options"
        :reduce="item => item.id"
        :getOptionLabel="item => item.title"
        @input="$emit('changeActiveSelectItem', selectItem.id, $event)"
      />
    </div>
  </form>
</template>

<script>
import VueSelect from 'vue-select';
import VInput from '@/components/common/ui/Inputs/VInput';
import VSwitch from '@/components/common/ui/Switches/VSwitch';
import VDatepicker from '@/components/common/ui/VDatepicker';

export default {
  name: 'ModalAddPersonForm',
  components: {
    VueSelect,
    VInput,
    VSwitch,
    VDatepicker,
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
  }
}
</script>

<style lang="scss" scoped>
.modal-add-person-form__item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}

.modal-add-person-form__input {
  width: 250px;
}

.modal-add-person-form {
  margin-top: 25px;
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

::v-deep .vs__dropdown-toggle {
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid $borderColor;
  background-color: #fff;
}
</style>
