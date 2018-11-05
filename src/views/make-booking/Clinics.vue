<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title>Find location</bat-text-header-title>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'questions' }" disabled>Select location</bat-button>
      <bat-button :to="{ name: 'location' }" back>Back</bat-button>
    </bat-content>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
};
</script>
