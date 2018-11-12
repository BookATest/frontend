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

const appointmentCache = new Appointment();
const clinicCache = new Clinic();
const userDetailsCache = new UserDetails();
const locationCache = new Location();
const userCache = new User();
const answersCache = new Answers();

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/make-booking/introduction',
      name: 'make-booking.introduction',
      component: () => import('@/views/make-booking/Introduction.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/questions',
      name: 'make-booking.questions',
      component: () => import('@/views/make-booking/Questions.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/location',
      name: 'make-booking.location',
      component: () => import('@/views/make-booking/Location.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/clinics',
      name: 'make-booking.clinics',
      component: () => import('@/views/make-booking/Clinics.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/appointments',
      name: 'make-booking.appointments',
      component: () => import('@/views/make-booking/Appointments.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/user-details',
      name: 'make-booking.user-details',
      component: () => import('@/views/make-booking/UserDetails.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/consent',
      name: 'make-booking.consent',
      component: () => import('@/views/make-booking/Consent.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/overview',
      name: 'make-booking.overview',
      component: () => import('@/views/make-booking/Overview.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/make-booking/confirmation',
      name: 'make-booking.confirmation',
      component: () => import('@/views/make-booking/Confirmation.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/access-code',
      name: 'list-bookings.access-code',
      component: () => import('@/views/list-bookings/AccessCode.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/token',
      name: 'list-bookings.token',
      component: () => import('@/views/list-bookings/Token.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/appointments',
      name: 'list-bookings.appointments',
      component: () => import('@/views/list-bookings/Appointments.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/appointments/:appointment/cancel',
      name: 'list-bookings.cancel',
      component: () => import('@/views/list-bookings/Cancel.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/appointments/cancelled',
      name: 'list-bookings.cancelled',
      component: () => import('@/views/list-bookings/Cancelled.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/list-bookings/token-expired',
      name: 'list-bookings.token-expired',
      component: () => import('@/views/list-bookings/TokenExpired.vue'),
      beforeEnter: (to, from, next) => {
        next();
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // If not on home page but settings are not cached.
  if (to.name !== 'home' && !Settings.isCached) {
    next({ name: 'home' });
  }

  next();
});

export default router;
