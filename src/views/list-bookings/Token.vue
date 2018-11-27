<template>
  <div>

    <bat-text-header>
      <bat-text-header-title v-text="settings.language['list-bookings'].token.title" />
      <bat-text-header-description
        small
        v-if="settings.language['list-bookings'].token.content"
        v-text="settings.language['list-bookings'].token.content"
      />
    </bat-text-header>

    <bat-content>
      <form @submit.prevent="onLogin" class="form text-center">
        <bat-field code text-label-top center>
          <bat-field-input>
            <label for="code">Confirmation code</label>
            <bat-text-input v-model="code" type="number" maxlength="5" id="code" placeholder="XXXXX" />
          </bat-field-input>
          <p v-if="error" class="color-error">{{ error }}</p>
        </bat-field>

        <div class="actions">
          <bat-button v-if="requestingToken || fetchingServiceUser" disabled>Logging in...</bat-button>
          <bat-button v-else :primary="valid" :disabled="!valid" type="submit">Log in</bat-button>
        </div>
      </form>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import TextInput from '@/components/TextInput';
import Token from '@/utilities/Token';
import ServiceUser from '@/utilities/ServiceUser';
import Phone from '@/utilities/Phone';

export default {
  name: 'Token',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatTextInput: TextInput,
  },

  data() {
    return {
      code: '',
      serviceUserCache: new ServiceUser(),
      tokenCache: new Token(),
      requestingToken: false,
      fetchingServiceUser: false,
      error: null,
      settings: new Settings().load(),
      phoneCache: new Phone(),
    };
  },

  computed: {
    valid() {
      // Check if the code only contains digits.
      if (!/^\d{5}$/.test(this.code)) {
        return false;
      }

      return true;
    },
  },

  methods: {
    onLogin() {
      if (!this.valid) {
        return;
      }

      this.requestingToken = true;

      this.http.post('/v1/service-users/token', {
        phone: this.phoneCache.get,
        access_code: this.code,
      })
        .then((response) => {
          // Cache the token.
          const token = response.data.token;
          this.tokenCache.cache(token);

          // Fetch the service user.
          this.fetchingServiceUser = true;
          this.http.get(`/v1/service-users/token/${token}`)
            .then((tokenResponse) => {
              // Cache the service user.
              this.serviceUserCache.cache(tokenResponse.data.data);

              // Redirect to appointments page.
              this.$router.push({ name: 'list-bookings.appointments' });
            });
        })
        .catch((error) => {
          this.error = error.response.data.errors.access_code[0];
        })
        .then(() => this.requestingToken = false);
    },
  },
};
</script>
