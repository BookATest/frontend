<template>
  <div class="text-header__description" :class="{ 'sm-copy': small }">
    <slot />
  </div>
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
