<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>Appointment booked</bat-text-header-title>
    </bat-text-header>

    <bat-loader v-if="loading" />
    <bat-content v-else>
      <bat-booking-details
        :appointment="appointment"
        :clinic="clinic"
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
import Card from '@/components/Card';
import BookingDetails from '@/components/BookingDetails';
import ServiceUser from '@/utilities/ServiceUser';
import Token from '@/utilities/Token';

export default {
  name: 'Appointments',

  components: {
    BatCard: Card,
    BatBookingDetails: BookingDetails,
  },

  data() {
    return {
      serviceUserCache: new ServiceUser(),
      tokenCache: new Token(),
      showDirections: false,
      appointment: null,
      clinic: null,
      loading: false,
    };
  },

  computed: {
    notificationType() {
      switch (this.serviceUserCache.get.preferred_contact_method) {
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

    async fetchAppointment() {
      this.loading = true;

      const response = await this.http.get(`/v1/service-users/${this.serviceUserCache.get.id}/appointments`, {
        params: {
          service_user_token: this.tokenCache.get,
        },
      });
      this.appointment = response.data.data[0];
      await this.fetchClinic();

      this.loading = false;
    },

    async fetchClinic() {
      const response = await this.http.get(`/v1/clinics/${this.appointment.clinic_id}`);
      this.clinic = response.data.data;
    },
  },

  created() {
    this.fetchAppointment();
  },
};
</script>
