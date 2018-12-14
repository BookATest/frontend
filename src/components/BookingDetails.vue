<template>
  <div>

    <div class="card card--booking">
      <h3 class="card__title">{{ date }}</h3>
      <h4 class="card_title">{{ time }} {{ meridiem }}</h4>

      <div class="card__details">
        <div class="card__details__item">
          <span>where</span>
          <span>{{ clinic.name }}</span>
        </div>
      </div>
    </div>

    <div class="card card--booking" style="margin: 0 auto 24px;">
      <h3 class="card__title">Your appointment is with:</h3>

      <bat-loader v-if="loading" />
      <div v-else class="card__profile">

        <div class="card__profile__image">
          <img
            :src="user.image_url"
            :alt="`Image of ${user.first_name} ${user.last_name}`"
          >
        </div>

        <div class="card__profile__item">
          <h4>{{ user.first_name }} {{ user.last_name }}</h4>
          <p class="xs-copy" v-if="user.phone || user.email">
            You can contact {{user.first_name}} about your booking via <a v-if="user.email" :href="`mailto:${user.email}`">email</a> <span v-if="user.phone && user.email"> or </span> <a v-if="user.phone" :href="`tel:${user.phone}`">phone</a>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import User from '@/utilities/User';

export default {
  name: 'BookingOverview',

  props: {
    appointment: {
      required: true,
    },

    clinic: {
      required: true,
    },
  },

  data() {
    return {
      userCache: new User(),
      user: null,
      loading: false,
    };
  },

  computed: {
    date() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('dddd Do MMMM');
    },

    time() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('h:mm');
    },

    meridiem() {
      return moment(this.appointment.start_at, moment.ISO_8601).format('a');
    },
  },

  methods: {
    async fetchAppointment() {
      // First, check if the appointment has the user details appended.
      const properties = ['user_first_name', 'user_last_name', 'user_email', 'user_phone'];
      let hasAllProperties = true;
      for (const property of properties) {
        if (!this.appointment.hasOwnProperty(property)) {
          hasAllProperties = false;
        }
      }
      if (hasAllProperties) {
        this.user = {
          id: this.appointment.user_id,
          first_name: this.appointment.user_first_name,
          last_name: this.appointment.user_last_name,
          email: this.appointment.user_email,
          phone: this.appointment.user_phone,
          image_url: `${process.env.VUE_APP_API_URL}/v1/users/${this.appointment.user_id}/profile-picture.jpg`,
        };
        return;
      }

      // Second, attempt to get from cache.
      const user = this.userCache.get;

      if (user !== undefined) {
        this.user = user;
        return;
      }

      // Else, load from the API.
      this.loading = true;

      const response = await this.http.get(`/v1/appointments/${this.appointment.id}`, {
        params: {
          append: 'user_first_name,user_last_name,user_email,user_phone',
        },
      });
      const data = response.data.data;

      this.user = {
        id: data.user_id,
        first_name: data.user_first_name,
        last_name: data.user_last_name,
        email: data.user_email,
        phone: data.user_phone,
        image_url: `${process.env.VUE_APP_API_URL}/v1/users/${data.user_id}/profile-picture.jpg`,
      };
      this.userCache.cache(this.user);

      this.loading = false;
    },
  },

  created() {
    this.fetchAppointment();
  },
};
</script>
