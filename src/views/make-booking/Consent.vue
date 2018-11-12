<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="4" />
      <bat-text-header-title v-text="settings.language['make-booking'].consent.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].consent.content"
        v-text="settings.language['make-booking'].consent.content"
      />
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
import Settings from '@/utilities/Settings';
import Alert from '@/components/Alert';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';
import Location from '@/utilities/Location';
import User from '@/utilities/User';
import Answers from '@/utilities/Answers';

export default {
  name: 'Notification',

  components: {
    BatAlert: Alert,
  },

  data() {
    return {
      appointmentCache: new Appointment(),
      clinicCache: new Clinic(),
      userDetailsCache: new UserDetails(),
      locationCache: new Location(),
      userCache: new User(),
      answersCache: new Answers(),
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
      this.appointmentCache.clear();
      this.clinicCache.clear();
      this.userDetailsCache.clear();
      this.locationCache.clear();
      this.userCache.clear();
      this.answersCache.clear();
      this.$router.push({ name: 'home' });
    },

    onBack() {
      this.$router.push({ name: 'make-booking.user-details' });
    },
  },
};
</script>
