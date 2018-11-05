<template>
  <header class="header mobile-show" :class="headerClass">
    <div class="header__brand">
      <a href="/">
        <img :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Logo">
      </a>
    </div>

    <div class="header__powered text-center">
      <h5 class="header__powered__title">Powered by</h5>
      <img src="@/assets/img/logo.svg" alt="BookATest.hiv">
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
