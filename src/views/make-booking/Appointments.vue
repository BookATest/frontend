<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="2" />
      <bat-text-header-title v-text="language['make-booking'].appointments.title" />
      <bat-text-header-description
        small
        v-if="language['make-booking'].appointments.content"
        v-html="toHtml(language['make-booking'].appointments.content)"
      />
    </bat-text-header>

    <bat-content>
      <bat-loader v-if="loadingAppointments || loading" />

      <div v-else class="form">

        <bat-alert icon>
          <p class="sm-copy">
            Showing available appointments for: <br /> <strong>{{ date | fullDate }}</strong>
          </p>
        </bat-alert>

        <bat-date-picker-input :available-appointments="appointments" v-model="date" />

        <bat-field time>
          <bat-time-input v-model="appointment" :date="date" />
        </bat-field>

        <bat-content-footer>
          <bat-button @click="onNext" :primary="appointmentSelected" :disabled="!appointmentSelected">Continue</bat-button>
          <bat-button @click="onBack" back>Back</bat-button>
        </bat-content-footer>
      </div>
    </bat-content>
  </div>
</template>

<script>
import moment from 'moment';
import Field from '@/components/Field';
import DatePickerInput from '@/components/DatePickerInput';
import TimeInput from '@/components/TimeInput';
import Clinic from '@/utilities/Clinic';
import Appointment from '@/utilities/Appointment';
import Settings from '@/utilities/Settings';
import Alert from '@/components/Alert';

export default {
  name: 'Appointments',

  components: {
    BatField: Field,
    BatDatePickerInput: DatePickerInput,
    BatTimeInput: TimeInput,
    BatAlert: Alert,
  },

  data() {
    return {
      clinicCache: new Clinic(),
      appointmentCache: new Appointment(),
      appointments: [],
      loadingAppointments: false,
      clinic: null,
      loading: false,
      date: null,
      appointment: null,
      settings: new Settings().load(),
    };
  },

  computed: {
    appointmentSelected() {
      return this.appointment !== null;
    },

    language() {
      const appointments = {
        title: this.settings.language['make-booking'].appointments.title,
        content: this.settings.language['make-booking'].appointments.content,
      }

      if (this.clinic.language['make-booking'].appointments.title !== null) {
        appointments.title = this.clinic.language['make-booking'].appointments.title;
        appointments.content = this.clinic.language['make-booking'].appointments.content;
      }

      return {
        'make-booking': {
          appointments
        }
      }
    }
  },

  watch: {
    date(newDate, oldDate) {
      if (oldDate === null) {
        return;
      }

      this.appointment = null;
    },
  },

  methods: {
    async loadAllAppointments() {
      this.loadingAppointments = true;

      this.appointments = await this.fetchAll('/v1/appointments', {
        'filter[clinic_id]': this.clinicCache.get.id,
        'filter[available]': true,
        'sort': 'start_at',
      });

      if (this.date === null) {
        if (this.appointments.length > 0) {
          this.date = moment(this.appointments[0].start_at, moment.ISO_8601).format(moment.HTML5_FMT.DATE);
        } else {
          this.date = moment().format(moment.HTML5_FMT.DATE);
        }
      }

      this.loadingAppointments = false;
    },

    loadClinic() {
      this.clinic = this.clinicCache.get;
    },

    loadAppointment() {
      const appointment = this.appointmentCache.get;

      if (appointment !== undefined) {
        this.date = moment(appointment.start_at, moment.ISO_8601).format(moment.HTML5_FMT.DATE);
        this.appointment = appointment;
      }
    },

    onNext() {
      // Do nothing if an appointment has not been selected.
      if (!this.appointmentSelected) {
        return;
      }

      // Cache appointment time and route to next page.
      this.appointmentCache.cache(this.appointment);
      this.$router.push({ name: 'make-booking.user-details' });
    },

    onBack() {
      this.appointmentCache.clear();
      this.$router.push({ name: 'make-booking.clinics' });
    },
  },

  filters: {
    fullDate(date) {
      return moment(date, moment.ISO_8601).format('dddd Do MMMM');
    }
  },

  created() {
    this.loadClinic();
    this.loadAppointment();
    this.loadAllAppointments();
  },
};
</script>
