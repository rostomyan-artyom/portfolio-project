<template>
  <div class="layout-crm">
    <div class="layout-crm__content">
      <CRMLeftBar :class="['layout-crm__left-bar', { 'layout-crm__left-bar_unshow': !burgerShow },]" />

      <div class="layout-crm__view">
        <CRMHeader class="layout-crm__header" />

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, } from 'vuex';

import CRMLeftBar from "@/components/CRM/common/CRMLeftBar";
import CRMHeader from '@/components/CRM/common/CRMHeader';

export default {
  name: 'LayoutCRM',
  components: {
    CRMLeftBar,
    CRMHeader,
  },

  computed: {
    ...mapState('CRMBurger', [
      'burgerShow',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.layout-crm {
  min-height: 100vh;
  padding: 15px 40px;
  background-color: #ebebeb;
  @media (max-width: 1200px) {
    padding: 0;
    background-color: #f5f5f5;
  }
}

.layout-crm__content {
  display: flex;
  border-radius: 7px;
  height: calc(100vh - 30px);
  overflow: hidden;
  @media (max-width: 1200px) {
    height: 100vh;
  }
}

.layout-crm__left-bar {
  height: 100%;
  width: 60px;
  transition: .2s cubic-bezier(0.6, 0.1, 0.15, 0.8);
  &_unshow {
    width: 0;
    padding: 0;
  }
}

.layout-crm__view {
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  padding:  80px 15px 0 15px;
  max-height: 100%;
  overflow: auto;
}

.layout-crm__header {
  position: absolute;
  top: 0;
  right: 15px;
  width: calc(100% - 30px);
  background-color: #f5f5f5;
  z-index: 2;
}
</style>
