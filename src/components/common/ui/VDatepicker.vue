<template>
  <Datepicker
    :lang="lang"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'VDatepicker',
  components: {
    Datepicker,
  },
  props: {
    lang: {
      type: Object,
      default: () => ({
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      }),
    },
    value: {
      type: [Number, Date],
    },
  },

  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
@import 'vue2-datepicker/index.css';

.mx-datepicker {
  width: 100% !important;
}

::v-deep .mx-input {
  border-radius: 4px;
  padding: 7px 6px 6px 13px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid $borderColor !important;
  box-shadow: unset;
  height: auto !important;
  background-color: #fff;
}
</style>
