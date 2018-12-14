<template>
  <footer class="footer">
    <div class="flex-container flex-container--align-center">
      <div class="footer__brand flex-col flex-col--3 mobile-hide">
        <router-link :to="{ name: 'home' }">
          <img :src="`${apiUrl}/v1/settings/logo.png`" alt="Brand Logo">
        </router-link>
      </div>

      <div class="footer__contact flex-col flex-col--6 text-center">
        <p class="xs-copy">Please get in touch if you have any problems booking a test</p>
        <p class="xs-copy"><a :href="`mailto:${settings.email}`">{{ settings.email }}</a> <a :href="`tel:${settings.phone}`">{{ settings.phone }}</a></p>
      </div>

      <div class="footer__powered flex-col flex-col--3 text-center mobile-hide">
        <h5 class="footer__powered__title">Powered by</h5>
        <img src="@/assets/img/logo.svg" alt="BookATest.hiv">
      </div>
    </div>
  </footer>
</template>

<script>
import Settings from '@/utilities/Settings';

export default {
  name: 'Footer',

  data() {
    return {
      settings: new Settings().load(),
    };
  },
};
</script>
