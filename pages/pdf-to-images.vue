<template>
  <div>
    <section class="container tool-page-header">
      <NuxtLink class="crumb-link" to="/pdf-tools">{{ t('category.backPdf') }}</NuxtLink>
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
          @select="setFile"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <ResultList :results="results" :tool-key="tool.key" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <div class="control-label">{{ t('tool.outputFormat') }}</div>
          <div class="format-grid">
            <button
              v-for="format in formats"
              :key="format.value"
              class="format-option"
              :class="{ 'is-selected': outputFormat === format.value }"
              type="button"
              @click="outputFormat = format.value"
            >
              {{ format.label }}
            </button>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="page-range">{{ t('tool.pageRange') }}</label>
          <input id="page-range" v-model="pageRange" class="text-input" type="text" placeholder="all or 1-3,5">
        </div>
        <div class="control-group">
          <label class="control-label" for="quality">
            <span>{{ t('tool.quality') }}</span>
            <span class="control-value">{{ quality }}%</span>
          </label>
          <input id="quality" v-model.number="quality" class="range-input" type="range" min="60" max="100">
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>
        <button class="primary-button process-button" type="button" :disabled="processing" @click="handleProcess">
          {{ processing ? t('tool.statusProcessing') : t(tool.actionKey) }}
        </button>
      </aside>
    </section>

    <RelatedTools class="container related-tools" :tool-keys="relatedKeys" />
    <ToolFaq class="container" :tool-key="tool.key" />
  </div>
</template>

<script setup lang="ts">
import type { ProcessedResult, ToolKey } from '~/types/tool'

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { convertPdfToImages } = usePdfToImages()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('pdf-to-images')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const outputFormat = ref<'jpg' | 'png'>('jpg')
const pageRange = ref('all')
const quality = ref(90)
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['image-to-pdf', 'split-pdf', 'compress-pdf']

const formats = [
  { value: 'jpg' as const, label: 'JPG' },
  { value: 'png' as const, label: 'PNG' }
]

function setFile(nextFiles: File[]) {
  files.value = nextFiles.slice(0, 1)
  error.value = ''
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}

function clearFiles() {
  files.value = []
  results.value = []
}

function moveFile() {
  // Single-file PDF rendering does not use ordering; this keeps FileDropzone on one shared event API.
}

async function handleProcess() {
  if (files.value.length === 0) {
    error.value = t('error.chooseOnePdf')
    return
  }

  processing.value = true
  error.value = ''
  trackToolEvent('tool_process_started', { tool_key: tool.key })

  try {
    results.value = await convertPdfToImages(files.value[0], {
      outputFormat: outputFormat.value,
      quality: quality.value,
      pageRange: pageRange.value
    })
    trackToolEvent('tool_process_succeeded', {
      tool_key: tool.key,
      result_count: results.value.length
    })
  } catch {
    error.value = t('error.pageRange')
    trackToolEvent('tool_process_failed', {
      tool_key: tool.key,
      error_type: 'page_range'
    })
  } finally {
    processing.value = false
  }
}

useToolSeo(tool)
</script>

