<template>
  <div>

    <bat-text-header>
      <bat-text-header-title v-text="settings.language['list-bookings'].cancelled.title" />
      <bat-text-header-description
        small
        v-if="settings.language['list-bookings'].cancelled.content"
        v-html="toHtml(settings.language['list-bookings'].cancelled.content)"
      />
    </bat-text-header>

    <bat-content>
      <bat-button @click="onBack" primary>Back to appointments</bat-button>
      <bat-button @click="onHome" secondary>Book a new appointment</bat-button>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Token from '@/utilities/Token';
import Alert from '@/components/Alert';

export default {
  name: 'Cancelled',

  data() {
    return {
      settings: new Settings().load(),
    };
  },

  methods: {
    onBack() {
      this.$router.push({ name: 'list-bookings.appointments' });
    },
    onHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
