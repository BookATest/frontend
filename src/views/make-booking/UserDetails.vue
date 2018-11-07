<template>
  <div>

    <bat-text-header>
      <bat-text-header-progress :active="3" />
      <bat-text-header-title>Enter details</bat-text-header-title>
      <bat-text-header-description small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <div class="form">

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

      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import FieldTitle from '@/components/FieldTitle';
import TextInput from '@/components/TextInput';
import ToggleButtonInput from '@/components/ToggleButtonInput';

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
    };
  },
};
</script>
