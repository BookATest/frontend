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
      name: 'introduction',
      component: () => import('@/views/make-booking/Introduction.vue'),
    },
    {
      path: '/make-booking/questions',
      name: 'questions',
      component: () => import('@/views/make-booking/Questions.vue'),
    },
    {
      path: '/make-booking/location',
      name: 'location',
      component: () => import('@/views/make-booking/Location.vue'),
    },
    {
      path: '/make-booking/clinics',
      name: 'clinics',
      component: () => import('@/views/make-booking/Clinics.vue'),
    },
    {
      path: '/make-booking/appointments',
      name: 'appointments',
      component: () => import('@/views/make-booking/Appointments.vue'),
    },
    {
      path: '/make-booking/user-details',
      name: 'user-details',
      component: () => import('@/views/make-booking/UserDetails.vue'),
    },
    {
      path: '/make-booking/notification',
      name: 'notification',
      component: () => import('@/views/make-booking/Notification.vue'),
    },
    {
      path: '/make-booking/overview',
      name: 'overview',
      component: () => import('@/views/make-booking/Overview.vue'),
    },
    {
      path: '/make-booking/confirmation',
      name: 'confirmation',
      component: () => import('@/views/make-booking/Confirmation.vue'),
    },
    {
      path: '/list-bookings/phone-number',
      name: 'phone-number',
      component: () => import('@/views/list-bookings/PhoneNumber.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
