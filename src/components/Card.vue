<template>
  <div @click="onClick" class="card" :class="classes">
    <h4 class="card__title" v-text="title" />

    <div class="card__content flex-col flex-col--12">
      <div class="card__description">
        <slot />
      </div>
      <div v-if="!!$slots.meta" class="card__meta">
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
    inactive: {
      type: Boolean,
    },
    clickable: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'card--primary': this.primary,
        'card--selected': this.selected,
        'card--inactive': this.inactive,
        'card--clickable': this.clickable,
      };
    },
  },

  methods: {
    onClick() {
      if (this.selected) {
        this.$emit('deselect');
      } else {
        this.$emit('select');
      }
    },
  },
};
</script>
