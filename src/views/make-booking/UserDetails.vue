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

      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import TextInput from '@/components/TextInput';

export default {
  name: 'UserDetails',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatTextInput: TextInput,
  },

  data() {
    return {
      name: '',
    };
  },
};
</script>
