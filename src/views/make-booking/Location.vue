<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title v-text="settings.language['make-booking'].location.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].location.content"
        v-text="settings.language['make-booking'].location.content"
      />
    </bat-text-header>

    <bat-content>
      <div class="form">

        <bat-field search>
          <bat-postcode-input v-model="postcode" @click="onNext" />
        </bat-field>

        <template v-if="hasGeolocationCapabilities">
          <p class="sm-copy text-center">or</p>

          <bat-button location :disabled="loadingLocation || noGeolocation" @click="fetchCoordinate">
            <template v-if="noGeolocation">Could not find your location</template>
            <template v-else-if="loadingLocation">Finding location...</template>
            <template v-else>Find my location</template>
            <bat-icon location-arrow />
          </bat-button>
        </template>

        <bat-content-footer>
          <bat-button :to="{ name: 'make-booking.questions' }" back>Back</bat-button>
        </bat-content-footer>

      </div>
    </bat-content>
  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Field from '@/components/Field';
import PostcodeInput from '@/components/PostcodeInput';
import Location from '@/utilities/Location';

export default {
  name: 'Location',

  components: {
    BatField: Field,
    BatPostcodeInput: PostcodeInput,
  },

  data() {
    return {
      loadingLocation: false,
      location: new Location(),
      postcode: '',
      coordinate: {
        lat: null,
        lon: null,
      },
      hasGeolocationCapabilities: navigator.geolocation,
      noGeolocation: false,
      settings: new Settings().load(),
    };
  },

  methods: {
    /**
     * Triggered when entering a postcode.
     */
    onNext() {
      this.location.clear();
      this.cachePostcode();
      this.$router.push({ name: 'make-booking.clinics' });
    },

    /**
     * Triggerred when using the geo location.
     */
    fetchCoordinate() {
      if (this.loadingLocation) {
        return;
      }

      this.loadingLocation = true;

      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinate.lat = position.coords.latitude;
        this.coordinate.lon = position.coords.longitude;

        this.location.clear();
        this.cacheCoordinate();

        this.loadingLocation = false;

        this.$router.push({ name: 'make-booking.clinics' });
      }, () => {
        this.noGeolocation = true;
        this.loadingLocation = false;
      });
    },

    cacheCoordinate() {
      this.location.cache(this.coordinate);
    },

    fetchPostcode() {
      this.postcode = this.location.getPostcode;
    },

    cachePostcode() {
      let postcode = this.postcode;

      // Regex to check if no space.
      if (!/\s[0-9][A-Za-z]{2}$/.test(postcode)) {
        // Add space as API requires one.
        postcode = postcode.slice(0, -3) + ' ' + postcode.slice(-3);
      }

      this.location.cache(postcode);
    },
  },

  created() {
    this.fetchPostcode();
  },
};
</script>
