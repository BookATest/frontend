<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>Cancel</bat-text-header-title>
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
    };
  },

  methods: {
    async onCancel() {
      this.cancelling = true;

      const response = await this.http.put(`/v1/appointments/${this.$route.params.appointment}/cancel`, {
        service_user_token: this.tokenCache.get,
      });
      this.$router.push({ name: 'list-bookings.cancelled' });

      this.cancelling = false;
    },

    onBack() {
      this.$router.push({ name: 'list-bookings.appointments' });
    },
  },
};
</script>
