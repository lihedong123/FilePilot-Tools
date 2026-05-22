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
        <p class="settings-copy">{{ t('pdfCompress.notice') }}</p>
        <div class="control-group">
          <div class="control-label">{{ t('pdfCompress.level') }}</div>
          <div class="format-grid">
            <button
              v-for="item in levels"
              :key="item.value"
              class="format-option"
              :class="{ 'is-selected': level === item.value }"
              type="button"
              @click="level = item.value"
            >
              {{ item.label }}
            </button>
          </div>
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

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { compressPdf } = useCompressPdf()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('compress-pdf')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const level = ref<'low' | 'medium' | 'high'>('medium')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['merge-pdf', 'split-pdf', 'pdf-to-images', 'image-to-pdf']

const levels = computed(() => [
  { value: 'low' as const, label: t('pdfCompress.low') },
  { value: 'medium' as const, label: t('pdfCompress.medium') },
  { value: 'high' as const, label: t('pdfCompress.high') }
])

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
  // 单文件 PDF 压缩不需要调整顺序；保留这个函数是为了继续复用 FileDropzone 的统一事件接口。
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
    results.value = await compressPdf(files.value[0], {
      level: level.value
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
