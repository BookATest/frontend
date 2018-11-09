<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>My appointment</bat-text-header-title>
      <bat-text-header-description small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <div class="form text-center">
        <bat-field text text-label-top>
          <bat-field-input>
            <label for="phone">Enter phone number</label>
            <bat-text-input v-model="phone" @input="onInput" type="tel" />
            <p v-if="error" class="color-error">{{ error }}</p>
          </bat-field-input>
        </bat-field>
      </div>

      <div class="actions">
        <bat-button v-if="!sending" @click="onSendCode" primary>Send code</bat-button>
        <bat-button v-else disabled>Sending...</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import TextInput from '@/components/TextInput';

export default {
  name: 'PhoneNumber',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatTextInput: TextInput,
  },

  data() {
    return {
      phone: '',
      sending: false,
      error: null,
    };
  },

  methods: {
    onInput() {
      this.error = null;
    },

    onSendCode() {
      this.sending = true;

      this.http.post('/v1/service-users/access-code', { phone: this.phone })
        .then(response => {
          this.$router.push({ name: 'token' });
        })
        .catch(error => {
          this.error = error.response.data.errors.phone[0];
        })
        .then(() => this.sending = false);
    },
  },
};
</script>
