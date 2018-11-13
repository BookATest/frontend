<template>
<div>
  <bat-text-header>
    <bat-text-header-title v-text="settings.language['list-bookings']['token-expired'].title" />
      <bat-text-header-description
        small
        v-if="settings.language['list-bookings']['token-expired'].content"
        v-text="settings.language['list-bookings']['token-expired'].content"
      />
  </bat-text-header>

  <bat-content>
    <bat-alert icon>
      <p class="sm-copy">
        Your session has expired. If you still need access to your appointments
        then please start again.
      </p>
    </bat-alert>

    <div class="inline-buttons">
      <bat-button @click="onBackHome" primary>Go back home</bat-button>
    </div>
  </bat-content>
</div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Alert from '@/components/Alert';
import ServiceUser from '@/utilities/ServiceUser';
import Token from '@/utilities/Token';

export default {
  name: 'TokenExpired',

  components: {
    BatAlert: Alert,
  },

  data() {
    return {
      serviceUserCache: new ServiceUser(),
      tokenCache: new Token(),
      settings: new Settings().load(),
    };
  },

  methods: {
    onBackHome() {
      this.serviceUserCache.clear();
      this.tokenCache.clear();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
