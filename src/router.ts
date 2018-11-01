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
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
