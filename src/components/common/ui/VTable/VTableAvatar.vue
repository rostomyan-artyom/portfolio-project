<template>
  <div class="v-table-avatar">
    <img
      :src="imageLink"
      alt="#"
      class="v-table-avatar__img"
    />
  </div>
</template>

<script>
export default {
  name: 'VTableAvatar',

  props: {
    imageLink: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.v-table-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 4px 1px #e0e0e0;
}

.v-table-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
