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
            <select id="question_1" class="select">
              <option value="" disabled selected>-</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
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

export default {
  components: {
    BatField: Field,
    BatFieldInput: FieldInput,
    BatLabel: Label,
  },

  name: 'Questions',
};
</script>
