<template>
  <div class="crm-person-item-profile">
    <div class="crm-person-item-profile__avatar-box">
      <img
        v-if="profile.avatar"
        :src="profile.avatar"
        alt="#"
        class="crm-person-item-profile__avatar-img"
      />

      <img
        v-else
        src="@/assets/images/common/not-image.jpg"
        alt="#"
        class="crm-person-item-profile__avatar-img"
      />
    </div>

    <div class="crm-person-item-profile__info">
      <ul class="crm-person-item-profile__info-list">
        <template v-for="infoItem in filteredProfileInfo">
          <li
            v-if="infoItem.title"
            :key="infoItem.key"
            class="crm-person-item-profile__info-item"
          >
            <span class="crm-person-item-profile__info-item-text crm-person-item-profile__info-item-text_key">
              {{ infoItem.label }}:
            </span>

            <span class="crm-person-item-profile__info-item-text crm-person-item-profile__info-item-text_value">
              {{ infoItem.title }}
            </span>
          </li>
        </template>

      </ul>
    </div>
  </div>
</template>

<script>
import { PERSON_SCHEME } from '@/utils/schemes/CRM/profile';
import dayjs from "dayjs";

export default {
  name: 'CRMPersonItemProfile',

  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    newPersonScheme: {},
  }),

  computed: {
    filteredProfileInfo() {
      const finishedData = [];

      for(let [profileKey, profileValue] of Object.entries(this.profile)) {
        for(let [schemeKey, schemeValue] of Object.entries(this.newPersonScheme)) {
          if(schemeValue.notShow) continue;

          if(profileKey === schemeKey) {
            switch (schemeValue.type) {
              case 'date': {
                const date = dayjs(profileValue).format(schemeValue.format);

                finishedData.push({
                  key: profileKey,
                  title: date,
                  label: schemeValue.label,
                });

                break;
              }

              default:
                finishedData.push({
                  key: profileKey,
                  title: profileValue,
                  label: schemeValue.label,
                });
            }

            break;
          }
        }
      }

      return finishedData;
    },
  },

  created() {
    this.newPersonScheme = Object.assign({}, PERSON_SCHEME);
    delete this.newPersonScheme.avatar;
  },
}
</script>

<style lang="scss" scoped>
.crm-person-item-profile {
  display: flex;
  justify-content: center;
  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.crm-person-item-profile__avatar-box {
  width: 300px;
  min-width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px 1px rgba(201, 201, 201, 0.7);
  @media (max-width: 760px) {
    width: 200px;
    min-width: 200px;
    height: 200px;
    margin-bottom: 50px;
  }
}

.crm-person-item-profile__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.crm-person-item-profile__info {
  margin-left: 100px;
  @media (max-width: 760px) {
    margin-left: 0;
  }
}

.crm-person-item-profile__info-item {
  display: flex;
  justify-content: space-between;
  width: 250px;
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 0 5px 1px rgba(201, 201, 201, 0.7);

  &:not(:first-child) {
    margin-top: 15px;
  }
}

.crm-person-item-profile__info-item-text {
  font-size: 17px;
  line-height: 115%;

  &_key {
    color: #606060;
    font-size: 15px;
  }

  &_value {
    text-align: right;
  }
}

</style>
