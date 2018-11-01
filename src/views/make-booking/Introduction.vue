<template>
  <div>
    <bat-text-header>
      <h1 class="text-header__title">Book test here</h1>
      <p class="text-header__description sm-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum sem quis aliquet laoreet. Duis blandit luctus nulla vel ullamcorper. Suspendisse eu efficitur justo. Quisque mollis in erat sit amet rhoncus.</p>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'questions' }" primary>Continue</bat-button>
    </bat-content>
  </div>
</template>
