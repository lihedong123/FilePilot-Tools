<template>
  <section>
    <div class="section-title-row compact-title-row">
      <h2>{{ t('tool.relatedTitle') }}</h2>
      <p>{{ t('tool.relatedCopy') }}</p>
    </div>
    <div class="tool-grid">
      <ToolCard v-for="tool in relatedTools" :key="tool.key" :tool="tool" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ToolKey } from '~/types/tool'

const props = defineProps<{
  toolKeys: ToolKey[]
}>()

const { t } = useLocale()
const { getTool } = useToolCatalog()
const relatedTools = computed(() => props.toolKeys.map((key) => getTool(key)))
</script>
