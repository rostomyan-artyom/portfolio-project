<template>
  <div class="view-home">
    <router-link to="/crm" class="view-home__link">
      Go to crm
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ViewHome',
}
</script>

<style lang="scss" scoped>
.view-home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.view-home__link {
  position: relative;
  font-weight: 500;
  font-size: 17px;
  color: #2c2c2c;
  &:before {
    position: absolute;
    content: '';
    width: 30%;
    height: 1px;
    left: 0;
    bottom: -3px;
    background-color: #2c2c2c;
    transition: .2s;
  }
  &:hover {
    &:before {
      width: 100%;
    }
  }
}
</style>
