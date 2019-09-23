// Import polyfills.
import '@babel/polyfill';

// Import styling.
import '@/styles/main.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import http from './http';
import VueAnalytics from 'vue-analytics';
import MarkdownConverter from '@/classes/MarkdownConverter';

// Only use Google Analytics if ID is in the environment.
if (process.env.VUE_APP_GOOGLE_ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    router,
  });
}

Vue.mixin({
  data(): object {
    return {
      http,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },

  methods: {
    async fetchAll(uri: string, params: object = {}) {
      const page: number = 1;
      const perPage: number = 100;
      const mergedParams = { ...params, page, per_page: perPage };
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

    toHtml(markdown) {
      return MarkdownConverter.toHtml(markdown);
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
