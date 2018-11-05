<template>
  <div class="text-header__progress">
    <span class="text-header__progress__icon" :class="{ active: active === 1 }">
      <i class="icon-location"></i>
    </span>
    <span class="text-header__progress__icon" :class="{ active: active === 2 }">
      <i class="icon-time"></i>
    </span>
    <span class="text-header__progress__icon" :class="{ active: active === 3 }">
      <i class="icon-user"></i>
    </span>
    <span class="text-header__progress__icon" :class="{ active: active === 4 }">
      <i class="icon-notification"></i>
    </span>
    <span class="text-header__progress__icon" :class="{ active: active === 5 }">
      <i class="icon-complete"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextHeaderProgress',

  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
};
</script>
