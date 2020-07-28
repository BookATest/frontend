<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title v-text="settings.language['make-booking'].clinics.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].clinics.content"
        v-html="toHtml(settings.language['make-booking'].clinics.content)"
      />
    </bat-text-header>

    <bat-content>
      <div v-if="clinics.length > 0" class="results">
        <span class="results__text">Showing results for</span>
        <span class="results__term" v-text="locationText" />
      </div>

      <bat-loader v-if="loading" />

      <template v-else>
        <template v-if="clinics.length > 0">
          <template v-for="(clinic, index) in clinics">
            <bat-card
              v-if="index < 3 || showAll"
              :key="clinic.id"
              @select="onSelectClinic(clinic)"
              @deselect="onDeselectClinic(clinic)"
              primary
              clickable
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
          </template>

          <bat-button
            v-if="clinics.length > 3 && showAll === false"
            @click="onShowMore"
          >
            Show More
          </bat-button>
        </template>

        <template v-else>
          <div v-html="toHtml(settings.language['make-booking'].clinics.ineligible)"></div>
        </template>
      </template>

      <bat-content-footer>
        <bat-button v-if="clinics.length > 0" @click="onNext" :disabled="!valid">Select location</bat-button>
        <bat-button :to="{ name: 'make-booking.location' }" back>Back</bat-button>
      </bat-content-footer>
    </bat-content>
  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Card from '@/components/Card';
import Location from '@/utilities/Location';
import Answers from '@/utilities/Answers';
import Clinic from '@/utilities/Clinic';

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
      settings: new Settings().load(),
      showAll: false,
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

      return this.clinics.find((clinic) => clinic.id === this.selectedClinicId);
    },

    valid() {
      if (this.selectedClinicId === null) {
        return false;
      }

      return true;
    },
  },

  methods: {
    async fetchClinics() {
      this.loading = true;

      const payload = {
        answers: this.answers.all,
      };

      if (this.location.getPostcode !== undefined) {
        payload.postcode = this.location.getPostcode;
      } else {
        payload.location = this.location.getCoordinate;
      }

      const response = await this.http.post('/v1/bookings/eligibility', payload);
      this.clinics = response.data.data;

      // Preselect the clinic if found in cache.
      const clinic = this.clinic.get;
      if (clinic) {
        this.selectedClinicId = clinic.id;
      }

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
      if (!this.valid) {
        return;
      }

      this.clinic.cache(this.selectedClinic);
      this.$router.push({ name: 'make-booking.appointments' });
    },

    onShowMore() {
      this.showAll = true;
    },
  },

  created() {
    this.fetchClinics();
  },
};
</script>
