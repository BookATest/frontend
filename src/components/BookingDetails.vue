<template>
  <div class="card card--booking">

    <h3 class="card__title">{{ date }}</h3>

    <h4 class="card_title">{{ time }} {{ meridiem }}</h4>

    <div class="card__details">

      <div class="card__details__item">
        <span>where</span>
        <span>{{ clinic.name }}</span>
      </div>

      <div class="card__details__item">
        <span>name</span>
        <span>{{ userDetails.name }}</span>
      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'BookingOverview',

  props: {
    appointment: {
      required: true,
    },

    clinic: {
      required: true,
    },

    userDetails: {
      required: true,
    },
  },

  computed: {
    date() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('dddd Do MMMM');
    },

    time() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('h:mm');
    },

    meridiem() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('a');
    },
  },
};
</script>
