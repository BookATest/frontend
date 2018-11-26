<template>
  <div>

    <div class="flex-container flex-container--flush flex-container--wrap">
      <bat-select-input
        @input="onInput"
        v-model="day"
        :options="days | options"
      />

      <bat-select-input
        @input="onInput"
        v-model="month"
        :options="months | options"
      />
    </div>

    <bat-select-input
      @input="onInput"
      v-model="year"
      :options="years | options"
    />

  </div>
</template>

<script>
import moment from 'moment';
import SelectInput from '@/components/SelectInput';

export default {
  name: 'DateInput',

  components: {
    BatSelectInput: SelectInput,
  },

  props: {
    value: {
      required: true,
    },
  },

  data() {
    return {
      year: null,
      month: null,
      day: null,
    };
  },

  computed: {
    days() {
      return [...Array(31).keys()].map((day) => ++day);
    },

    months() {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    },

    years() {
      return [...Array(201).keys()].map((day) => day += new Date().getFullYear() - 100);
    },
  },

  watch: {
    value(newValue) {
      this.watchDate(newValue);
    },
  },

  methods: {
    onInput() {
      // Attempt to parse the date into a moment instance.
      const date = this.parseDate();

      // If the date could not parse, then exit.
      if (!date) {
        return;
      }

      this.$emit('input', date.format(moment.HTML5_FMT.DATE));
    },

    parseDate() {
      if (this.day === null) {
        return null;
      }

      if (this.month === null) {
        return null;
      }

      if (this.year === null) {
        return null;
      }

      return moment(`${this.day} ${this.month} ${this.year}`, 'D MMMM YYYY');
    },

    watchDate(value) {
      // Skip if no value.
      if (!value) {
        return;
      }

      const date = moment(value);

      this.day = date.format('D');
      this.month = date.format('MMMM');
      this.year = date.format('YYYY');
    },
  },

  filters: {
    options(values) {
      return values.map((value) => ({ value, text: value }));
    },
  },

  created() {
    this.watchDate(this.value);
  },
};
</script>

<style lang="scss">
.flex-container {
  &--flush {
    padding: 0;
  }

  &--wrap {
    flex-wrap: nowrap;
  }
}
</style>
