<template>
  <div class="crm-header">
    <div class="crm-header__account">
      <button class="crm-header__account-info-btn">
        <ArrowIcon class="crm-header__arrow"/>
      </button>

      <PersonIcon class="crm-header__person" />
    </div>
  </div>
</template>

<script>
import ArrowIcon from '@/assets/icons/common/arrow.svg';
import PersonIcon from '@/assets/icons/common/person.svg';

export default {
  name: 'CRMHeader',
  components: {
    ArrowIcon,
    PersonIcon,
  },
}
</script>

<style lang="scss" scoped>
::v-deep .crm-header__arrow {
  width: 13px;
  height: auto;
  path {
    fill: $gray-color
  }
}

::v-deep .crm-header__person {
  margin-left: 10px;
  path {
    stroke: $gray-color
  }
  circle {
    stroke: $gray-color
  }
}

.crm-header {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid $light-gray-color;
  padding: 12px 0 15px 0;
}

.crm-header__account {
  display: flex;
  align-items: center;
}

.crm-header__icon {
  display: block;
}

.crm-header__account-info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
}

.crm-header__arrow {
  transform: rotate(180deg);
}
</style>
