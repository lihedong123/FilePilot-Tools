<template>
  <footer class="footer">
    <div class="footer-inner">
      <span>{{ t('footer.prototype') }}</span>
      <span>{{ t('footer.copy') }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">

const { t } = useLocale()
</script>
