<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>Booked appointments</bat-text-header-title>
    </bat-text-header>

    <bat-loader v-if="loading" />

    <bat-content v-else>

      <div v-for="(appointment, index) in appointments" :key="appointment.id" class="appointments__item">
        <button
          @click="onToggleAppointment(appointment)"
          href="#"
          class="title-strip__trigger dropdown-trigger dropdown-trigger--block"
          :class="{ active: appointment.expanded }"
          role="button"
        >
          {{ date(appointment) }} at {{ time(appointment) }} {{ meridiem(appointment) }} with {{ appointment.clinic.name }}
        </button>

        <div v-show="appointment.expanded">
          <bat-booking-details
            :appointment="appointment"
            :clinic="appointment.clinic"
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

          <bat-card inactive :title="appointment.clinic.name">
            <p>
              {{ appointment.clinic.address_line_1 }}<br>
              <template v-if="appointment.clinic.address_line_2">
                {{ appointment.clinic.address_line_2 }}<br>
              </template>
              <template v-if="appointment.clinic.address_line_3">
                {{ appointment.clinic.address_line_3 }}<br>
              </template>
              {{ appointment.clinic.city }}<br>
              {{ appointment.clinic.postcode }}
            </p>
          </bat-card>

          <div v-show="showDirections" class="text-container active">
            <p class="sm-copy">{{ appointment.clinic.directions }}</p>
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

          <hr>

          <bat-button @click="onCancel" secondary>Cancel</bat-button>

          <bat-disclaimer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</bat-disclaimer>
        </div>

        <hr v-if="(index + 1) < appointments.length">
      </div>

      <div v-if="appointments.length === 0">
        <div class="card card--alert card--alert--icon">
          <div class="card__icon">
            <bat-icon alert />
          </div>
          <div class="card__message">
            <p class="sm-copy">No booked appointments</p>
          </div>
        </div>

        <hr>

        <bat-button @click="onBackHome" secondary>Go back home</bat-button>
      </div>

    </bat-content>

  </div>
</template>

<script>
import moment from 'moment';
import Card from '@/components/Card';
import BookingDetails from '@/components/BookingDetails';
import Disclaimer from '@/components/Disclaimer';
import ServiceUser from '@/utilities/ServiceUser';
import Token from '@/utilities/Token';

export default {
  name: 'Appointments',

  components: {
    BatCard: Card,
    BatBookingDetails: BookingDetails,
    BatDisclaimer: Disclaimer,
  },

  data() {
    return {
      serviceUserCache: new ServiceUser(),
      tokenCache: new Token(),
      showDirections: false,
      appointments: [],
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

    date(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('dddd Do MMMM');
    },

    async fetchAppointment() {
      this.loading = true;

      // Fetch the appointments.
      let appointments = await this.fetchAll(`/v1/service-users/${this.serviceUserCache.get.id}/appointments`, {
        service_user_token: this.tokenCache.get,
        append: 'user_first_name,user_last_name,user_email,user_phone',
      });

      // Append an expanded property.
      appointments.forEach(appointment => appointment.expanded = false);
      appointments[0].expanded = true;

      // Append the clinincs.
      appointments = await this.appendClinics(appointments);

      // Store it in the component data.
      this.appointments = appointments;

      this.loading = false;
    },

    async appendClinics(appointments) {
      // Fetch all the clinics.
      const clinics = await this.fetchAll('/v1/clinics', {
        'filter[id]': appointments.map(appointment => appointment.clinic_id).join(','),
      });

      // Append the clinic to the appointment.
      appointments.forEach(appointment => {
        const clinic = clinics.find(clinic => clinic.id === appointment.clinic_id);
        appointment.clinic = clinic;
      });

      return appointments;
    },

    onCancel() {
      this.$router.push({
        name: 'list-bookings.cancel',
        params: {
          appointment: this.appointment.id,
        },
      });
    },

    onBackHome() {
      this.serviceUserCache.clear();
      this.tokenCache.clear();
      this.$router.push({ name: 'home' });
    },

    onToggleAppointment(appointment) {
      appointment.expanded = !appointment.expanded;
    },
  },

  created() {
    this.fetchAppointment();
  },
};
</script>

<style lang="scss">
.appointments__item {
  margin-bottom: 2rem;
}
</style>
