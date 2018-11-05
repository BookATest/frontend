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
Vue.component('BatTextHeaderProgress', () => import('@/components/TextHeaderProgress.vue'));
Vue.component('BatTextHeaderTitle', () => import('@/components/TextHeaderTitle.vue'));
Vue.component('BatTextHeaderDescription', () => import('@/components/TextHeaderDescription.vue'));
Vue.component('BatTextHeaderImage', () => import('@/components/TextHeaderImage.vue'));

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
