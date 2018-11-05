<template>
  <div class="text-header__progress">

    <span class="text-header__progress__icon" :class="{ active: active === 1 }">
      <bat-icon location />
    </span>

    <span class="text-header__progress__icon" :class="{ active: active === 2 }">
      <bat-icon time />
    </span>

    <span class="text-header__progress__icon" :class="{ active: active === 3 }">
      <bat-icon user />
    </span>

    <span class="text-header__progress__icon" :class="{ active: active === 4 }">
      <bat-icon notification />
    </span>

    <span class="text-header__progress__icon" :class="{ active: active === 5 }">
      <bat-icon complete />
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
