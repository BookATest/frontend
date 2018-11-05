<template>
  <div>

    <bat-text-header>
      <bat-text-header-title>What are you looking for?</bat-text-header-title>
      <bat-text-header-description small>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.
      </bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-loader v-if="loading" />

      <div v-else class="form">

        <bat-field
          v-for="(question, index) in questions" :key="question.id"
          inline
          :select="question.type === 'select'"
          :text="question.type === 'text'"
          :checkbox="question.type === 'checkbox'"
          :date="question.type === 'date'"
        >
          <bat-label :for="question.id" :number="index + 1" v-text="question.question" />
          <bat-field-input>
            <bat-select-input
              v-if="question.type === 'select'"
              v-model="question.answer"
              :id="question.id"
              :options="question.options"
            />
            <bat-date-input
              v-if="question.type === 'date'"
              v-model="question.answer"
              :id="question.id"
            />
            <bat-text-input
              v-if="question.type === 'text'"
              v-model="question.answer"
              :id="question.id"
            />
            <bat-checkbox-input
              v-if="question.type === 'checkbox'"
              v-model="question.answer"
              :id="question.id"
            />
          </bat-field-input>
        </bat-field>

        <div class="actions">
          <bat-button :to="{ name: 'location' }" tag="button" primary>Continue</bat-button>
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
  name: 'Questions',

  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatLabel: Label,
    BatSelectInput: SelectInput,
    BatDateInput: DateInput,
    BatTextInput: TextInput,
    BatCheckboxInput: CheckboxInput,
  },

  data() {
    return {
      loading: false,
      questions: [],
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

  methods: {
    async fetchQuestions() {
      this.loading = true;

      const response = await this.http.get('/v1/questions');
      this.questions = response.data.data.map(this.parseQuestion);

      this.loading = false;
    },

    parseQuestion(question) {
      switch (question.type) {
          case 'select':
            question.answer = null;
            question.options = question.options.map(option => ({ value: option, text: option }));
            question.options.unshift({ value: null, text: '-', disabled: true, selected: true });
            break;
          case 'checkbox':
            question.answer = false;
            break;
          case 'date':
          case 'text':
          default:
            question.answer = '';
            break;
        }

        return question;
    }
  },

  created() {
    this.fetchQuestions();
  },
};
</script>
