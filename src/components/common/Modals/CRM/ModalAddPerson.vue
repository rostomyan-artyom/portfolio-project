<template>
  <modal
    name="modal-add-person"
    :width="450"
    height="auto"
    @before-open="open"
    @closed="closed"
    class="modal-add-person"
  >
    <div class="modal-add-person__content">
      <p class="modal-add-person__title">
        Добавление новой персоны
      </p>

      <form class="modal-add-person__form" @submit.prevent>
        <VInput
          v-for="inputItem in inputList"
          :key="inputItem.id"
          :value="inputItem.value"
          :label="inputItem.label"
          :placeholder="inputItem.placeholder"
          class="modal-add-person__from-item"
        />

        <VSwitch
          :switchList="genderTypes"
          class="modal-add-person__from-item modal-add-person__switch"
          @selectItem="updateGender"
        />
      </form>
    </div>
  </modal>
</template>

<script>
import VInput from '@/components/common/ui/Inputs/VInput';
import VSwitch from '@/components/common/ui/Switches/VSwitch';

export default {
  name: 'ModalAddPerson',
  components: {
    VInput,
    VSwitch,
  },

  data: () => ({
    inputList: [
      {
        id: 1,
        value: '',
        label: 'Полное имя',
        placeholder: 'Введите дату рождения',
      },
      {
        id: 2,
        value: '',
        label: 'Дата рождения',
        placeholder: 'Дата рождения',
        type: 'date'
      },
    ],
    genderTypes: [
      { title: 'Мужчина', active: true, },
      { title: 'Женщина', active: false, },
    ],
  }),

  methods: {
    updateGender(activeIndex) {
      this.genderTypes.forEach((item, index) => item.active = index === activeIndex);
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-add-person__content {
  padding: 10px;
}

.modal-add-person__title {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #313131;
}

.modal-add-person__from-item {
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
</style>
