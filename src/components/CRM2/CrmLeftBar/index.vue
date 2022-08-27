<template>
  <div class="crm-left-bar">
    <CryptoIcon />
  </div>
</template>

<script>
import CryptoIcon from '@/assets/icons/crm/crypto.svg';

export default {
  name: 'CrmLeftBar',
  components: {
    CryptoIcon,
  },
}
</script>

<style lang="scss" scoped>
.crm-left-bar {
  background-color: #fff;
  padding: 15px;
  border-radius: 12px 0 0 12px;
  box-shadow: 2px 0 3px 1px #e8e8e8;
  @media (max-width: 1200px) {
    border-radius: 0 12px 12px 0;
    box-shadow: unset;
  }
}
</style>
