<template>
  <section class="container section">
    <div class="section-title-row">
      <div>
        <NuxtLink class="crumb-link" to="/">{{ t('category.backHome') }}</NuxtLink>
        <h1>{{ t('category.pdfTitle') }}</h1>
      </div>
      <p>{{ t('category.pdfCopy') }}</p>
    </div>
    <div class="tool-grid">
      <ToolCard v-for="tool in pdfTools" :key="tool.key" :tool="tool" />
    </div>
  </section>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { pdfTools } = useToolCatalog()

usePageSeo({
  titleKey: 'seo.pdfCategoryTitle',
  descriptionKey: 'seo.pdfCategoryDescription',
  path: '/pdf-tools',
  schemaType: 'CollectionPage'
})
</script>

