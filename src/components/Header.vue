<template>
  <header class="header mobile-show" :class="headerClass">
    <div class="header__brand">
      <a href="/">
        <img src="/assets/dist/img/brand-logo.png" alt="Brand Logo">
      </a>
    </div>

    <div class="header__powered text-center">
      <h5 class="header__powered__title">Powered by</h5>
      <img src="/assets/dist/img/logo--alt.svg" alt="BookATest.hiv">
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    hide: {
      required: false,
      type: Boolean,
    },
  },

  computed: {
    headerClass() {
      return {
        hide: this.hide,
      };
    },
  },
};
</script>
