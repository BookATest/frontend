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

        <p class="sm-copy text-center">or</p>

        <bat-button location>
          Find my location <bat-icon location-arrow />
        </bat-button>

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

export default {
  name: 'Location',

  components: {
    BatField: Field,
    BatPostcodeInput: PostcodeInput,
  },

  data() {
    return {
      postcode: '',
      location: {
        lat: null,
        lon: null,
      },
    };
  },

  methods: {
    onNext() {
      //
    },
  },
};
</script>
