<template>
  <div class="v-table">
    <div class="v-table__header">
      <div
        v-for="headerItem in headerData"
        :key="headerItem.id"
        :class="['v-table__cell', `v-table__cell_${ headerItem.alias }`]"
      >
        <span v-if="headerItem.type === 'string'" class="v-table__header-text">
          {{ headerItem.value }}
        </span>
      </div>
    </div>

    <div v-if="bodyData.length" class="v-table__body">
      <!--Данный блок служит оболочкой для рядов, что бы использовать position: absolute для кнопок редактирования и удаления-->
      <div
        v-for="personItem in bodyData"
        :key="personItem.id"
        class="v-table__row-container"
      >
        <div class="v-table__row">

          <div
            v-for="(cellItem, index) in personItem.data"
            :key="index"
            :class="['v-table__cell', `v-table__cell_${ cellItem.alias }`]"
          >

            <VTableAvatar
              v-if="isImage(cellItem)"
              :imageLink="cellItem.imageLink"
              class="v-table__avatar"
            />

            <span v-if="cellItem.type === 'string'" class="v-table__person-text">
              {{ cellItem.value }}
            </span>

            <router-link
              v-else-if="cellItem.type === 'linkToProfile'"
              :to="`/crm/persons/${ personItem.id }`"
              class="v-table__person-text v-table__person-text_link"
            >
              {{ cellItem.value }}
            </router-link>
          </div>
      </div>

        <ul class="v-table__actions">
          <li v-tooltip="'Редактировать'" class="v-table__action-item">
            <button @click.stop="$emit('editById', personItem.id)">
              <EditIcon class="v-table__action-icon v-table__action-icon_edit" />
            </button>
          </li>

          <li v-tooltip="'Удалить'" class="v-table__action-item">
            <button @click="$emit('deleteById', personItem.id)">
              <CrossIcon class="v-table__action-icon v-table__action-icon_cross" />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <p v-else class="v-table__table-is-empty">
      Табличка пуста
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import VTableAvatar from "@/components/common/ui/VTable/VTableAvatar";
import CrossIcon from '@/assets/icons/common/cross.svg';
import EditIcon from '@/assets/icons/common/edit.svg';

export default {
  name: 'VTable',
  components: {
    VTableAvatar,
    CrossIcon,
    EditIcon,
  },

  props: {
    headerData: {
      type: Array,
      default: () => ([]),
    },
    bodyData: {
      type: Array,
      default: () => ([]),
    },
  },

  methods: {
    ...mapActions('CRMPersons', [
      'deletePerson'
    ]),
    isImage(data) {
      return data.type === 'image'
    },
  },
}
</script>

<style lang="scss" scoped>
.v-table {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px 15px;
}

.v-table__header {
  padding: 10px 100px 10px 0;
  border-bottom: 1px solid $light-gray-color;
  display: table;
  width: 100%;
  table-layout: fixed;
}

.v-table__body {
  overflow: auto;
  max-height: 650px;
  padding: 0 15px 0 0;
}

.v-table__row-container {
  position: relative;
  max-width: 100%;
  padding: 0 85px 0 0;
  overflow: hidden;
}

.v-table__row {
  display: table;
  padding: 10px 0;
  margin: 10px 0;
  width: 100%;
  table-layout: fixed;
}

.v-table__cell {
  display: table-cell;
  vertical-align: middle;

  &:not(:first-child) {
    padding: 0 15px;
    border-left: 1px solid $light-gray-color;
  }

  &:last-child {
  }
}

.v-table__header-text {
  font-size: 14px;
  line-height: 115%;
  color: #2c2c2c;
}

.v-table__person-text {
  font-weight: 500;
  font-size: 15px;
  line-height: 115%;
  color: #444444;
  transition: .2s cubic-bezier(0.6, 0.1, 0.15, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &_link {
    color: #000072;

    &:hover {
      color: #790000;
    }
  }
}

.v-table__avatar {
  width: 45px;
  height: 45px;
}


.v-table__actions {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 0;
  top: 50%;
  padding: 0 5px;
  transform: translate(110%, -50%);
  transition: .3s cubic-bezier(0.6, 0.1, 0.15, 0.8);

  @media (max-width: 1200px) {
    transform: translate(0, -50%);
  }
}

.v-table__row-container:hover .v-table__actions {
  transform: translate(0, -50%);
}

.v-table__action-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 7px;
  width: 26px;
  min-width: 26px;
  height: 26px;
  background-color: #fff;
  box-shadow: 0 0 3px -1px #6b6b6b;
  transition: .2s cubic-bezier(0.6, 0.1, 0.15, 0.8);
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:hover {
    box-shadow: 0 0 3px -1px #4b4b4b;
    transform: translate(0, -5px);
  }

  &:active {
    transform: translate(0, -5px) scale(0.97);
    background-color: #f6f6f6;
  }
}

.v-table__table-is-empty {
  margin: 20px 0;
  text-align: center;
  color: #a4a4a4;
}

::v-deep .v-table__action-icon {
  width: 14px;
  min-width: 14px;
  height: 14px;
}

::v-deep .v-table__action-icon_edit {
  path {
    fill: blue;
  }
}

::v-deep .v-table__action-icon_cross {
  path {
    fill: red;
  }
}
</style>
