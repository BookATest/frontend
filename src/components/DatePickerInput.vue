<template>
  <div>
    <bat-field date-picker>
      <label for="date-picker">Select date</label>

      <div class="date-picker">

        <div class="date-picker__options">

          <a
            @click="onSelect(today)"
            href="#"
            class="date-picker__options__option"
            :class="{ selected: value === today.format(html5DateFormat) }"
            role="button"
          >
            Today
          </a>

          <!---->&nbsp;<!---->

          <a
            @click="onSelect(tomorrow)"
            href="#"
            class="date-picker__options__option"
            :class="{ selected: value === tomorrow.format(html5DateFormat) }"
            role="button"
          >
            Tomorrow
          </a>

          <!---->&nbsp;<!---->

          <a
            @click="onSelect(dayPlus2)"
            href="#"
            class="date-picker__options__option"
            :class="{ selected: value === dayPlus2.format(html5DateFormat) }"
            role="button"
            v-text="dayPlus2.format('dddd')"
          />

          <!---->&nbsp;<!---->

          <a
            @click="onSelect(dayPlus3)"
            href="#"
            class="date-picker__options__option"
            :class="{ selected: value === dayPlus3.format(html5DateFormat) }"
            role="button"
            v-text="dayPlus3.format('dddd')"
          />

        </div>

        <div class="date-picker__toggle">
          <button @click="toggleDatePicker">
            <div class="date-picker__toggle__icon">
              <bat-icon arrow-up />
            </div>
          </button>
        </div>

      </div>
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
import moment from "moment";
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
