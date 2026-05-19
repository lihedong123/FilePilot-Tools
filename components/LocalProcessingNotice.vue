<template>
  <div class="notice">
    <ObBlock :ob_info="ob_info" />
    <ShieldCheck :size="18" />
    <span>{{ t('tool.localNotice') }}</span>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'

const { t } = useLocale()

const ob_info = {
  name: 'local-processing-notice',
  file: 'D:\\zhizhouAi\\myproject\\components\\LocalProcessingNotice.vue'
}
</script>
