<template>
  <label>
    <span class="number">Q{{ number }}.</span>
    <span class="question"><slot /></span>
  </label>
</template>

<script>
export default {
  name: 'Label',

  props: {
    number: {
      required: true,
      type: Number,
    },
  },
};
</script>
