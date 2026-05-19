<template>
  <NuxtLink class="tool-card" :to="tool.href">
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

</script>
