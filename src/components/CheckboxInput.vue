<template>
  <input
    :checked="value"
    @change="onChange"
    type="checkbox"
    class="input input--checkbox"
  >
</template>

<script>
export default {
  name: 'CheckboxInput',

  props: {
    value: {
      required: true,
    },
  },

  methods: {
    onChange(event) {
      this.$emit('input', event.target.checked);
    },
  },
};
</script>
