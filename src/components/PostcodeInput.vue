<template>
  <div>
    <input
      :value="value"
      @input="onInput"
      @keypress.enter="onClick"
      ref="input"
      type="text"
      class="input input--text input--search"
      placeholder="AB12 1AB"
    >
    <button class="postcode__button" type="button" @click="onClick" :disabled="!valid">
      <i class="icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PostcodeInput',

  props: {
    value: {
      required: true,
    },
  },

  data() {
    return {
      postcodeRegex: new RegExp(
        [
          '^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][',
          'A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z]',
          '[A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\\s?[0-9][A-Za-z]{2})$',
        ].join(''),
        'g',
      ),
    };
  },

  computed: {
    valid() {
      const postcode = this.value || '';
      return postcode.match(this.postcodeRegex);
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onClick() {
      if (!this.valid) {
        return;
      }

      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
.postcode__button {
  &:disabled {
    opacity: .5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
