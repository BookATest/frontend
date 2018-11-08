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
      <div v-else class="card__details">

        <div class="card__details__item">
          <span>name</span>
          <span>{{ user.first_name }} {{ user.last_name }}</span>
        </div>

        <div v-if="user.email" class="card__details__item">
          <span>email</span>
          <span>{{ user.email }}</span>
        </div>

        <div v-if="user.phone" class="card__details__item">
          <span>phone</span>
          <span>{{ user.phone }}</span>
        </div>

        <div class="card__details__item">
          <span>image</span>
          <img
            :src="user.image_url"
            :alt="`Image of ${user.first_name} ${user.last_name}`"
            style="display: inline-block; max-width: 25%; border-radius: 100%; vertical-align: text-top;"
          >
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

    userDetails: {
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
