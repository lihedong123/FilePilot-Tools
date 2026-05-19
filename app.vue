<template>
  <div class="app-shell">
    <ObBlock :ob_info="ob_info" />
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const ob_info = {
  name: 'app-root',
  file: 'D:\\zhizhouAi\\myproject\\app.vue'
}
</script>
