<template>
  <div>

    <bat-text-header>
      <bat-text-header-title v-text="settings.language['make-booking'].questions.title" />
      <bat-text-header-description
        small
        v-if="settings.language['make-booking'].questions.content"
        v-text="settings.language['make-booking'].questions.content"
      />
    </bat-text-header>

    <bat-content>
      <bat-loader v-if="loading" />

      <form v-else @submit.prevent="onNext" class="form">

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
          <bat-button tag="button" :primary="valid" :disabled="!valid" type="submit">Continue</bat-button>
        </div>

      </form>
    </bat-content>

  </div>
</template>

<script>
import Settings from '@/utilities/Settings';
import Field from '@/components/Field';
import FieldInput from '@/components/FieldInput';
import Label from '@/components/Label';
import SelectInput from '@/components/SelectInput';
import DateInput from '@/components/DateInput';
import TextInput from '@/components/TextInput';
import CheckboxInput from '@/components/CheckboxInput';
import Answers from '@/utilities/Answers';

const answersCacheKey = 'answers';

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
      answers: new Answers(),
      settings: new Settings().load(),
    };
  },

  computed: {
    valid() {
      for (const question of this.questions) {
        if (question.answer === '' || question.answer === null) {
          return false;
        }
      }

      return true;
    },
  },

  methods: {
    async fetchQuestions() {
      this.loading = true;

      const response = await this.http.get('/v1/questions');
      this.questions = response.data.data.map(this.parseQuestion);
      this.fetchAnswers();

      this.loading = false;
    },

    parseQuestion(question) {
      switch (question.type) {
        case 'select':
          question.answer = null;
          question.options = question.options.map((option) => ({ value: option, text: option }));
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
    },

    fetchAnswers() {
      // Loop through each question.
      this.questions.forEach((question) => {
        // Get the answer for the question.
        const answer = this.answers.find(question.id);

        // If the answer exists then set it.
        if (answer) {
          question.answer = answer.answer;
        }
      });
    },

    cacheAnswers() {
      // Create a parsed answers array.
      const answers = this.questions.map((question) => ({ question_id: question.id, answer: question.answer }));

      // Store the answers array as a JSON string in session storage.
      this.answers.cache(answers);
    },

    onNext() {
      if (!this.valid) {
        return;
      }

      this.cacheAnswers();
      this.$router.push({ name: 'make-booking.location' });
    },
  },

  created() {
    this.fetchQuestions();
  },
};
</script>
