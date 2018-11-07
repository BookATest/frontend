<template>
  <div>
    <label for="date-picker">Select date</label>

    <div class="date-picker">

      <div class="date-picker__options">
        <a href="#" class="date-picker__options__option selected" role="button">Today</a>&nbsp;<!---->
        <a href="#" class="date-picker__options__option" role="button">Tomorrow</a>&nbsp;<!---->
        <a href="#" class="date-picker__options__option" role="button" v-text="dayPlus2.format('dddd')" />&nbsp;<!---->
        <a href="#" class="date-picker__options__option" role="button" v-text="dayPlus3.format('dddd')" />
      </div>

      <div class="date-picker__toggle">
        <a href="#">
          <div class="date-picker__toggle__icon">
            <bat-icon arrow-up />
          </div>

          <div class="date-picker__toggle__selection">
            <span class="day">4</span>
            <span class="month">May</span>
          </div>
        </a>
      </div>

      <table class="date-picker__table">
        <thead>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
          <th>S</th>
        </thead>

        <tbody>
          <tr>
            <td class="unavailable">23 <span class="month">Apr</span></td>
            <td class="unavailable">24</td>
            <td class="current">25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td class="unavailable">29</td>
          </tr>
          <tr>
            <td>30</td>
            <td>1 <span class="month">May</span></td>
            <td>2</td>
            <td>3</td>
            <td class="selected">4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td class="unavailable">13</td>
          </tr>
          <tr>
            <td>14</td>
            <td>15</td>
            <td class="unavailable">16</td>
            <td>17</td>
            <td>18</td>
            <td class="unavailable">19</td>
            <td class="unavailable">20</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'DatePickerInput',

  data() {
    return {
      dayPlus2: moment().add(2, 'days'),
      dayPlus3: moment().add(3, 'days'),
    };
  },
};
</script>
