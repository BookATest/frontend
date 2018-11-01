<template>
  <bat-loader v-if="settings === null" />
  <div v-else>
    <bat-text-header white>
      <img :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Name" class="text-header__image">
      <h1 class="text-header__title">Welcome to {{ settings.name }}</h1>
      <p class="text-header__description sm-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</p>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'introduction' }" primary>Book a test</bat-button>
      <bat-button to="/templates/pages/appointment/index.php" secondary>My appointments</bat-button>
    </bat-content>
  </div>
</template>

<script>
import Settings from '@/utilities/Settings';

export default {
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
