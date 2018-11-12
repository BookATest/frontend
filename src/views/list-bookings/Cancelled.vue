<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>Cancelled</bat-text-header-title>
      <bat-text-header-description small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-button @click="onBackHome" primary>Back to home</bat-button>
    </bat-content>

  </div>
</template>

<script>
import Token from '@/utilities/Token';
import Alert from '@/components/Alert';

export default {
  name: 'Cancelled',

  methods: {
    onBackHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
