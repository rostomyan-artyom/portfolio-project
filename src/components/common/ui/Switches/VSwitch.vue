<template>
  <ul class="v-switch">
    <li
      v-for="(switchItem, index) in switchList"
      :key="index"
      :class="[
        'v-switch__item',
        { 'v-switch__item_active': switchItem.active },
      ]"
      @click="$emit('selectItem', index)"
    >
      {{ switchItem.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VSwitch',

  props: {
    switchList: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="scss" scoped>
.v-switch {
  position: relative;
  display: flex;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 3px 3px rgba(88, 88, 88, 0.07);
  overflow: hidden;
}

.v-switch__item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  transition: .2s cubic-bezier(0.6, 0.1, 0.15, 0.8);
  border: 1px solid transparent;
  &_active {
    background-color: $blue;
    color: #fff;
    cursor: default;
  }
}
</style>
