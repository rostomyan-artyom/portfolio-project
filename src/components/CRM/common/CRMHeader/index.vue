<template>
  <div :class="['crm-header', { 'crm-header__burger-closed': !burgerShow },]">
    <VBurger
      v-tooltip="burgerTooltip"
      :status="burgerShow"
      @click.native="toggleBurgerShow"
      class="crm-header__burger"
    />

    <div class="crm-header__account">
      <button class="crm-header__account-info-btn">
        <ArrowIcon class="crm-header__arrow"/>
      </button>

      <PersonIcon class="crm-header__person" />
    </div>
  </div>
</template>

<script>
import burgerMixin from '@/mixins/CRM/burgerMixin';

import VBurger from '@/components/common/ui/VBurger';
import ArrowIcon from '@/assets/icons/common/arrow.svg';
import PersonIcon from '@/assets/icons/common/person.svg';

export default {
  name: 'CRMHeader',
  components: {
    VBurger,
    ArrowIcon,
    PersonIcon,
  },
  mixins: [ burgerMixin, ],
}
</script>

<style lang="scss" scoped>
.crm-header {
  position: relative;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid $light-gray-color;
  padding: 12px 0 15px 0;
}

.crm-header__burger-closed .crm-header__burger {
  opacity: 1;
  left: 0;
  top: 12px;
}

::v-deep .crm-header__arrow {
  width: 13px;
  height: auto;
  path {
    fill: $blue;
  }
}

::v-deep .crm-header__person {
  margin-left: 10px;
  path {
    stroke: $blue;
  }
  circle {
    stroke: $blue;
  }
}

.crm-header__burger {
  position: absolute;
  opacity: 0;
  transition: .2s cubic-bezier(0.6, 0.1, 0.15, 0.8);
  top: -200%;
  left: 0;
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
