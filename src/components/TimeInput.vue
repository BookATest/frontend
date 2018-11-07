<template>
  <div>

    <label for="time">Select time</label>

    <bat-loader v-if="loading" />

    <div v-else class="time">
      <div class="time__row">
        <span class="time__row__label">Morning</span>
        <div class="time__row__items">
          <div class="time__row__items__item">
            <input type="radio" id="morning1" class="input input--radio" name="input_radio"/>
            <label for="morning1">9:00 <span class="period">am</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="morning2" class="input input--radio" name="input_radio"/>
            <label for="morning2">9:30 <span class="period">am</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="morning3" class="input input--radio" name="input_radio"/>
            <label for="morning3">10:00 <span class="period">am</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="morning4" class="input input--radio" name="input_radio"/>
            <label for="morning4">10:30 <span class="period">am</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="morning5" class="input input--radio" name="input_radio"/>
            <label for="morning5">11:00 <span class="period">am</span></label>
          </div>
        </div>
      </div>
      <div class="time__row">
        <span class="time__row__label">Afternoon</span>
        <div class="time__row__items">
          <div class="time__row__items__item">
            <input type="radio" id="afternoon1" class="input input--radio" name="input_radio"/>
            <label for="afternoon1">1:00 <span class="period">pm</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="afternoon2" class="input input--radio" name="input_radio"/>
            <label for="afternoon2">2:00 <span class="period">pm</span></label>
          </div>
          <div class="time__row__items__item">
            <input type="radio" id="afternoon3" class="input input--radio" name="input_radio"/>
            <label for="afternoon3">2:30 <span class="period">pm</span></label>
          </div>
        </div>
      </div>
      <div class="time__row">
        <span class="time__row__label">Evening</span>
        <div class="time__row__items">
          <div class="time__row__items__item">
            <input type="radio" id="evening1" class="input input--radio" name="input_radio"/>
            <label for="evening1">6:00 <span class="period">pm</span></label>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import Clinic from '@/utilities/Clinic';

export default {
  name: 'TimePicker',

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

  watch: {
    date(newDate) {
      this.fetchAppointments();
    },
  },

  methods: {
    async fetchAppointments() {
      this.loading = true;

      const response = await this.http.get('/v1/appointments', {
        params: {
          'filter[clinic_id]': this.clinic.get.id,
          'filter[available]': true,
          'filter[starts_after]': moment(this.date, moment.HTML5_FMT.DATE).format('Y-MM-DD\\T00:00:00+00:00'),
          'filter[starts_before]': moment(this.date, moment.HTML5_FMT.DATE).format('Y-MM-DD\\T23:59:59+00:00'),
        }
      });
      this.appointments = response.data.data;

      this.loading = false;
    },
  },

  created() {
    this.fetchAppointments();
  },
};
</script>

