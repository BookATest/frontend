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
          :value="apiValue(appointment)"
          @change="onSelect(appointment)"
          :checked="value === apiValue(appointment)"
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
    apiValue(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format(moment.HTML5_FMT.TIME_SECONDS);
    },

    time(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('h:mm');
    },

    meridiem(appointment) {
      return moment(appointment.start_at, moment.ISO_8601).format('a');
    },

    onSelect(appointment) {
      this.$emit('input', this.apiValue(appointment));
    },
  },
};
</script>
