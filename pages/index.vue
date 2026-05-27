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
        <div
          class="mini-upload"
          :class="{ 'is-dragging': isDragging }"
          role="button"
          tabindex="0"
          @click="quickInputRef?.click()"
          @keydown.enter.prevent="quickInputRef?.click()"
          @keydown.space.prevent="quickInputRef?.click()"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleQuickDrop"
        >
          <div>
            <strong>{{ t('home.dropImages') }}</strong>
            <span>{{ t('home.previewFormats') }}</span>
            <input
              ref="quickInputRef"
              class="file-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              @change="handleQuickInput"
            >
            <p v-if="quickError" class="error-text">{{ quickError }}</p>
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
const { getFileTypeGroup, trackToolEvent } = useToolAnalytics()
const router = useRouter()
const quickInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const quickError = ref('')
const quickCompressFiles = useState<File[]>('filepilot-home-compress-files', () => [])
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp']

function openCompressorWithFiles(fileList: FileList | File[]) {
  const files = Array.from(fileList)
  const imageFiles = files.filter((file) => acceptedImageTypes.includes(file.type))

  if (imageFiles.length === 0) {
    quickError.value = t('home.quickUnsupported')
    return
  }

  // The homepage only carries valid image files into the image compressor; actual compression still runs on the tool page.
  quickCompressFiles.value = imageFiles.slice(0, 20)
  trackToolEvent('tool_file_selected', {
    tool_key: 'image-compressor',
    file_count: quickCompressFiles.value.length,
    file_type_group: getFileTypeGroup(quickCompressFiles.value)
  })
  quickError.value = ''
  router.push('/image-compressor')
}

function handleQuickDrop(event: DragEvent) {
  isDragging.value = false

  if (event.dataTransfer?.files) {
    openCompressorWithFiles(event.dataTransfer.files)
  }
}

function handleQuickInput(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files) {
    openCompressorWithFiles(target.files)
    target.value = ''
  }
}

usePageSeo({
  titleKey: 'seo.homeTitle',
  descriptionKey: 'seo.homeDescription',
  path: '/',
  schemaType: 'WebSite'
})
</script>

