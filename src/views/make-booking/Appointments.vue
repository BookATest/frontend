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
          <bat-time-input v-model="time" />
        </bat-field>
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
  },

  created() {
    this.loadClinic();
    this.fetchAppointments();
  },
};
</script>
