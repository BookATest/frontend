<template>
  <bat-loader v-if="settings === null" />
  <div v-else>
    <bat-text-header white>
      <bat-text-header-image :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Name" />
      <bat-text-header-title>Welcome to {{ settings.name }}</bat-text-header-title>
      <bat-text-header-description small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'introduction' }" primary>Book a test</bat-button>
      <bat-button :to="{ name: 'access-code' }" secondary>My appointments</bat-button>
    </bat-content>
  </div>
</template>

<script>
import Settings from '@/utilities/Settings';

export default {
  name: 'Home',

  data() {
    return {
      settings: null,
    };
  },

  created() {
    Settings.create().then(settings => this.settings = settings);
  },
};
</script>
