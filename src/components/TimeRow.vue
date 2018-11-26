<template>
  <div class="time__row">

    <span class="time__row__label">
      <slot />
    </span>

    <div class="time__row__items">

      <div v-for="appointment in uniqueAppointments" :key="appointment.id" class="time__row__items__item">

        <input
          type="radio"
          :id="appointment.id"
          class="input input--radio"
          :value="appointment.id"
          @change="onSelect(appointment)"
          :checked="(value ? value.id : null) === appointment.id"
        >

        <label :for="appointment.id">
          <span v-text="time(appointment)" />
          <!---->&nbsp;<!---->
          <span class="period" v-text="meridiem(appointment)" />
        </label>

      </div>

      <p v-if="appointments.length === 0">No appointments available</p>

    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TimeRow',

  props: {
    value: {
      required: true,
    },

    appointments: {
      required: true,
    },
  },

  computed: {
    uniqueAppointments() {
      const times = [];

      // For the selected appointment.
      if (this.value) {
        times.push(this.value.start_at);
      }

      return this.appointments
        .sort(() => 0.5 - Math.random()) // Randomly sort the appointments.
        .filter((appointment) => { // Filter out multiple appointments for the same time.
          // For the selected appointment.
          if (this.value && this.value.id === appointment.id) {
            return true;
          }

          // For overlapping appointments.
          if (times.includes(appointment.start_at)) {
            return false;
          }

          times.push(appointment.start_at);
          return true;
        })
        .sort((appointmentA, appointmentB) => { // Sort appointments in time order.
          if (new Date(appointmentA.start_at) > new Date(appointmentB.start_at)) {
            return 1;
          }

          if (new Date(appointmentA.start_at) < new Date(appointmentB.start_at)) {
            return -1;
          }

          return 0;
        });
    },
  },

  methods: {
    time(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('h:mm');
    },

    meridiem(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('a');
    },

    onSelect(appointment) {
      this.$emit('input', appointment);
    },
  },
};
</script>
