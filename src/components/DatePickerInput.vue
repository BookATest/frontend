<template>
  <div>
    <bat-field date-picker>

      <a @click.prevent="toggleDatePicker" href="#">
        <strong>Choose another date?</strong>
      </a>

    </bat-field>

    <date-picker
      :value="value"
      ref="datePicker"
      monday-first
      :disabled-dates="disabledDates"
      input-class="date-picker--hidden"
      @selected="onDateSelected"
    />
  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import Field from '@/components/Field';

export default {
  name: 'DatePickerInput',

  components: {
    DatePicker: Datepicker,
    BatField: Field,
  },

  props: {
    value: {
      required: true,
    },

    availableAppointments: {
      required: true,
      type: Array
    }
  },

  data() {
    return {
      today: moment(),
      tomorrow: moment().add(1, 'day'),
      dayPlus2: moment().add(2, 'days'),
      dayPlus3: moment().add(3, 'days'),
      html5DateFormat: moment.HTML5_FMT.DATE,
      disabledDates: {
        customPredictor: (date) => {
          const checkDate = moment(date)

          const appointmentExists = this.availableAppointments.find((appointment) => {
            const appointmentDate = moment(appointment.start_at, moment.ISO_8601);

            return checkDate.format(moment.HTML5_FMT.DATE) === appointmentDate.format(moment.HTML5_FMT.DATE);
          });

          return appointmentExists === undefined;
        }
      }
    };
  },

  methods: {
    onSelect(date) {
      this.$emit('input', date.format(moment.HTML5_FMT.DATE));
    },

    onDateSelected(date) {
      this.onSelect(moment(date));
    },

    toggleDatePicker() {
      this.$refs.datePicker.showCalendar();
    },
  }
};
</script>

<style lang="scss">
.date-picker--hidden {
  display: none;
}
</style>
