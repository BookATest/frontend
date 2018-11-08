<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>Appointment booked</bat-text-header-title>
    </bat-text-header>

    <bat-content>
      <bat-booking-details
        :appointment="appointment"
        :clinic="clinic"
        :user-details="userDetails"
      />

      <hr>

      <div class="title-strip title-strip--has-trigger">
        <h4 class="title-strip__text">Location</h4>
        <button
          @click="showDirections = !showDirections"
          href="#"
          class="title-strip__trigger dropdown-trigger"
          :class="{ active: showDirections }"
          role="button"
        >
          Directions
        </button>
      </div>

      <bat-card inactive :title="clinic.name">
          <p>
            {{ clinic.address_line_1 }}<br>
            <template v-if="clinic.address_line_2">
              {{ clinic.address_line_2 }}<br>
            </template>
            <template v-if="clinic.address_line_3">
              {{ clinic.address_line_3 }}<br>
            </template>
            {{ clinic.city }}<br>
            {{ clinic.postcode }}
          </p>

          <span slot="meta">{{ toMiles(clinic.distance) }} miles</span>
        </bat-card>

        <div v-show="showDirections" class="text-container active">
          <p class="sm-copy">{{ clinic.directions }}</p>
        </div>

        <hr>

        <div class="title-strip">
          <h4>Notification</h4>
        </div>

        <div class="notification-preview">
          <div class="notification-preview__instructions">
            <p class="sm-copy">We will contact you by phone.</p>
          </div>

          <div class="notification-preview__speech-bubble speech-bubble">
            <p class="sm-copy">Pick up milk at {{ time(appointment) }}{{ meridiem(appointment) }}...</p>
          </div>
        </div>

        <div class="card card--alert card--alert--icon">
          <div class="card__icon">
            <bat-icon alert />
          </div>

          <div class="card__message">
            <p class="sm-copy">You should have received {{ notificationType }} confirmation</p>
          </div>
        </div>

    </bat-content>

  </div>
</template>

<script>
import moment from 'moment';
import BookingDetails from '@/components/BookingDetails';
import Card from '@/components/Card';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';

export default {
  name: 'Confirmation',

  components: {
    BatCard: Card,
    BatBookingDetails: BookingDetails,
  },

  data() {
    return {
      appointment: new Appointment().get,
      clinic: new Clinic().get,
      userDetails: new UserDetails().get,
      showDirections: false,
    };
  },

  computed: {
    notificationType() {
      switch (this.userDetails.preferred_contact_method) {
        case 'phone':
          return 'a text message';
        case 'email':
          return 'an email';
        case 'both':
          return 'a text message and an email';
      }
    },
  },

  methods: {
    toMiles(meters) {
      return (0.000621371 * meters).toFixed(2);
    },

    time(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('h:mm');
    },

    meridiem(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('a');
    },
  },
};
</script>
