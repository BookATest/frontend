<template>
  <div>

    <label for="time">Select time</label>

    <bat-loader v-if="loading" />
    <div v-else class="time">
      <bat-time-row :value="value" @input="onInput" :appointments="morningAppointments">Morning</bat-time-row>
      <bat-time-row :value="value" @input="onInput" :appointments="afternoonAppointments">Afternoon</bat-time-row>
      <bat-time-row :value="value" @input="onInput" :appointments="eveningAppointments">Evening</bat-time-row>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import Clinic from '@/utilities/Clinic';
import TimeRow from '@/components/TimeRow';

export default {
  name: 'TimeInput',

  components: {
    BatTimeRow: TimeRow,
  },

  props: {
    value: {
      required: true,
    },

    date: {
      required: true,
    },
  },

  data() {
    return {
      clinic: new Clinic(),
      appointments: [],
      loading: false,
    };
  },

  computed: {
    /**
     * Appointments from 12am up to 12pm.
     */
    morningAppointments() {
      return this.appointments.filter((appointment) => {
        const startAt = moment(appointment.start_at, moment.ISO_8601);
        const startHour = startAt.hour() + 1;

        return startHour < 12;
      });
    },

    /**
     * Appointments from 12pm up to 6pm.
     */
    afternoonAppointments() {
      return this.appointments.filter((appointment) => {
        const startAt = moment(appointment.start_at, moment.ISO_8601);
        const startHour = startAt.hour() + 1;

        return startHour >= 12 && startHour < 18;
      });
    },

    /**
     * Appointments from 6pm up to 12am.
     */
    eveningAppointments() {
      return this.appointments.filter((appointment) => {
        const startAt = moment(appointment.start_at, moment.ISO_8601);
        const startHour = startAt.hour() + 1;

        return startHour >= 18;
      });
    },
  },

  watch: {
    date(newDate) {
      this.fetchAppointments();
    },
  },

  methods: {
    async fetchAppointments() {
      this.loading = true;

      const earliestTime = moment(this.date, moment.HTML5_FMT.DATE)
        .add(this.clinic.get.appointment_booking_threshold, 'minutes');

      const response = await this.http.get('/v1/appointments', {
        params: {
          'filter[clinic_id]': this.clinic.get.id,
          'filter[available]': true,
          'filter[starts_after]': earliestTime.format('Y-MM-DD\\THH:mm:ss+00:00'),
          'filter[starts_before]': moment(this.date, moment.HTML5_FMT.DATE).format('Y-MM-DD\\T23:59:59+00:00'),
          'sort': 'start_at',
        },
      });
      this.appointments = response.data.data;

      this.loading = false;
    },

    onInput(appointment)  {
      this.$emit('input', appointment);
    },
  },

  created() {
    this.fetchAppointments();
  },
};
</script>

