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

      <bat-card primary title="Metro Centre - London">
        <p>
          1st Floor Equitable House<br>
          7 General Gordon Square<br>
          London<br>
          SE18 6FH
        </p>

        <span slot="meta">99 miles</span>
      </bat-card>

      <bat-content-footer>
        <bat-button :to="{ name: 'questions' }" disabled>Select location</bat-button>
        <bat-button :to="{ name: 'location' }" back>Back</bat-button>
      </bat-content-footer>
    </bat-content>
  </div>
</template>

<script>
import Card from "@/components/Card";

import Location from "@/utilities/Location";

export default {
  name: 'Clinics',

  components: {
    BatCard: Card,
  },

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
