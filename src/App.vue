<template>
  <div id="app">

    <bat-header :hide="hideHeader" />

    <main
      id="content"
      class="page flex-container flex-container--align-center flex-container--justify"
      :class="contentClass"
      role="main"
    >
      <div class="page__wrapper">
        <div class="v-align">

          <router-view/>

        </div>
      </div>
    </main>

    <bat-footer v-if="!hideFooter" />

  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  components: {
    BatHeader: Header,
    BatFooter: Footer,
  },
  computed: {
    isHome() {
      return this.$route.name === 'home'
    },
    hideHeader() {
      return this.isHome;
    },
    hideFooter() {
      return this.isHome;
    },
    contentClass() {
      return {
        'page--no-footer': this.isHome,
      };
    },
  },
};
</script>
