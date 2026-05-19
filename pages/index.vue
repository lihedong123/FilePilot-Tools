<template>
  <div>
    <section class="container hero">
      <div>
        <p class="eyebrow">
          <span class="status-dot" />
          {{ t('home.eyebrow') }}
        </p>
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-copy">{{ t('home.copy') }}</p>
        <div class="hero-actions">
          <NuxtLink class="primary-button" to="/image-compressor">
            {{ t('home.compressCta') }}
          </NuxtLink>
          <NuxtLink class="secondary-button" to="/image-converter">
            {{ t('home.convertCta') }}
          </NuxtLink>
          <NuxtLink class="secondary-button" to="/image-to-pdf">
            {{ t('home.imageToPdfCta') }}
          </NuxtLink>
        </div>
      </div>

      <aside class="quick-panel">
        <div class="panel-head">
          <div>
            <h2>{{ t('home.quickTitle') }}</h2>
            <p>{{ t('home.quickCopy') }}</p>
          </div>
          <span class="privacy-badge">{{ t('home.localBadge') }}</span>
        </div>
        <div class="mini-upload">
          <div>
            <strong>{{ t('home.dropImages') }}</strong>
            <span>{{ t('home.previewFormats') }}</span>
          </div>
        </div>
        <div class="mock-file-list">
          <div class="mock-file">
            <div>
              <strong>photo-large.jpg</strong>
              <span>2.4 MB -> 840 KB</span>
            </div>
            <span class="saving">65%</span>
          </div>
          <div class="mock-file">
            <div>
              <strong>graphic.png</strong>
              <span>1.2 MB -> 480 KB</span>
            </div>
            <span class="saving">60%</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="container section">
      <div class="section-title-row">
        <h2>{{ t('home.popularTitle') }}</h2>
        <p>{{ t('home.popularCopy') }}</p>
      </div>
      <div class="tool-grid">
        <ToolCard v-for="tool in tools" :key="tool.key" :tool="tool" />
      </div>
      <div class="trust-strip">
        {{ t('home.trustCopy') }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { tools } = useToolCatalog()

useHead(() => ({
  title: t('seo.homeTitle'),
  meta: [
    {
      name: 'description',
      content: t('seo.homeDescription')
    }
  ]
}))
</script>
