<template>
  <input
    :value="value"
    @input="onInput"
    @keyup="onKeyup"
    :type="type"
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

    type: {
      required: false,
      default: 'text',
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onKeyup(event) {
      this.$emit('keyup', event.key);
    },
  },
};
</script>
