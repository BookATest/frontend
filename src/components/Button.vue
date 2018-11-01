<template>
  <router-link
    v-if="to"
    :to="to"
    class="btn"
    :class="classes"
    role="button"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'Button',

  props: {
    to: {
      required: true,
    },
    primary: {
      type: Boolean,
    },
    secondary: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'btn--primary': this.primary,
        'btn--secondary': this.secondary,
      };
    }
  },
};
</script>
