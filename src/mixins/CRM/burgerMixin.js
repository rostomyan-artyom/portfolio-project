import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('CRMBurger', [
      'burgerShow',
    ]),
    burgerTooltip() {
      return this.burgerShow ? 'Закрыть' : 'Раскрыть';
    },
  },

  methods: {
    ...mapActions('CRMBurger', [
      'toggleBurgerShow',
    ]),
  },
};
