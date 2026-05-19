<template>
  <div class="notice">
    <ShieldCheck :size="18" />
    <span>{{ t('tool.localNotice') }}</span>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'

const { t } = useLocale()

</script>
