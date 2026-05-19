<template>
  <div>
    <ObBlock :ob_info="ob_info" />
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
        <ResultList :results="results" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <label class="control-label" for="width">{{ t('tool.width') }}</label>
          <input id="width" v-model.number="width" class="text-input" type="number" min="1" placeholder="1200">
        </div>
        <div class="control-group">
          <label class="control-label" for="height">{{ t('tool.height') }}</label>
          <input id="height" v-model.number="height" class="text-input" type="number" min="1" placeholder="800">
        </div>
        <div class="control-group">
          <label class="control-label" for="keep-ratio">
            <span>{{ t('tool.keepAspectRatio') }}</span>
            <input id="keep-ratio" v-model="keepAspectRatio" type="checkbox">
          </label>
        </div>
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
import type { ImageOutputFormat } from '~/utils/image'

const ob_info = {
  name: 'resize-image-page',
  file: 'D:\\zhizhouAi\\myproject\\pages\\resize-image.vue'
}

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { resizeImages } = useResizeImage()
const tool = getTool('resize-image')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const width = ref<number | null>(null)
const height = ref<number | null>(null)
const keepAspectRatio = ref(true)
const outputFormat = ref<ImageOutputFormat>('same')
const processing = ref(false)
const error = ref('')

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
    results.value = await resizeImages(files.value, {
      width: width.value || null,
      height: height.value || null,
      keepAspectRatio: keepAspectRatio.value,
      outputFormat: outputFormat.value,
      quality: 90
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
