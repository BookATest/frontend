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

        <bat-field inline date>
          <bat-label for="question_2" :number="2">What's your date of birth?</bat-label>
          <bat-field-input>
            <bat-date-input v-model="question2" id="question_2" />
          </bat-field-input>
        </bat-field>

        <bat-field inline text>
          <bat-label for="question_3" :number="3">Where did you hear about us?</bat-label>
          <bat-field-input>
            <bat-text-input v-model="question3" id="question_3" />
          </bat-field-input>
        </bat-field>

        <bat-field inline checkbox>
          <bat-label for="question_4" :number="4">Are you a smoker?</bat-label>
          <bat-field-input>
            <bat-checkbox-input v-model="question4" id="question_4" />
          </bat-field-input>
        </bat-field>

        <div class="actions">
          <bat-button to="/next" tag="button" primary>Continue</bat-button>
        </div>

      </div>
    </bat-content>

  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import Label from '@/components/Label';
import SelectInput from '@/components/SelectInput';
import DateInput from '@/components/DateInput';
import TextInput from '@/components/TextInput';
import CheckboxInput from '@/components/CheckboxInput';

export default {
  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatLabel: Label,
    BatSelectInput: SelectInput,
    BatDateInput: DateInput,
    BatTextInput: TextInput,
    BatCheckboxInput: CheckboxInput,
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
      question2: '',
      question3: '',
      question4: false,
    };
  },
};
</script>
