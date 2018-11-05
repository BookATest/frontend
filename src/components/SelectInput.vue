<template>
  <select @change="onChange" class="select">
    <option :value="null" disabled :selected="value === null">-</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      v-text="option.text"
      :disabled="option.disabled || false"
      :selected="option.selected || false"
    />
  </select>
</template>

<script>
export default {
  name: 'SelectInput',

  props: {
    value: {
      required: true,
    },

    options: {
      required: true,
      type: Array,
      validate: prop => {
        for (const item in prop) {
          if (typeof(item) !== 'object') {
            return false;
          }

          if (!item.hasOwnProperty('value')) {
            return false;
          }

          if (!item.hasOwnProperty('text')) {
            return false;
          }

          if (item.hasOwnProperty('disabled') && typeof(item) !== 'boolean') {
            return false;
          }

          if (item.hasOwnProperty('selected') && typeof(item) !== 'boolean') {
            return false;
          }
        }

        return true;
      },
    },
  },

  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
