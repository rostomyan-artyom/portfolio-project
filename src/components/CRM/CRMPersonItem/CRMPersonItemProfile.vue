<template>
  <div class="crm-person-item-profile">
    <div class="crm-person-item-profile__avatar-box">
      <img
        :src="profile.avatar"
        alt="#"
        class="crm-person-item-profile__avatar-img"
      />
    </div>

    <div class="crm-person-item-profile__info">
      <ul class="crm-person-item-profile__info-list">
        <li
          v-for="[key, value] in Object.entries(filteredProfileInfo)"
          :key="key"
          class="crm-person-item-profile__info-item"
        >
          <span>
            {{ value }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { personScheme } from '@/utils/schemes/CRM/profile';
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
      const finishedData = {};

      for(let [profileKey, profileValue] of Object.entries(this.profile)) {
        for(let [schemeKey, schemeValue] of Object.entries(this.newPersonScheme)) {
          if(profileKey === schemeKey) {
            switch (schemeValue.type) {
              case 'date': {
                const date = dayjs(profileValue).format(schemeValue.format);

                finishedData[profileKey] = date;

                break;
              }

              default:
                finishedData[profileKey] = profileValue;
            }

            break;
          }
        }
      }

      return finishedData;
    },
  },

  created() {
    this.newPersonScheme = Object.assign({}, personScheme);
    delete this.newPersonScheme.avatar;

    console.log(this.newPersonScheme, personScheme)
  }
}
</script>

<style lang="scss" scoped>
.crm-person-item-profile {
  display: flex;
  justify-content: center;
}

.crm-person-item-profile__avatar-box {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px 1px rgba(201, 201, 201, 0.7);
}

.crm-person-item-profile__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.crm-person-item-profile__info {
  margin-left: 100px;
}

.crm-person-item-profile__info-item {
  width: 250px;
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
  font-size: 17px;
  line-height: 115%;
  text-align: right;
  box-shadow: 0 0 5px 1px rgba(201, 201, 201, 0.7);
  &:not(:first-child) {
    margin-top: 15px;
  }
}
</style>
