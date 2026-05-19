<template>
  <section class="container section">
    <div class="section-title-row">
      <div>
        <NuxtLink class="crumb-link" to="/">{{ t('category.backHome') }}</NuxtLink>
        <h1>{{ t('category.imageTitle') }}</h1>
      </div>
      <p>{{ t('category.imageCopy') }}</p>
    </div>
    <div class="tool-grid">
      <ToolCard v-for="tool in imageTools" :key="tool.key" :tool="tool" />
    </div>
  </section>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { imageTools } = useToolCatalog()

useHead(() => ({
  title: t('seo.imageCategoryTitle'),
  meta: [
    {
      name: 'description',
      content: t('seo.imageCategoryDescription')
    }
  ]
}))
</script>
