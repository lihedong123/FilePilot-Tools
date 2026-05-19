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
          @select="addFiles"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <p v-if="files.length > 1" class="notice">{{ t('tool.dragHint') }}</p>
        <ResultList :results="results" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <label class="control-label" for="page-size">{{ t('tool.pageSize') }}</label>
          <select id="page-size" v-model="pageSize" class="select-input">
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </select>
        </div>

        <div class="control-group">
          <div class="control-label">{{ t('tool.orientation') }}</div>
          <div class="format-grid">
            <button
              v-for="item in orientations"
              :key="item.value"
              class="format-option"
              :class="{ 'is-selected': orientation === item.value }"
              type="button"
              @click="orientation = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="margin">
            <span>{{ t('tool.margin') }}</span>
            <span class="control-value">{{ margin }} mm</span>
          </label>
          <input id="margin" v-model.number="margin" class="range-input" type="range" min="0" max="30">
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>
        <button class="primary-button process-button" type="button" :disabled="processing" @click="handleProcess">
          {{ processing ? t('tool.statusProcessing') : t(tool.actionKey) }}
        </button>
      </aside>
    </section>

    <ToolFaq class="container" />
  </div>
</template>

<script setup lang="ts">
import type { ProcessedResult } from '~/types/tool'
import type { PdfPageSizeName } from '~/utils/pdf'


const { t } = useLocale()
const { getTool } = useToolCatalog()
const { createPdf } = useImageToPdf()
const tool = getTool('image-to-pdf')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const pageSize = ref<PdfPageSizeName>('A4')
const orientation = ref<'auto' | 'portrait' | 'landscape'>('auto')
const margin = ref(10)
const processing = ref(false)
const error = ref('')

const orientations = computed(() => [
  { value: 'auto' as const, label: t('tool.orientationAuto') },
  { value: 'portrait' as const, label: t('tool.orientationPortrait') },
  { value: 'landscape' as const, label: t('tool.orientationLandscape') }
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

function moveFile(index: number, direction: -1 | 1) {
  const targetIndex = index + direction

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

  try {
    results.value = await createPdf(files.value, {
      pageSize: pageSize.value,
      orientation: orientation.value,
      margin: margin.value
    })
  } catch {
    error.value = t('error.processing')
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
