<template>
  <div class="view-crm-person-item">
    <CRMPersonItemProfile
      v-if="profile"
      :profile="profile"
      class="view-crm-person-item__profile"
    />
  </div>
</template>

<script>
import CRMPersonItemProfile from '@/components/CRM/CRMPersonItem/CRMPersonItemProfile';
import { getPersonRequest } from '@/requestManager/CRM/personsRequests';

export default {
  name: 'ViewCRMPersonItem',
  components: {
    CRMPersonItemProfile,
  },
  data() {
    return {
      profile: null,
    };
  },

  async created() {
    const profileResponse = await getPersonRequest({
      params: {
        id: this.$route.params.id,
      },
    });

    if(profileResponse.status !== 200) {
      throw new Error(profileResponse);
    }

    this.profile = profileResponse.data;
  }
}
</script>

<style lang="scss" scoped>
.view-crm-person-item__profile {
  margin-top: 50px;
}
</style>
