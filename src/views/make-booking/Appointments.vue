<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="2" />
      <bat-text-header-title>Date / Time</bat-text-header-title>
    </bat-text-header>

    <bat-content>
      <bat-loader v-if="loading" />

      <div v-else class="form">
        <bat-field date-picker>
          <bat-date-picker-input v-model="date" />
        </bat-field>

        <bat-field time>
          <bat-time-input v-model="appointment" :date="date" />
        </bat-field>

        <bat-content-footer>
          <bat-button @click="onNext" :primary="appointmentSelected" :disabled="!appointmentSelected">Continue</bat-button>
          <bat-button @click="onBack" back>Back</bat-button>
        </bat-content-footer>
      </div>
    </bat-content>
  </div>
</template>

<script>
import moment from "moment";

import Field from "@/components/Field";
import DatePickerInput from "@/components/DatePickerInput";
import TimeInput from "@/components/TimeInput";

import Clinic from "@/utilities/Clinic";
import Appointment from "@/utilities/Appointment";

export default {
  name: 'Appointments',

  components: {
    BatField: Field,
    BatDatePickerInput: DatePickerInput,
    BatTimeInput: TimeInput,
  },

  data() {
    return {
      clinicCache: new Clinic(),
      appointmentCache: new Appointment(),
      clinic: null,
      appointments: [],
      loading: false,
      date: moment().format(moment.HTML5_FMT.DATE),
      appointment: null,
    };
  },

  computed: {
    appointmentSelected() {
      return this.appointment !== null;
    },
  },

  watch: {
    date() {
      this.time = null;
    },
  },

  methods: {
    loadClinic() {
      this.clinic = this.clinicCache.get;
    },

    async fetchAppointments() {
      this.loading = true;

      const response = await this.http.get('/v1/appointments');
      this.appointments = response.data.data;

      // Set the selected appointment if cached.
      const appointment = this.appointmentCache.get;
      if (appointment) {
        this.date = moment(appointment.start_at, moment.ISO_8601).format(moment.HTML5_FMT.DATE);
        this.appointment = appointment;
      }

      this.loading = false;
    },

    onNext() {
      // Do nothing if an appointment has not been selected.
      if (this.appointment === null) {
        return;
      }

      // Cache appointment time and route to next page.
      this.appointmentCache.cache(this.appointment);
      this.$router.push({ name: 'make-booking.user-details' });
    },

    onBack() {
      this.appointmentCache.clear();
      this.$router.push({ name: 'make-booking.clinics' });
    },
  },

  created() {
    this.loadClinic();
    this.fetchAppointments();
  },
};
</script>
