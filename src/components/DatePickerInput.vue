<template>
  <div>
    <bat-field date-picker>
      
      <a @click.prevent="toggleDatePicker" href="#">
        <strong>Choose another date?</strong>
      </a>
      
    </bat-field>

    <date-picker
      ref="datePicker"
      monday-first
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
  },

  data() {
    return {
      today: moment(),
      tomorrow: moment().add(1, 'day'),
      dayPlus2: moment().add(2, 'days'),
      dayPlus3: moment().add(3, 'days'),
      html5DateFormat: moment.HTML5_FMT.DATE,
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
  },
};
</script>

<style lang="scss">
.date-picker--hidden {
  display: none;
}
</style>
