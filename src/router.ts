import Vue from 'vue';
import Router from 'vue-router';

// Caches.
import Settings from '@/utilities/Settings';
import Appointment from '@/utilities/Appointment';
import Clinic from '@/utilities/Clinic';
import UserDetails from '@/utilities/UserDetails';
import Location from '@/utilities/Location';
import User from '@/utilities/User';
import Answers from '@/utilities/Answers';
import Token from '@/utilities/Token';
import ServiceUser from '@/utilities/ServiceUser';
import Phone from '@/utilities/Phone';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      beforeEnter: (to, from, next) => {
        // Clear all caches.
        new Appointment().clear();
        new Clinic().clear();
        new UserDetails().clear();
        new Location().clear();
        new User().clear();
        new Answers().clear();
        new Token().clear();
        new ServiceUser().clear();

        return next();
      },
    },
    {
      path: '/make-booking/introduction',
      name: 'make-booking.introduction',
      component: () => import('@/views/make-booking/Introduction.vue'),
    },
    {
      path: '/make-booking/questions',
      name: 'make-booking.questions',
      component: () => import('@/views/make-booking/Questions.vue'),
    },
    {
      path: '/make-booking/location',
      name: 'make-booking.location',
      component: () => import('@/views/make-booking/Location.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/clinics',
      name: 'make-booking.clinics',
      component: () => import('@/views/make-booking/Clinics.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/appointments',
      name: 'make-booking.appointments',
      component: () => import('@/views/make-booking/Appointments.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();
        const clinicCache = new Clinic();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        if (clinicCache.get === undefined) {
          return next({ name: 'make-booking.clinics' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/user-details',
      name: 'make-booking.user-details',
      component: () => import('@/views/make-booking/UserDetails.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();
        const clinicCache = new Clinic();
        const appointmentCache = new Appointment();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        if (clinicCache.get === undefined) {
          return next({ name: 'make-booking.clinics' });
        }

        if (appointmentCache.get === undefined) {
          return next({ name: 'make-booking.appointments' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/consent',
      name: 'make-booking.consent',
      component: () => import('@/views/make-booking/Consent.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();
        const clinicCache = new Clinic();
        const appointmentCache = new Appointment();
        const userDetailsCache = new UserDetails();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        if (clinicCache.get === undefined) {
          return next({ name: 'make-booking.clinics' });
        }

        if (appointmentCache.get === undefined) {
          return next({ name: 'make-booking.appointments' });
        }

        if (userDetailsCache.get === undefined) {
          return next({ name: 'make-booking.user-details' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/overview',
      name: 'make-booking.overview',
      component: () => import('@/views/make-booking/Overview.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();
        const clinicCache = new Clinic();
        const appointmentCache = new Appointment();
        const userDetailsCache = new UserDetails();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        if (clinicCache.get === undefined) {
          return next({ name: 'make-booking.clinics' });
        }

        if (appointmentCache.get === undefined) {
          return next({ name: 'make-booking.appointments' });
        }

        if (userDetailsCache.get === undefined) {
          return next({ name: 'make-booking.user-details' });
        }

        return next();
      },
    },
    {
      path: '/make-booking/confirmation',
      name: 'make-booking.confirmation',
      component: () => import('@/views/make-booking/Confirmation.vue'),
      beforeEnter: (to, from, next) => {
        const answersCache = new Answers();
        const locationCache = new Location();
        const clinicCache = new Clinic();
        const appointmentCache = new Appointment();
        const userDetailsCache = new UserDetails();
        const userCache = new User();

        if (answersCache.all === undefined) {
          return next({ name: 'make-booking.questions' });
        }

        if (locationCache.getCoordinate === undefined && locationCache.getPostcode === undefined) {
          return next({ name: 'make-booking.location' });
        }

        if (clinicCache.get === undefined) {
          return next({ name: 'make-booking.clinics' });
        }

        if (appointmentCache.get === undefined) {
          return next({ name: 'make-booking.appointments' });
        }

        if (userDetailsCache.get === undefined) {
          return next({ name: 'make-booking.user-details' });
        }

        if (userCache.get === undefined) {
          return next({ name: 'make-booking.overview' });
        }

        if (appointmentCache.get.service_user_id === null) {
          return next({ name: 'make-booking.overview' });
        }

        return next();
      },
    },
    {
      path: '/list-bookings/access-code',
      name: 'list-bookings.access-code',
      component: () => import('@/views/list-bookings/AccessCode.vue'),
    },
    {
      path: '/list-bookings/token',
      name: 'list-bookings.token',
      component: () => import('@/views/list-bookings/Token.vue'),
      beforeEnter: (to, from, next) => {
        const phoneCache = new Phone();

        if (phoneCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        return next();
      },
    },
    {
      path: '/list-bookings/appointments',
      name: 'list-bookings.appointments',
      component: () => import('@/views/list-bookings/Appointments.vue'),
      beforeEnter: (to, from, next) => {
        const tokenCache = new Token();
        const serviceUserCache = new ServiceUser();

        if (tokenCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        if (serviceUserCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        return next();
      },
    },
    {
      path: '/list-bookings/appointments/:appointment/cancel',
      name: 'list-bookings.cancel',
      component: () => import('@/views/list-bookings/Cancel.vue'),
      beforeEnter: (to, from, next) => {
        const tokenCache = new Token();
        const serviceUserCache = new ServiceUser();

        if (tokenCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        if (serviceUserCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        return next();
      },
    },
    {
      path: '/list-bookings/appointments/cancelled',
      name: 'list-bookings.cancelled',
      component: () => import('@/views/list-bookings/Cancelled.vue'),
      beforeEnter: (to, from, next) => {
        const tokenCache = new Token();
        const serviceUserCache = new ServiceUser();

        if (tokenCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        if (serviceUserCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        return next();
      },
    },
    {
      path: '/list-bookings/token-expired',
      name: 'list-bookings.token-expired',
      component: () => import('@/views/list-bookings/TokenExpired.vue'),
      beforeEnter: (to, from, next) => {
        const tokenCache = new Token();
        const serviceUserCache = new ServiceUser();

        if (tokenCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        if (serviceUserCache.get === undefined) {
          return next({ name: 'list-bookings.access-code' });
        }

        return next();
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // If not on home page but settings are not cached.
  if (to.name !== 'home' && !Settings.isCached) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
