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
          <p v-if="error" class="color-error">{{ error }}</p>
        </bat-field>
      </div>

      <div class="actions">
        <bat-button v-if="requestingToken || fetchingServiceUser" disabled>Logging in...</bat-button>
        <bat-button v-else @click="onLogin" primary>Log in</bat-button>
      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import TextInput from '@/components/TextInput';
import Token from '@/utilities/Token';
import ServiceUser from '@/utilities/ServiceUser';

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
      serviceUserCache: new ServiceUser(),
      tokenCache: new Token(),
      requestingToken: false,
      fetchingServiceUser: false,
      error: null,
    };
  },

  computed: {
    code() {
      return '' + this.code1 + this.code2 + this.code3 + this.code4 + this.code5;
    },
  },

  methods: {
    onLogin() {
      this.requestingToken = true;

      this.http.post('/v1/service-users/token', { access_code: this.code })
        .then(response => {
          // Cache the token.
          const token = response.data.token;
          this.tokenCache.cache(token);

          // Fetch the service user.
          this.fetchingServiceUser = true;
          this.http.get(`/v1/service-users/token/${token}`)
            .then(response => {
              // Cache the service user.
              this.serviceUserCache.cache(response.data.data);

              // Redirect to appointments page.
              this.$router.push({ name: 'list-bookings.appointments' });
            });
        })
        .catch(error => {
          this.error = error.response.data.errors.access_code[0];
        })
        .then(() => this.requestingToken = false);
    },

    /**
     * Places focus on the next input box.
     */
    onKeyup(key, index) {
      // First, clear the error if there is one.
      this.error = null;

      // Attempt to parse the key pressed into an integer.
      const number = parseInt(key);

      // Exit if the key was not a number.
      if (isNaN(number)) {
        return;
      }

      // Exit if the number is less than 0 or greater than 9.
      if (number < 0 || number > 9) {
        return;
      }

      // Do nothing if on last input.
      if (index === 5) {
        return;
      }

      // Shift focus to the next input.
      this.$refs[`code_${index + 1}`].$el.focus();
    },
  },
};
</script>
