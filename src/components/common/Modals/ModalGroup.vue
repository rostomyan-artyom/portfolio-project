<template>
  <div class="modal-group">
    <portal-target name="modal-group" v-click-outside="CLOSE_CUSTOM_MODAL" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ModalGroup',

  methods: {
    ...mapMutations('Modal', [
      'CLOSE_CUSTOM_MODAL',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.modal-group {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.vue-portal-target {
  @media (max-width: 500px) {
    width: 95%;
  }
}
</style>
