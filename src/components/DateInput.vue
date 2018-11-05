<template>
  <input
    :value="value"
    @input="onInput"
    type="date"
    class="input input--date"
    placeholder="DD/MM/YYYY"
  >
</template>

<script>
export default {
  name: 'DateInput',

  props: {
    value: {
      required: true,
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
