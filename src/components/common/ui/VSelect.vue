append-to-body
:calculate-position="withPopper"

<template>
  <VueSelect
    :value="value"
    :options="options"
    :reduce="reduce"
    :getOptionLabel="getOptionLabel"
    append-to-body
    :calculate-position="withPopper"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { createPopper } from '@popperjs/core'
import VueSelect from 'vue-select';

export default {
  name: 'VSelect',
  components: {
    VueSelect,
  },

  props: {
    value: {
      type: [Number, String],
    },
    options: {
      type: Array,
      default: () => ([]),
    },
    reduce: {
      type: Function,
      default: (item) => item.id,
    },
    getOptionLabel: {
      type: Function,
      default: (item) => item.title,
    },
  },
  data: () => ({
    placement: 'bottom',
  }),

  methods: {
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            },
          },
        ],
      })

      return () => popper.destroy();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
