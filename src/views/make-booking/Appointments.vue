<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="2" />
      <bat-text-header-title v-text="settings.language['make-booking'].appointments.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].appointments.content"
        v-text="settings.language['make-booking'].appointments.content"
      />
    </bat-text-header>

    <bat-content>
      <bat-loader v-if="loading" />

      <div v-else class="form">
        <bat-date-picker-input v-model="date" />

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
import Settings from '@/utilities/Settings';

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
      loading: false,
      date: moment().format(moment.HTML5_FMT.DATE),
      appointment: null,
      settings: new Settings().load(),
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

    onNext() {
      // Do nothing if an appointment has not been selected.
      if (!this.appointmentSelected) {
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
  },
};
</script>
