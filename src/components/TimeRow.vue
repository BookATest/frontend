<template>
  <div class="time__row">

    <span class="time__row__label">
      <slot />
    </span>

    <div class="time__row__items">

      <div v-for="appointment in appointments" :key="appointment.id" class="time__row__items__item">

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
