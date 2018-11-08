<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="4" />
      <bat-text-header-title>Notification</bat-text-header-title>
    </bat-text-header>

    <bat-content>

      <bat-alert>
        <p class="sm-copy">
          We'll send you a confirmation <strong>{{ confirmationMethod }}</strong> along with a
          reminder <strong>12 hours</strong> before your appointment
        </p>
      </bat-alert>

      <div class="title-strip text-center">
        <h3>Is this ok?</h3>
      </div>

      <div class="inline-buttons">
        <bat-button @click="onYes" primary>Yes</bat-button>
        <bat-button @click="onNo" secondary>No</bat-button>
      </div>

      <bat-content-footer>
          <bat-button @click="onBack" back>Back</bat-button>
        </bat-content-footer>

    </bat-content>

  </div>
</template>

<script>
import Alert from '@/components/Alert';
import UserDetails from '@/utilities/UserDetails';

export default {
  name: 'Notification',

  components: {
    BatAlert: Alert,
  },

  data() {
    return {
      userDeailsCache: new UserDetails(),
    };
  },

  computed: {
    confirmationMethod() {
      switch (this.userDeailsCache.get.preferred_contact_method) {
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
      this.$router.push({ name: 'overview' });
    },

    onNo() {
      // TODO
    },

    onBack() {
      this.$router.push({ name: 'user-details' });
    },
  },
};
</script>
