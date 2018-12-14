<template>
  <div>
    <bat-text-header>
      <bat-text-header-title v-text="settings.language['make-booking'].introduction.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].introduction.content"
        v-html="toHtml(settings.language['make-booking'].introduction.content)"
      />
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'make-booking.questions' }" primary>Continue</bat-button>
    </bat-content>
  </div>
</template>

<script>
import Settings from '@/utilities/Settings';

export default {
  name: 'Introduction',

  data() {
    return {
      settings: new Settings().load(),
    };
  },
};
</script>
