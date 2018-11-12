<template>
  <bat-loader v-if="settings === null" />
  <div v-else>
    <bat-text-header white>
      <bat-text-header-image :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Name" />
      <bat-text-header-title v-text="settings.language.home.title" />
      <bat-text-header-description
        small
        v-if="settings.language.home.content"
        v-text="settings.language.home.content"
      />
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'make-booking.introduction' }" primary>Book a test</bat-button>
      <bat-button :to="{ name: 'list-bookings.access-code' }" secondary>My appointments</bat-button>
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
    Settings.create().then(settings => this.settings = settings.load());
  },
};
</script>
