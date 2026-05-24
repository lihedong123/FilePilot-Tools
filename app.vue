<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      id: 'LA_COLLECT',
      src: 'https://sdk.51.la/js-sdk-pro.min.js'
    },
    {
      // Keep the install snippet in the same shape as 51la provides, so its dashboard detector can recognize it.
      innerHTML: 'LA.init({id:"3Q1UejfAH5jOa1gt",ck:"3Q1UejfAH5jOa1gt",hashMode:true})'
    }
  ]
})
</script>
