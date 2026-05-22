<template>
  <div>
    <section class="container tool-page-header">
      <NuxtLink class="crumb-link" to="/image-tools">{{ t('category.backImage') }}</NuxtLink>
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
        <div class="preview-stage">
          <div
            class="image-canvas rotate-sample"
            :style="{ transform: `rotate(${rotation}deg) scale(${flipHorizontal ? -1 : 1}, ${flipVertical ? -1 : 1})` }"
          />
        </div>
        <ResultList :results="results" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <div class="format-grid">
            <button class="format-option" type="button" @click="rotateLeft">{{ t('rotate.left') }}</button>
            <button class="format-option" type="button" @click="rotateRight">{{ t('rotate.right') }}</button>
            <button
              class="format-option"
              :class="{ 'is-selected': flipHorizontal }"
              type="button"
              @click="flipHorizontal = !flipHorizontal"
            >
              {{ t('rotate.flipHorizontal') }}
            </button>
            <button
              class="format-option"
              :class="{ 'is-selected': flipVertical }"
              type="button"
              @click="flipVertical = !flipVertical"
            >
              {{ t('rotate.flipVertical') }}
            </button>
          </div>
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

    <RelatedTools class="container related-tools" :tool-keys="relatedKeys" />
    <ToolFaq class="container" />
  </div>
</template>

<script setup lang="ts">
import type { ProcessedResult, ToolKey } from '~/types/tool'
import type { ImageOutputFormat } from '~/utils/image'

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { rotateImages } = useRotateImage()
const tool = getTool('rotate-image')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const rotation = ref<0 | 90 | 180 | 270>(90)
const flipHorizontal = ref(false)
const flipVertical = ref(false)
const outputFormat = ref<ImageOutputFormat>('same')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['crop-image', 'resize-image', 'image-converter']

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

function rotateLeft() {
  rotation.value = ((rotation.value + 270) % 360) as typeof rotation.value
}

function rotateRight() {
  rotation.value = ((rotation.value + 90) % 360) as typeof rotation.value
}

async function handleProcess() {
  if (files.value.length === 0) {
    error.value = t('error.chooseFile')
    return
  }

  processing.value = true
  error.value = ''

  try {
    results.value = await rotateImages(files.value, {
      outputFormat: outputFormat.value,
      quality: 92,
      rotation: rotation.value,
      flipHorizontal: flipHorizontal.value,
      flipVertical: flipVertical.value
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
