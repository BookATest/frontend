<template>
  <router-link
    v-if="to"
    :to="to"
    class="btn"
    :class="classes"
    role="button"
    :tag="tag"
  >
    <slot />
  </router-link>

  <button
    v-else
    class="btn"
    :class="classes"
    role="button"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    to: {
      required: false,
    },
    primary: {
      type: Boolean,
    },
    secondary: {
      type: Boolean,
    },
    location: {
      type: Boolean,
    },
    back: {
      type: Boolean,
    },
    tag: {
      default: 'a'
    },
  },

  computed: {
    classes() {
      return {
        'btn--primary': this.primary,
        'btn--secondary': this.secondary,
        'btn--location': this.location,
        'btn--back': this.back,
      };
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
