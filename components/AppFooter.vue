<template>
  <footer class="footer">
    <ObBlock :ob_info="ob_info" />
    <div class="footer-inner">
      <span>{{ t('footer.prototype') }}</span>
      <span>{{ t('footer.copy') }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const ob_info = {
  name: 'app-footer',
  file: 'D:\\zhizhouAi\\myproject\\components\\AppFooter.vue'
}

const { t } = useLocale()
</script>
