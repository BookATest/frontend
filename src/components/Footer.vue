<template>
  <footer class="footer">
    <div class="flex-container flex-container--align-center">
      <div class="footer__brand flex-col flex-col--3 mobile-hide">
        <router-link :to="{ name: 'home' }">
          <img src="/assets/dist/img/brand-logo.png" alt="Brand Logo">
        </router-link>
      </div>

      <div class="footer__contact flex-col flex-col--6 text-center">
        <p class="xs-copy">If you experience any issues with the booking system, please contact:</p>
        <p class="xs-copy"><a href="mailto:contact@loation.com">contact@loation.com</a> <a href="tel:0773087345">0773087345</a></p>
      </div>

      <div class="footer__powered flex-col flex-col--3 text-center mobile-hide">
        <h5 class="footer__powered__title">Powered by</h5>
        <img src="@/assets/logo.svg" alt="BookATest.hiv">
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
