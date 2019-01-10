<template>
  <div>

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
        const startHour = startAt.hour();

        return startHour < 12;
      });
    },

    /**
     * Appointments from 12pm up to 6pm.
     */
    afternoonAppointments() {
      return this.appointments.filter((appointment) => {
        const startAt = moment(appointment.start_at, moment.ISO_8601);
        const startHour = startAt.hour();

        return startHour >= 12 && startHour < 18;
      });
    },

    /**
     * Appointments from 6pm up to 12am.
     */
    eveningAppointments() {
      return this.appointments.filter((appointment) => {
        const startAt = moment(appointment.start_at, moment.ISO_8601);
        const startHour = startAt.hour();

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

      // This is an extra threshold added to prevent bookings just passed the threshold.
      const extraBookingThreshold = 10;
      const totalBookingThreshold = extraBookingThreshold + this.clinic.get.appointment_booking_threshold;

      const dateIsToday = moment(this.date, moment.HTML5_FMT.DATE)
        .isSame(moment().startOf('day'));

      const earliestTime = dateIsToday
        ? moment().utc().add(totalBookingThreshold, 'minutes')
        : moment(this.date, moment.HTML5_FMT.DATE);

      const endOfDay = moment(this.date, moment.HTML5_FMT.DATE).endOf('day');

      const response = await this.http.get('/v1/appointments', {
        params: {
          'filter[clinic_id]': this.clinic.get.id,
          'filter[available]': true,
          'filter[starts_after]': earliestTime.format('YYYY-MM-DD[T]HH:mm:ssZ'),
          'filter[starts_before]': endOfDay.format('YYYY-MM-DD[T]HH:mm:ssZ'),
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

