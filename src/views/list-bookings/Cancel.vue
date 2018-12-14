<template>
  <div>

    <bat-text-header>
      <bat-text-header-title v-text="settings.language['list-bookings'].cancel.title" />
      <bat-text-header-description
        small
        v-if="settings.language['list-bookings'].cancel.content"
        v-html="toHtml(settings.language['list-bookings'].cancel.content)"
      />
    </bat-text-header>

    <bat-content>
      <bat-alert icon>
        <p class="sm-copy">You will forfit your appointment when you cancel.</p>
      </bat-alert>

      <div class="title-strip text-center">
        <h3 v-if="cancelling">Cancelling...</h3>
        <h3 v-else>Are you sure?</h3>
      </div>

      <div class="inline-buttons">
        <bat-button @click="onCancel" :primary="!cancelling" :disabled="cancelling">Yes</bat-button>
        <bat-button @click="onBack" :secondary="!cancelling" :disabled="cancelling">No</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Token from '@/utilities/Token';
import Alert from '@/components/Alert';

export default {
  name: 'Cancel',

  components: {
    BatAlert: Alert,
  },

  data() {
    return {
      tokenCache: new Token(),
      cancelling: false,
      settings: new Settings().load(),
    };
  },

  methods: {
    async onCancel() {
      this.cancelling = true;

      try {
        const response = await this.http.put(`/v1/appointments/${this.$route.params.appointment}/cancel`, {
          service_user_token: this.tokenCache.get,
        });
        this.$router.push({ name: 'list-bookings.cancelled' });
      } catch (exception) {
        this.$router.push({ name: 'list-bookings.token-expired' });
      }

      this.cancelling = false;
    },

    onBack() {
      this.$router.push({ name: 'list-bookings.appointments' });
    },
  },
};
</script>
