<template>
  <bat-loader v-if="settings === null" />
  <div v-else>
    <div class="text-header text-header--white">
      <div class="text-header__content">
        <img :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Name" class="text-header__image">
        <h1 class="text-header__title">Welcome to {{ settings.name }}</h1>
        <p class="text-header__description sm-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</p>
      </div>
    </div>

    <div class="content">
      <router-link to="/templates/pages/book/index.php" class="btn btn--primary" role="button">
        Book a test
      </router-link>
      <router-link to="/templates/pages/appointment/index.php" class="btn btn--secondary" role="button">
        My appointments
      </router-link>
    </div>
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
