<template>
  <div class="field" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Field',

  props: {
    inline: {
      type: Boolean
    },
    select: {
      type: Boolean
    },
    date: {
      type: Boolean
    },
    text: {
      type: Boolean
    },
    checkbox: {
      type: Boolean
    },
    search: {
      type: Boolean
    },
    datePicker: {
      type: Boolean
    },
    time: {
      type: Boolean
    },
    radio: {
      type: Boolean
    },
    textLabelTop: {
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return {
        'field--inline': this.inline,
        'field--select': this.select,
        'field--date': this.date,
        'field--text': this.text,
        'field--text--label-top': this.textLabelTop,
        'field--checkbox': this.checkbox,
        'field--search': this.search,
        'field--date-picker': this.datePicker,
        'field--time': this.time,
        'field--radio': this.radio,
      };
    },
  },
};
</script>
