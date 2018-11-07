<template>
  <i :class="classes"></i>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    location: {
      type: Boolean,
    },
    time: {
      type: Boolean,
    },
    user: {
      type: Boolean,
    },
    notification: {
      type: Boolean,
    },
    complete: {
      type: Boolean,
    },
    locationArrow: {
      type: Boolean,
    },
    arrowUp: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'icon-location': this.location,
        'icon-time': this.time,
        'icon-user': this.user,
        'icon-notification': this.notification,
        'icon-complete': this.complete,
        'icon-location-arrow': this.locationArrow,
        'icon-arrow-up': this.arrowUp,
      };
    }
  },
};
</script>
