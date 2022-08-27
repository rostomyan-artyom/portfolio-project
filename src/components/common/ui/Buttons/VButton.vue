<template>
  <div class="v-button">
    <button class="v-button__herro">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'VButton',
}
</script>

<style lang="scss" scoped>
.v-button {
  transition: .2s;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
  }
}

.v-button__herro {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #000067;
  transition: .2s;
  color: #fff;
  &:hover {
    background-color: #000094;
  }
  &:active {
    background-color: #000067;
  }
}
</style>
