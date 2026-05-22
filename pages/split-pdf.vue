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
          <label class="control-label" for="page-range">{{ t('tool.pageRange') }}</label>
          <input id="page-range" v-model="pageRange" class="text-input" type="text" placeholder="1-3,8,10-12">
        </div>
        <div class="control-group">
          <label class="control-label" for="output-name">{{ t('tool.outputName') }}</label>
          <input id="output-name" v-model="outputName" class="text-input" type="text">
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
const { splitPdf } = useSplitPdf()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('split-pdf')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const pageRange = ref('all')
const outputName = ref('split.pdf')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['merge-pdf', 'pdf-to-images', 'compress-pdf']

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
  // 单文件工具不需要调整顺序；保留这个事件处理是为了复用 FileDropzone 的统一组件接口。
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
    results.value = await splitPdf(files.value[0], {
      pageRange: pageRange.value,
      outputName: outputName.value
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
