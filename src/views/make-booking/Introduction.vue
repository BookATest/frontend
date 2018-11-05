<template>
  <div>
    <bat-text-header>
      <bat-text-header-title>Book test here</bat-text-header-title>
      <bat-text-header-description small>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum sem quis aliquet laoreet.
        Duis blandit luctus nulla vel ullamcorper. Suspendisse eu efficitur justo.
        Quisque mollis in erat sit amet rhoncus.
      </bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'questions' }" primary>Continue</bat-button>
    </bat-content>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
};
</script>
