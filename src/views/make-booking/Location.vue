<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title>Find location</bat-text-header-title>
      <bat-text-header-description small>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.
      </bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <div class="form">

        <bat-field search>
          <bat-postcode-input v-model="postcode" @click="onNext" />
        </bat-field>

        <template v-if="hasGeolocationCapabilities">
          <p class="sm-copy text-center">or</p>

          <bat-button location @click="fetchCoordinate">
            <template v-if="loadingLocation">Finding location...</template>
            <template v-else>Find my location</template>
            <bat-icon location-arrow />
          </bat-button>
        </template>

        <bat-content-footer>
          <bat-button :to="{ name: 'questions' }" back>Back</bat-button>
        </bat-content-footer>

      </div>
    </bat-content>
  </div>
</template>

<script>
import Field from '@/components/Field';
import PostcodeInput from "@/components/PostcodeInput";

import Location from "@/utilities/Location";

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
    };
  },

  methods: {
    /**
     * Triggered when entering a postcode.
     */
    onNext() {
      this.location.clear();
      this.cachePostcode();
      this.$router.push({ name: 'clinics' });
    },

    /**
     * Triggerred when using the geo location.
     */
    fetchCoordinate() {
      this.loadingLocation = true;

      navigator.geolocation.getCurrentPosition(position => {
        this.coordinate.lat = position.coords.latitude;
        this.coordinate.lon = position.coords.longitude;

        this.location.clear();
        this.cacheCoordinate();

        this.loadingLocation = false;

        this.$router.push({ name: 'clinics' });
      });
    },

    cacheCoordinate() {
      this.location.cache(this.coordinate);
    },

    fetchPostcode() {
      this.postcode = this.location.getPostcode;
    },

    cachePostcode() {
      this.location.cache(this.postcode);
    },
  },

  created() {
    this.fetchPostcode();
  },
};
</script>
