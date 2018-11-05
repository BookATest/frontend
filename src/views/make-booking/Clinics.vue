<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title>Find location</bat-text-header-title>
    </bat-text-header>

    <bat-content>
      <div class="results">
        <span class="results__text">Showing results for</span>
        <span class="results__term" v-text="locationText" />
      </div>

      <bat-button :to="{ name: 'questions' }" disabled>Select location</bat-button>
      <bat-button :to="{ name: 'location' }" back>Back</bat-button>
    </bat-content>
  </div>
</template>

<script>
import Location from "@/utilities/Location";

export default {
  name: 'Clinics',

  data() {
    return {
      location: new Location(),
    };
  },

  computed: {
    locationText() {
      if (this.location.getPostcode !== undefined) {
        return this.location.getPostcode;
      }

      return 'your location';
    },
  },
};
</script>
