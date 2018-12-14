<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="4" />
      <bat-text-header-title v-text="settings.language['make-booking'].consent.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].consent.content"
        v-html="toHtml(settings.language['make-booking'].consent.content)"
      />
    </bat-text-header>

    <bat-content>

      <bat-alert>
        <p class="sm-copy">
          We'll send you a confirmation <strong>{{ confirmationMethod }}</strong> immediatley when you confirm your appointment. You'll also receive a reminder <strong>{{ confirmationMethod }}</strong> the day before your appointment.
        </p>
      </bat-alert>

      <div class="inline-buttons">
        <bat-button @click="onYes" primary>I agree</bat-button>
        <bat-button @click="onNo" secondary>I do not agree</bat-button>
      </div>

      <bat-content-footer>
          <bat-button @click="onBack" back>Back</bat-button>
        </bat-content-footer>

    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Alert from '@/components/Alert';
import UserDetails from '@/utilities/UserDetails';
import User from '@/utilities/User';

export default {
  name: 'Consent',

  components: {
    BatAlert: Alert,
  },

  data() {
    return {
      userDetailsCache: new UserDetails(),
      settings: new Settings().load(),
    };
  },

  computed: {
    confirmationMethod() {
      switch (this.userDetailsCache.get.preferred_contact_method) {
        case 'phone':
          return 'SMS message';
        case 'email':
          return 'email';
        case 'both':
          return 'SMS message and email';
      }
    },
  },

  methods: {
    onYes() {
      this.$router.push({ name: 'make-booking.overview' });
    },

    onNo() {
      this.$router.push({ name: 'make-booking.no-consent' });
    },

    onBack() {
      this.$router.push({ name: 'make-booking.user-details' });
    },
  },
};
</script>
