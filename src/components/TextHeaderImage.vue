<template>
  <img :src="src" :alt="alt" class="text-header__image">
</template>

<script>
export default {
  name: 'TextHeaderImage',

  props: {
    src: {
      required: true,
      type: String,
    },

    alt: {
      required: true,
      type: String,
    },
  },
};
</script>
