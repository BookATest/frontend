<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>My appointment</bat-text-header-title>
      <bat-text-header-description small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <div class="form text-center">
        <bat-field code text text-label-top>
          <bat-field-input>
            <label for="code_1">Confirmation code</label>
            <bat-text-input v-model="code1" @keyup="onKeyup($event, 1)" ref="code_1" maxlength="1" placeholder="-" name="code_1" />
            <bat-text-input v-model="code2" @keyup="onKeyup($event, 2)" ref="code_2" maxlength="1" placeholder="-" />
            <bat-text-input v-model="code3" @keyup="onKeyup($event, 3)" ref="code_3" maxlength="1" placeholder="-" />
            <bat-text-input v-model="code4" @keyup="onKeyup($event, 4)" ref="code_4" maxlength="1" placeholder="-" />
            <bat-text-input v-model="code5" @keyup="onKeyup($event, 5)" ref="code_5" maxlength="1" placeholder="-" />
          </bat-field-input>
        </bat-field>
      </div>

      <div class="actions">
        <bat-button @click="onLogin" primary>Log in</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import TextInput from '@/components/TextInput';

export default {
  name: 'Token',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatTextInput: TextInput,
  },

  data() {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    };
  },

  computed: {
    code() {
      return '' + this.code1 + this.code2 + this.code3 + this.code4 + this.code5;
    },
  },

  methods: {
    onLogin() {
      // TODO: Login
    },

    onKeyup(key, index) {
      const number = parseInt(key);

      if (isNaN(number)) {
        return;
      }

      if (number < 0 || number > 9) {
        return;
      }

      if (index === 5) {
        return;
      }

      this.$refs[`code_${index + 1}`].$el.focus();
    },
  },
};
</script>
