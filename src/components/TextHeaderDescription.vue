<template>
  <p class="text-header__description" :class="{ 'sm-copy': small }">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'TextHeaderDescription',

  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
