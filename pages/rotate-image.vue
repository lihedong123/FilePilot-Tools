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
          :tool-key="tool.key"
          @select="addFiles"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <section v-if="files.length > 0" class="per-file-panel">
          <div class="selected-head">
            <div>
              <h2>{{ t('rotate.perFileTitle') }}</h2>
              <p>{{ t('rotate.perFileCopy') }}</p>
            </div>
          </div>
          <div class="per-file-list">
            <article v-for="(file, index) in files" :key="`${file.name}-${file.size}-${index}`" class="per-file-item">
              <div class="per-file-preview">
                <img
                  class="per-file-image"
                  :src="previewUrls[index]"
                  :alt="file.name"
                  :style="getPreviewStyle(index)"
                >
              </div>
              <div class="per-file-main">
                <strong>{{ file.name }}</strong>
                <span>{{ getFileTransformSummary(index) }}</span>
                <div class="per-file-actions">
                  <button class="format-option" type="button" @click="rotateLeft(index)">{{ t('rotate.left') }}</button>
                  <button class="format-option" type="button" @click="rotateRight(index)">{{ t('rotate.right') }}</button>
                  <button
                    class="format-option"
                    :class="{ 'is-selected': getTransform(index).flipHorizontal }"
                    type="button"
                    @click="toggleFlipHorizontal(index)"
                  >
                    {{ t('rotate.flipHorizontal') }}
                  </button>
                  <button
                    class="format-option"
                    :class="{ 'is-selected': getTransform(index).flipVertical }"
                    type="button"
                    @click="toggleFlipVertical(index)"
                  >
                    {{ t('rotate.flipVertical') }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
        <ResultList :results="results" :tool-key="tool.key" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <p class="settings-copy">{{ t('rotate.settingsCopy') }}</p>
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

type ImageTransform = {
  rotation: 0 | 90 | 180 | 270
  flipHorizontal: boolean
  flipVertical: boolean
}

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { rotateImages } = useRotateImage()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('rotate-image')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const transforms = ref<ImageTransform[]>([])
const previewUrls = ref<string[]>([])
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

function createDefaultTransform(): ImageTransform {
  return {
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false
  }
}

function addFiles(nextFiles: File[]) {
  const remainingSlots = tool.maxFiles - files.value.length
  const acceptedFiles = nextFiles.slice(0, remainingSlots)
  files.value = [...files.value, ...acceptedFiles]
  transforms.value = [...transforms.value, ...acceptedFiles.map(() => createDefaultTransform())]
  previewUrls.value = [...previewUrls.value, ...acceptedFiles.map((file) => URL.createObjectURL(file))]
  error.value = ''
}

function removeFile(index: number) {
  URL.revokeObjectURL(previewUrls.value[index])
  files.value.splice(index, 1)
  transforms.value.splice(index, 1)
  previewUrls.value.splice(index, 1)
}

function clearFiles() {
  previewUrls.value.forEach((url) => URL.revokeObjectURL(url))
  files.value = []
  transforms.value = []
  previewUrls.value = []
  results.value = []
}

function moveFile(index: number, targetIndex: number) {
  if (targetIndex < 0 || targetIndex >= files.value.length) {
    return
  }

  const nextFiles = [...files.value]
  const nextTransforms = [...transforms.value]
  const nextPreviewUrls = [...previewUrls.value]
  const [file] = nextFiles.splice(index, 1)
  const [transform] = nextTransforms.splice(index, 1)
  const [previewUrl] = nextPreviewUrls.splice(index, 1)
  nextFiles.splice(targetIndex, 0, file)
  nextTransforms.splice(targetIndex, 0, transform)
  nextPreviewUrls.splice(targetIndex, 0, previewUrl)
  files.value = nextFiles
  transforms.value = nextTransforms
  previewUrls.value = nextPreviewUrls
}

function getTransform(index: number) {
  return transforms.value[index] || createDefaultTransform()
}

function rotateLeft(index: number) {
  const transform = getTransform(index)
  transforms.value[index] = {
    ...transform,
    rotation: ((transform.rotation + 270) % 360) as ImageTransform['rotation']
  }
}

function rotateRight(index: number) {
  const transform = getTransform(index)
  transforms.value[index] = {
    ...transform,
    rotation: ((transform.rotation + 90) % 360) as ImageTransform['rotation']
  }
}

function toggleFlipHorizontal(index: number) {
  const transform = getTransform(index)
  transforms.value[index] = {
    ...transform,
    flipHorizontal: !transform.flipHorizontal
  }
}

function toggleFlipVertical(index: number) {
  const transform = getTransform(index)
  transforms.value[index] = {
    ...transform,
    flipVertical: !transform.flipVertical
  }
}

function getPreviewStyle(index: number) {
  const transform = getTransform(index)

  return {
    transform: `rotate(${transform.rotation}deg) scale(${transform.flipHorizontal ? -1 : 1}, ${transform.flipVertical ? -1 : 1})`
  }
}

function getFileTransformSummary(index: number) {
  const transform = getTransform(index)
  const flips = [
    transform.flipHorizontal ? t('rotate.flipHorizontal') : '',
    transform.flipVertical ? t('rotate.flipVertical') : ''
  ].filter(Boolean)

  return `${transform.rotation}deg${flips.length ? ` / ${flips.join(' / ')}` : ''}`
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
    const resultGroups = await Promise.all(files.value.map((file, index) => {
      const transform = getTransform(index)

      return rotateImages([file], {
        outputFormat: outputFormat.value,
        quality: 92,
        rotation: transform.rotation,
        flipHorizontal: transform.flipHorizontal,
        flipVertical: transform.flipVertical
      })
    }))
    results.value = resultGroups.flat()
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

onBeforeUnmount(() => {
  previewUrls.value.forEach((url) => URL.revokeObjectURL(url))
})

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
