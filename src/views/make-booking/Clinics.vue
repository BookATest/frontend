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

      <bat-loader v-if="loading" />

      <template v-else>
        <bat-card
          v-for="clinic in clinics"
          :key="clinic.id"
          @select="onSelectClinic(clinic)"
          @deselect="onDeselectClinic(clinic)"
          primary
          :selected="selectedClinicId === clinic.id"
          :title="clinic.name"
        >
          <p>
            {{ clinic.address_line_1 }}<br>
            <template v-if="clinic.address_line_2">
              {{ clinic.address_line_2 }}<br>
            </template>
            <template v-if="clinic.address_line_3">
              {{ clinic.address_line_3 }}<br>
            </template>
            {{ clinic.city }}<br>
            {{ clinic.postcode }}
          </p>

          <span slot="meta">{{ toMiles(clinic.distance) }} miles</span>
        </bat-card>

        <p v-if="clinics.length === 0">You're not eligible at any clinics.</p>
      </template>

      <bat-content-footer>
        <bat-button @click="onNext" :disabled="selectedClinic === null">Select location</bat-button>
        <bat-button :to="{ name: 'location' }" back>Back</bat-button>
      </bat-content-footer>
    </bat-content>
  </div>
</template>

<script>
import Card from "@/components/Card";

import Location from "@/utilities/Location";
import Answers from "@/utilities/Answers";
import Clinic from "@/utilities/Clinic";

export default {
  name: 'Clinics',

  components: {
    BatCard: Card,
  },

  data() {
    return {
      location: new Location(),
      answers: new Answers(),
      clinic: new Clinic(),
      clinics: [],
      selectedClinicId: null,
      loading: false,
    };
  },

  computed: {
    locationText() {
      if (this.location.getPostcode !== undefined) {
        return this.location.getPostcode;
      }

      return 'your location';
    },

    selectedClinic() {
      if (this.selectedClinicId === null) {
        return null;
      }

      return this.clinics.find(clinic => clinic.id === this.selectedClinicId);
    },
  },

  methods: {
    async fetchClinics() {
      this.loading = true;

      let payload = {
        answers: this.answers.all,
      };

      if (this.location.getPostcode !== undefined) {
        payload.postcode = this.location.getPostcode;
      } else {
        payload.location = this.location.getCoordinate;
      }

      const response = await this.http.post('/v1/bookings/eligibility', payload);
      this.clinics = response.data.data;

      this.loading = false;
    },

    toMiles(meters) {
      return (0.000621371 * meters).toFixed(2);
    },

    onSelectClinic(clinic) {
      this.selectedClinicId = clinic.id;
    },

    onDeselectClinic(clinic) {
      if (this.selectedClinicId === clinic.id) {
        this.selectedClinicId = null;
      }
    },

    onNext() {
      this.clinic.cache(this.selectedClinic);
      this.$router.push({ name: 'appointments' });
    },
  },

  created() {
    this.fetchClinics();
  },
};
</script>
