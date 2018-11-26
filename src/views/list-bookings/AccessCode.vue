<template>
  <div>

    <bat-text-header>
      <bat-text-header-title v-text="settings.language['list-bookings']['access-code'].title" />
      <bat-text-header-description
        small
        v-if="settings.language['list-bookings']['access-code'].content"
        v-text="settings.language['list-bookings']['access-code'].content"
      />
    </bat-text-header>

    <bat-content>
      <form @submit.prevent="onSendCode" class="form text-center">
        <bat-field text text-label-top>
          <bat-field-input>
            <label for="phone">Enter phone number</label>
            <bat-text-input v-model="phone" @input="onInput" type="tel" />
          </bat-field-input>
          <p v-if="error" class="color-error">{{ error }}</p>
        </bat-field>

         <div class="actions">
          <bat-button v-if="!sending" :primary="valid" :disabled="!valid" type="submit">Send code</bat-button>
          <bat-button v-else disabled>Sending...</bat-button>
        </div>
      </form>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Phone from '@/utilities/Phone';
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
      settings: new Settings().load(),
      phoneCache: new Phone(),
    };
  },

  computed: {
    valid() {
      if (!this.phone.match(/^(0[0-9]{10})$/g)) {
        return false;
      }

      return true;
    },
  },

  methods: {
    onInput() {
      this.error = null;
    },

    onSendCode() {
      if (!this.valid) {
        return;
      }

      this.sending = true;

      this.http.post('/v1/service-users/access-code', { phone: this.phone })
        .then((response) => {
          this.phoneCache.cache(this.phone);
          this.$router.push({ name: 'list-bookings.token' });
        })
        .catch((error) => {
          this.error = error.response.data.errors.phone[0];
        })
        .then(() => this.sending = false);
    },
  },
};
</script>
