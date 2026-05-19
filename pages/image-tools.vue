<template>
  <section class="container section">
    <ObBlock :ob_info="ob_info" />
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
const ob_info = {
  name: 'image-tools-page',
  file: 'D:\\zhizhouAi\\myproject\\pages\\image-tools.vue'
}

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
