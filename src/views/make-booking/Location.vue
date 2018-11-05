<template>
  <div>
    <bat-text-header>
      <bat-text-header-progress :active="1" />
      <bat-text-header-title>Find location</bat-text-header-title>
      <bat-text-header-description small>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum.
      </bat-text-header-description>
    </bat-text-header>

    <bat-content>
      <bat-button :to="{ name: 'questions' }" primary>Continue</bat-button>
    </bat-content>
  </div>
</template>
