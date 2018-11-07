<template>
  <div class="toggle-button">

    <input
      @change="onChange"
      type="radio"
      :id="inputValue"
      class="input input--radio"
      name="input_radio"
      :value="inputValue"
      :checked="value === inputValue"
    >

    <label :for="inputValue">
      <slot />
    </label>

  </div>
</template>


<script>
export default {
  name: 'ToggleButtonInput',

  props: {
    value: {
      required: true,
    },

    inputValue: {
      required: true,
    },
  },

  methods: {
    onChange($event) {
      this.$emit('input', $event.target.value);
    },
  },
};
</script>
