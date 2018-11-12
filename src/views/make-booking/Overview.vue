<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="5" />
      <bat-text-header-title>Appointment overview</bat-text-header-title>
      <bat-text-header-description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-booking-details
        :appointment="appointmentCache.get"
        :clinic="clinicCache.get"
      />

      <div class="inline-buttons">
        <bat-button @click="onAmmend" secondary>Ammend</bat-button>

        <bat-button v-if="submitting" @click="onConfirm" disabled>Confirming...</bat-button>
        <bat-button v-else @click="onConfirm" primary>Confirm appointment</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
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
    };
  },

  methods: {
    onAmmend() {
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
