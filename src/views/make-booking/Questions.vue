<template>
  <div>

    <bat-text-header>
      <h1 class="text-header__title">What are you looking for?</h1>
      <p class="text-header__description sm-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.</p>
    </bat-text-header>

    <bat-content>
      <div class="form">

        <bat-field inline select>
          <bat-label for="question_1" :number="1">What is your gender?</bat-label>
          <bat-field-input>
            <bat-select-input v-model="question1" id="question_1" :options="question1Options" />
          </bat-field-input>
        </bat-field>

      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import Label from '@/components/Label';
import SelectInput from '@/components/SelectInput';

export default {
  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatLabel: Label,
    BatSelectInput: SelectInput,
  },

  name: 'Questions',

  data() {
    return {
      question1: null,
      question1Options: [
        { value: null, text: '-', disabled: true, selected: true },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Non-binary', text: 'Non-binary' },
        { value: 'Prefer not to say', text: 'Prefer not to say' },
      ],
    };
  },
};
</script>
