import Vue from 'vue';
import Router from 'vue-router';

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
    },
    {
      path: '/make-booking/clinics',
      name: 'make-booking.clinics',
      component: () => import('@/views/make-booking/Clinics.vue'),
    },
    {
      path: '/make-booking/appointments',
      name: 'make-booking.appointments',
      component: () => import('@/views/make-booking/Appointments.vue'),
    },
    {
      path: '/make-booking/user-details',
      name: 'make-booking.user-details',
      component: () => import('@/views/make-booking/UserDetails.vue'),
    },
    {
      path: '/make-booking/notification',
      name: 'make-booking.notification',
      component: () => import('@/views/make-booking/Notification.vue'),
    },
    {
      path: '/make-booking/overview',
      name: 'make-booking.overview',
      component: () => import('@/views/make-booking/Overview.vue'),
    },
    {
      path: '/make-booking/confirmation',
      name: 'make-booking.confirmation',
      component: () => import('@/views/make-booking/Confirmation.vue'),
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
    },
    {
      path: '/list-bookings/appointments',
      name: 'list-bookings.appointments',
      component: () => import('@/views/list-bookings/Appointments.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
