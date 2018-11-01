<template>
  <div class="text-header" :class="classes">
      <div class="text-header__content">
        <slot />
      </div>
  </div>
</template>

<script>
export default {
  name: 'TextHeader',

  props: {
    white: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'text-header--white': this.white,
      };
    },
  },
};
</script>
