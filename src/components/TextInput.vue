<template>
  <input
    :value="value"
    @input="onInput"
    type="text"
    class="input input--text"
  >
</template>

<script>
export default {
  name: 'TextInput',

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
