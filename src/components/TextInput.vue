<template>
  <input
    :value="value"
    @input="onInput"
    @keypress="onKeypress"
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

    onKeypress(event) {
      this.$emit('keypress', event.key);
    },
  },
};
</script>
