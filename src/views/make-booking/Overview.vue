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
        :user-details="userDetailsCache.get"
      />

      <div class="inline-buttons">
        <bat-button @click="onAmmend" secondary>Ammend</bat-button>
        <bat-button @click="onConfirm" primary>Confirm appointment</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import BookingDetails from '@/components/BookingDetails';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';

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
    };
  },

  methods: {
    onAmmend() {
      this.$router.push({ name: 'appointments' });
    },

    onConfirm() {
      //
    },
  },
};
</script>
