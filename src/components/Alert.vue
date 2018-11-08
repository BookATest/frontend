<template>
  <div class="card card--alert" :class="classes">

    <div v-if="this.icon" class="card__icon">
      <bat-icon alert />
    </div>

    <div class="card__message">
      <slot />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    icon: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'card--alert--icon': this.icon,
      };
    },
  },
};
</script>
