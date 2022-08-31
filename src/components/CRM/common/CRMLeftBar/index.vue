<template>
  <div class="crm-left-bar">
    <div class="crm-left-bar__logo">
      <VBurger
        v-tooltip="burgerTooltip"
        :status="burgerShow"
        @click.native="toggleBurgerShow"
      />
    </div>

    <div class="crm-left-bar__routes">
      <ul class="crm-left-bar__routes-list">
        <li
          v-for="routeItem in routes"
          :key="routeItem.id"
          class="crm-left-bar__route-item"
        >
          <router-link
            v-tooltip="routeItem.label" :to="'/crm/' + routeItem.to"
            class="crm-left-bar__route-item-link"
          >
            <component :is="routeItem.icon" class="crm-left-bar__route-item-icon" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import burgerMixin from '@/mixins/CRM/burgerMixin';

import VBurger from '@/components/common/ui/VBurger';
import HomeIcon from '@/assets/icons/crm/home.svg';
import UsersIcon from '@/assets/icons/crm/users.svg';

export default {
  name: 'CRMLeftBar',
  components: {
    VBurger,
  },
  mixins: [ burgerMixin, ],

  data() {
    return {
      routes: [
        {
          id: 1,
          to: '',
          label: 'CRM',
          icon: HomeIcon,
        },
        {
          id: 2,
          to: 'persons',
          label: 'Клиенты',
          icon: UsersIcon,
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.crm-left-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 15px 5px;
  border-radius: 12px 0 0 12px;
  box-shadow: 2px 0 3px 1px #e8e8e8;

  @media (max-width: 1200px) {
    border-radius: 0 12px 12px 0;
    box-shadow: unset;
  }
}

.crm-left-bar__routes {
  border-top: 1px solid $light-gray-color;
  padding: 20px 0;
  margin-top: 150px;
}

.crm-left-bar__route-item {
  &:not(:first-child) {
    margin-top: 30px;
  }
}

.crm-left-bar__route-item-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  padding: 3px;
  border: 2px solid transparent;
  border-radius: 50%;
}


.crm-left-bar__route-item-link.router-link-exact-active {
 border: 2px solid $blue;
}

.crm-left-bar__route-item-icon {
  width: 30px;
  min-width: 30px;
  height: 30px;
}
</style>
