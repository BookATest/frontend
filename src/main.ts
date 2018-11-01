// Import styling.
import '@/styles/main.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import http from './http';

Vue.mixin({
  data(): object {
    return {
      http,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
});

Vue.component('BatButton', () => import('@/components/Button.vue'));
Vue.component('BatContent', () => import('@/components/Content.vue'));
Vue.component('BatLoader', () => import('@/components/Loader.vue'));
Vue.component('BatTextHeader', () => import('@/components/TextHeader.vue'));

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
