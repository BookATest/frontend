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

  methods: {
    async fetchAll(uri: string, params: object = {}) {
      let page: number = 1;
      let perPage: number = 100;
      let mergedParams = { ...params, page, per_page: perPage };
      let allFetched: boolean = false;
      let resources: any = [];

      do {
        const { data } = await http.get(uri, { params: mergedParams });
        resources = [...resources, ...data.data];
        allFetched = data.meta.current_page === data.meta.last_page;
        mergedParams.page++;
      } while (!allFetched);

      return resources;
    },
  },
});

Vue.component('BatButton', () => import('@/components/Button.vue'));
Vue.component('BatContent', () => import('@/components/Content.vue'));
Vue.component('BatContentFooter', () => import('@/components/ContentFooter.vue'));
Vue.component('BatIcon', () => import('@/components/Icon.vue'));
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
