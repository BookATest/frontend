<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="4" />
      <bat-text-header-title v-text="settings.language['make-booking']['no-consent'].title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking']['no-consent'].content"
        v-html="toHtml(settings.language['make-booking']['no-consent'].content)"
      />
    </bat-text-header>

    <bat-content>

      <div class="inline-buttons">
        <bat-button @click="onCancel" primary>Cancel booking</bat-button>
      </div>

      <bat-content-footer>
        <bat-button @click="onBack" back>Back</bat-button>
      </bat-content-footer>

    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';
import Location from '@/utilities/Location';
import User from '@/utilities/User';
import Answers from '@/utilities/Answers';

export default {
  name: 'NoConsent',

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

  methods: {
    onCancel() {
      this.appointmentCache.clear();
      this.clinicCache.clear();
      this.userDetailsCache.clear();
      this.locationCache.clear();
      this.userCache.clear();
      this.answersCache.clear();
      this.$router.push({ name: 'home' });
    },

    onBack() {
      this.$router.push({ name: 'make-booking.consent' });
    },
  },
};
</script>
