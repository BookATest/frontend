// Import styling.
import '@/styles/main.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.mixin({
  data(): object {
    return {
      $http: import('@/http'),
    };
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
