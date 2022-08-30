<template>
  <div class="layout-crm">
    <div class="layout-crm__content">
      <CRMLeftBar class="layout-crm__left-bar" />

      <div class="layout-crm__view">
        <CRMHeader />

        <router-view class="" />
      </div>
    </div>
  </div>
</template>

<script>
import CRMLeftBar from "@/components/CRM/CRMLeftBar";
import CRMHeader from '@/components/CRM/CRMHeader';

export default {
  name: 'LayoutCRM',
  components: {
    CRMLeftBar,
    CRMHeader,
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
  //overflow: hidden;
  border-radius: 7px;
}

.layout-crm__left-bar {
  height: calc(100vh - 30px);
  @media (max-width: 1200px) {
    height: 100vh;
  }
}

.layout-crm__view {
  width: 100%;
  background-color: #f5f5f5;
  padding: 0 15px;
}
</style>
