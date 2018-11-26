<template>
  <div>

    <div class="flex-container flex-container--flush flex-container--wrap">
      <bat-select-input
        :value="day"
        :options="days | options"
      />

      <bat-select-input
        :value="month"
        :options="months | options"
      />
    </div>

    <bat-select-input
      :value="year"
      :options="years | options"
    />

  </div>
</template>

<script>
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

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },

  filters: {
    options(values) {
      return values.map((value) => ({ value, text: value }));
    },
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
