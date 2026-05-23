<template>
  <div>
    <section class="container tool-page-header">
      <NuxtLink class="crumb-link" to="/tools">{{ t('tool.back') }}</NuxtLink>
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
        <p v-if="files.length > 1" class="notice">{{ t('tool.dragHint') }}</p>
        <ResultList :results="results" :tool-key="tool.key" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
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
const { mergePdfs } = useMergePdf()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('merge-pdf')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const outputName = ref('merged.pdf')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['split-pdf', 'compress-pdf', 'pdf-to-images']

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
  if (files.value.length < 2) {
    error.value = t('error.chooseTwoPdf')
    return
  }

  processing.value = true
  error.value = ''
  trackToolEvent('tool_process_started', { tool_key: tool.key })

  try {
    results.value = await mergePdfs(files.value, {
      outputName: outputName.value
    })
    trackToolEvent('tool_process_succeeded', {
      tool_key: tool.key,
      result_count: results.value.length
    })
  } catch {
    error.value = t('error.pdfRead')
    trackToolEvent('tool_process_failed', {
      tool_key: tool.key,
      error_type: 'pdf_read'
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
