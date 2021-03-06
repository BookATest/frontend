<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="3" />
      <bat-text-header-title v-text="settings.language['make-booking']['user-details'].title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking']['user-details'].content"
        v-html="toHtml(settings.language['make-booking']['user-details'].content)"
      />
    </bat-text-header>

    <bat-content>
      <form @submit.prevent="onNext" class="form">

        <bat-field text>
          <label for="name">
            Please enter your name
            <span class="instructions">(doesn't have to be your real name)</span>
          </label>
          <bat-text-input v-model="name" id="name" />
        </bat-field>

        <hr>

        <bat-field radio>
          <bat-field-title>How would you like to be contacted?</bat-field-title>

          <bat-field-input>
            <bat-toggle-button-input v-model="preferredContactMethod" input-value="phone">Phone</bat-toggle-button-input>
            <bat-toggle-button-input v-model="preferredContactMethod" input-value="email">Email</bat-toggle-button-input>
            <bat-toggle-button-input v-model="preferredContactMethod" input-value="both">Both</bat-toggle-button-input>
          </bat-field-input>
        </bat-field>

        <bat-field text>
          <label for="phone_input">Phone*</label>
          <bat-text-input v-model="phone" type="tel" id="phone_input" />
        </bat-field>

        <bat-field text v-if="showEmailInput">
          <label for="email_input">Email</label>
          <bat-text-input v-model="email" type="email" id="email_input" />
        </bat-field>

        <bat-content-footer>
          <bat-button :primary="valid" :disabled="!valid" type="submit">Continue</bat-button>
          <bat-button @click="onBack" back>Back</bat-button>
        </bat-content-footer>

      </form>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import FieldTitle from '@/components/FieldTitle';
import TextInput from '@/components/TextInput';
import ToggleButtonInput from '@/components/ToggleButtonInput';
import UserDetails from '@/utilities/UserDetails';

export default {
  name: 'UserDetails',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatFieldTitle: FieldTitle,
    BatTextInput: TextInput,
    BatToggleButtonInput: ToggleButtonInput,
  },

  data() {
    return {
      name: '',
      preferredContactMethod: 'phone',
      phone: '',
      email: '',
      userDetailsCache: new UserDetails(),
      settings: new Settings().load(),
    };
  },

  computed: {
    valid() {
      if (this.preferredContactMethod === '') {
        return false;
      }

      if (this.preferredContactMethod === 'phone') {
        // For phone.
        if (this.name === '') {
          return false;
        }

        if (!this.phone.match(/^(0[0-9]{10})$/g)) {
          return false;
        }
      } else {
        // For email or both.
        if (this.name === '') {
          return false;
        }

        if (!this.phone.match(/^(0[0-9]{10})$/g)) {
          return false;
        }

        if (!this.email.match(new RegExp([
          '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
          '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]',
          '{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        ].join('')))) {
          return false;
        }
      }

      return true;
    },

    showEmailInput() {
      return (this.preferredContactMethod === 'email') || (this.preferredContactMethod === 'both');
    },
  },

  watch: {
    preferredContactMethod(newMethod) {
      if (newMethod === 'phone') {
        this.email = '';
      }
    },
  },

  methods: {
    onNext() {
      if (!this.valid) {
        return;
      }

      // Cache the user details.
      this.userDetailsCache.cache({
        name: this.name,
        preferred_contact_method: this.preferredContactMethod,
        phone: this.phone,
        email: this.email,
      });

      // Forward to next page.
      this.$router.push({ name: 'make-booking.consent' });
    },

    onBack() {
      this.$router.push({ name: 'make-booking.appointments' });
    },

    loadUserDetails() {
      // Load from cache.
      const userDetails = this.userDetailsCache.get;

      // Exit if not cached.
      if (userDetails === undefined) {
        return;
      }

      this.name = userDetails.name;
      this.preferredContactMethod = userDetails.preferred_contact_method;
      this.phone = userDetails.phone;
      this.email = userDetails.email;
    },
  },

  created() {
    this.loadUserDetails();
  },
};
</script>
