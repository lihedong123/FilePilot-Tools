<template>
  <section class="container section">
    <div class="section-title-row">
      <div>
        <NuxtLink class="crumb-link" to="/">{{ t('category.backHome') }}</NuxtLink>
        <h1>{{ t('allTools.title') }}</h1>
      </div>
      <p>{{ t('allTools.copy') }}</p>
    </div>

    <div class="tool-category-stack">
      <section v-for="group in groups" :key="group.titleKey" class="tool-category-block">
        <div class="category-head">
          <h2>{{ t(group.titleKey) }}</h2>
          <span>{{ group.tools.length }}</span>
        </div>
        <div class="tool-grid">
          <ToolCard v-for="tool in group.tools" :key="tool.key" :tool="tool" />
        </div>
      </section>
    </div>

    <div class="trust-strip">
      {{ t('home.trustCopy') }}
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
const { imageTools, pdfTools, qrTools, tools } = useToolCatalog()

const groups = computed(() => [
  {
    titleKey: 'allTools.popular',
    tools: tools.slice(0, 6)
  },
  {
    titleKey: 'allTools.image',
    tools: imageTools
  },
  {
    titleKey: 'allTools.pdf',
    tools: pdfTools
  },
  {
    titleKey: 'allTools.qr',
    tools: qrTools
  }
])

useHead(() => ({
  title: t('seo.allToolsTitle'),
  meta: [
    {
      name: 'description',
      content: t('seo.allToolsDescription')
    }
  ]
}))
</script>
