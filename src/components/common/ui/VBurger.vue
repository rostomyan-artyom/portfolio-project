<template>
  <div :class="[ 'v-burger', { 'v-burger_open': status } ]">
    <span />
  </div>
</template>

<script>
export default {
  name: 'VBurger',

  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-burger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  position: relative;
  transition-duration: 1s;
  overflow: hidden;
  cursor: pointer;
}

.v-burger span {
    height: 2px;
    width: 25px;
    background-color: $blue;
    position: absolute;
    transition-duration: .25s;
    transition-delay: .25s;
}

.v-burger span:before {
    left: 0;
    position: absolute;
    top: -5px;
    height: 2px;
    width: 25px;
    background-color: $blue;
    content: "";
    transition-duration: .25s;
    transition: transform .25s, top .25s .25s;
}

.v-burger span:after {
    left: 0;
    position: absolute;
    top: 5px;
    height: 2px;
    width: 25px;
    background-color: $blue;
    content: "";
    transition-duration: .25s;
    transition: transform .25s, top .25s .25s;
}

.v-burger_open span {
    transition-duration: 0.1s;
    transition-delay: .25s;
    background: transparent;
}

.v-burger_open span:before {
    transition: top .25s, transform .25s .25s;
    top: 0px;
    transform: rotateZ(-45deg);
}

.v-burger_open span:after {
    transition: top 0.4s, transform .25s .25s;
    top: 0px;
    transform: rotateZ(45deg);
}
</style>
