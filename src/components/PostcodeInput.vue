<template>
  <div>
    <input
      :value="value"
      @input="onInput"
      ref="input"
      type="text"
      class="input input--text input--search"
      placeholder="Post code"
    >
    <button type="button" @click="onClick">
      <i class="icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PostcodeInput',

  props: {
    value: {
      required: true,
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
