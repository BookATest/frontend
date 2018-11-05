<template>
  <div class="card" :class="classes">
    <h4 class="card__title" v-text="title" />

    <div class="card__content flex-col flex-col--12">
      <div class="card__description">
        <slot />
      </div>
      <div class="card__meta">
        <slot name="meta" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      required: true,
      type: String,
    },
    primary: {
      type: Boolean,
    },
    selected: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'card--primary': this.primary,
        'card--selected': this.selected,
      };
    },
  },
};
</script>
