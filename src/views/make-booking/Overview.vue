<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="5" />
      <bat-text-header-title v-text="settings.language['make-booking'].overview.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].overview.content"
        v-html="toHtml(settings.language['make-booking'].overview.content)"
      />
    </bat-text-header>

    <bat-content>
      <bat-booking-details
        :appointment="appointmentCache.get"
        :clinic="clinicCache.get"
      />

      <div class="inline-buttons">
        <bat-button @click="onAmend" secondary>Amend</bat-button>

        <bat-button v-if="submitting" @click="onConfirm" disabled>Confirming...</bat-button>
        <bat-button v-else @click="onConfirm" primary>Confirm appointment</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import BookingDetails from '@/components/BookingDetails';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';
import Answers from '@/utilities/Answers';

export default {
  name: 'Overview',

  components: {
    BatBookingDetails: BookingDetails,
  },

  data() {
    return {
      appointmentCache: new Appointment(),
      clinicCache: new Clinic(),
      userDetailsCache: new UserDetails(),
      answersCache: new Answers(),
      submitting: false,
      settings: new Settings().load(),
    };
  },

  methods: {
    onAmend() {
      this.$router.push({ name: 'make-booking.appointments' });
    },

    async onConfirm() {
      this.submitting = true;

      // Make the booking.
      const response = await this.http.post('/v1/bookings', {
        appointment_id: this.appointmentCache.get.id,
        service_user: this.userDetailsCache.get,
        answers: this.answersCache.all,
      });

      // Store the updated appointment in the cache.
      const appointment = response.data.data;
      this.appointmentCache.cache(appointment);

      this.$router.push({ name: 'make-booking.confirmation' });
    },
  },
};
</script>
