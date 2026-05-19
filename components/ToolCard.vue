<template>
  <NuxtLink class="tool-card" :to="tool.href">
    <ObBlock :ob_info="ob_info" />
    <ToolIcon :icon="tool.icon" />
    <h3>{{ t(tool.titleKey) }}</h3>
    <p>{{ t(tool.cardDescriptionKey) }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ToolInfo } from '~/types/tool'

defineProps<{
  tool: ToolInfo
}>()

const { t } = useLocale()

const ob_info = {
  name: 'tool-card',
  file: 'D:\\zhizhouAi\\myproject\\components\\ToolCard.vue'
}
</script>
