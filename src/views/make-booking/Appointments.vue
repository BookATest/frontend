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
          <bat-time-input v-model="time" :date="date" />
        </bat-field>

        <div class="actions">
          <bat-button @click="onNext" :primary="dateTimeSelected" :disabled="!dateTimeSelected">Continue</bat-button>
        </div>
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

export default {
  name: 'Appointments',

  components: {
    BatField: Field,
    BatDatePickerInput: DatePickerInput,
    BatTimeInput: TimeInput,
  },

  data() {
    return {
      cache: new Clinic(),
      clinic: null,
      appointments: [],
      loading: false,
      date: moment().format(moment.HTML5_FMT.DATE),
      time: null,
    };
  },

  computed: {
    dateTimeSelected() {
      return this.date !== null && this.time !== null;
    },
  },

  watch: {
    date() {
      this.time = null;
    },
  },

  methods: {
    loadClinic() {
      this.clinic = this.cache.get;
    },

    async fetchAppointments() {
      this.loading = true;

      const response = await this.http.get('/v1/appointments');
      this.appointments = response.data.data;

      this.loading = false;
    },

    onNext() {
      // Do nothing if the date and time have not been selected.
      if (!this.dateTimeSelected) {
        return;
      }

      // TODO: Cache appointment time and route to next page.
      console.log('NEXT');
    },
  },

  created() {
    this.loadClinic();
    this.fetchAppointments();
  },
};
</script>
