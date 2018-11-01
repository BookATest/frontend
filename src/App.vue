<template>
  <div id="app">

    <bat-header :hide="hideHeader"/>

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

  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  components: {
    BatHeader: Header,
  },
  computed: {
    hideHeader() {
      return this.$route.name === 'home';
    },
    contentClass() {
      return {
        'page--no-footer': this.$route.name === 'home',
      };
    },
  },
};
</script>
