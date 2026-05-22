<template>
  <div>
    <section class="container tool-page-header">
      <NuxtLink class="crumb-link" to="/">{{ t('tool.back') }}</NuxtLink>
      <h1 class="tool-title">{{ t(tool.titleKey) }}</h1>
      <p class="tool-subtitle">{{ t(tool.descriptionKey) }}</p>
    </section>

    <section class="container workspace">
      <div class="work-panel">
        <FileDropzone
          :files="files"
          :accept="tool.accept"
          :multiple="tool.multiple"
          :max-files="tool.maxFiles"
          :max-file-size="tool.maxFileSize"
          :tool-key="tool.key"
          @select="addFiles"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <ResultList :results="results" :tool-key="tool.key" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <div class="control-label">{{ t('tool.targetFormat') }}</div>
          <div class="format-grid">
            <button
              v-for="format in formats"
              :key="format.value"
              class="format-option"
              :class="{ 'is-selected': targetFormat === format.value }"
              type="button"
              @click="targetFormat = format.value"
            >
              {{ format.label }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="quality">
            <span>{{ t('tool.quality') }}</span>
            <span class="control-value">{{ quality }}%</span>
          </label>
          <input id="quality" v-model.number="quality" class="range-input" type="range" min="30" max="100">
        </div>

        <div class="control-group">
          <label class="control-label" for="background">{{ t('tool.background') }}</label>
          <input id="background" v-model="background" class="color-input" type="color">
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>
        <button class="primary-button process-button" type="button" :disabled="processing" @click="handleProcess">
          {{ processing ? t('tool.statusProcessing') : t(tool.actionKey) }}
        </button>
      </aside>
    </section>

    <RelatedTools class="container related-tools" :tool-keys="relatedKeys" />
    <ToolFaq class="container" />
  </div>
</template>

<script setup lang="ts">
import type { ProcessedResult, ToolKey } from '~/types/tool'
import type { ImageOutputFormat } from '~/utils/image'


const { t } = useLocale()
const { getTool } = useToolCatalog()
const { convertImages } = useImageConverter()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('image-converter')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const targetFormat = ref<ImageOutputFormat>('png')
const quality = ref(90)
const background = ref('#ffffff')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['image-compressor', 'resize-image', 'image-to-pdf']

const formats = computed(() => [
  { value: 'same' as const, label: t('tool.same') },
  { value: 'jpg' as const, label: 'JPG' },
  { value: 'png' as const, label: 'PNG' },
  { value: 'webp' as const, label: 'WebP' }
])

function addFiles(nextFiles: File[]) {
  files.value = [...files.value, ...nextFiles].slice(0, tool.maxFiles)
  error.value = ''
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}

function clearFiles() {
  files.value = []
  results.value = []
}

function moveFile(index: number, targetIndex: number) {
  if (targetIndex < 0 || targetIndex >= files.value.length) {
    return
  }

  const nextFiles = [...files.value]
  const [file] = nextFiles.splice(index, 1)
  nextFiles.splice(targetIndex, 0, file)
  files.value = nextFiles
}

async function handleProcess() {
  if (files.value.length === 0) {
    error.value = t('error.chooseFile')
    return
  }

  processing.value = true
  error.value = ''
  trackToolEvent('tool_process_started', { tool_key: tool.key })

  try {
    results.value = await convertImages(files.value, {
      targetFormat: targetFormat.value,
      quality: quality.value,
      background: background.value
    })
    trackToolEvent('tool_process_succeeded', {
      tool_key: tool.key,
      result_count: results.value.length
    })
  } catch {
    error.value = t('error.processing')
    trackToolEvent('tool_process_failed', {
      tool_key: tool.key,
      error_type: 'processing'
    })
  } finally {
    processing.value = false
  }
}

useHead(() => ({
  title: t(tool.seoTitleKey),
  meta: [
    {
      name: 'description',
      content: t(tool.seoDescriptionKey)
    }
  ]
}))
</script>
