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
          @select="setFile"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <div class="preview-stage">
          <div class="image-canvas">
            <div class="crop-box" :style="cropBoxStyle">
              <span class="crop-grid-line" />
              <span class="crop-grid-line" />
            </div>
          </div>
        </div>
        <ResultList :results="results" />
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>
        <div class="control-group">
          <div class="control-label">{{ t('crop.ratio') }}</div>
          <div class="format-grid">
            <button
              v-for="ratioItem in ratios"
              :key="ratioItem.value"
              class="format-option"
              :class="{ 'is-selected': ratio === ratioItem.value }"
              type="button"
              @click="ratio = ratioItem.value"
            >
              {{ ratioItem.label }}
            </button>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="crop-size">
            <span>{{ t('crop.size') }}</span>
            <span class="control-value">{{ cropSize }}%</span>
          </label>
          <input id="crop-size" v-model.number="cropSize" class="range-input" type="range" min="30" max="100">
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
const { cropImage } = useCropImage()
const tool = getTool('crop-image')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const ratio = ref<'free' | '1:1' | '4:3' | '16:9' | '3:4'>('free')
const cropSize = ref(72)
const outputFormat = ref<ImageOutputFormat>('same')
const processing = ref(false)
const error = ref('')
const relatedKeys: ToolKey[] = ['resize-image', 'rotate-image', 'image-compressor']

const ratios = computed(() => [
  { value: 'free' as const, label: t('crop.free') },
  { value: '1:1' as const, label: '1:1' },
  { value: '4:3' as const, label: '4:3' },
  { value: '16:9' as const, label: '16:9' },
  { value: '3:4' as const, label: '3:4' }
])
const formats = computed(() => [
  { value: 'same' as const, label: t('tool.same') },
  { value: 'jpg' as const, label: 'JPG' },
  { value: 'png' as const, label: 'PNG' },
  { value: 'webp' as const, label: 'WebP' }
])
const cropBoxStyle = computed(() => {
  const width = cropSize.value
  const height = ratio.value === 'free'
    ? cropSize.value * 0.7
    : Math.min(86, width / getRatioValue(ratio.value))

  return {
    width: `${width}%`,
    height: `${height}%`,
    left: `${(100 - width) / 2}%`,
    top: `${(100 - height) / 2}%`
  }
})

function getRatioValue(value: typeof ratio.value) {
  if (value === '1:1') return 1
  if (value === '4:3') return 4 / 3
  if (value === '16:9') return 16 / 9
  if (value === '3:4') return 3 / 4
  return 1.4
}

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
  // 图片裁剪只处理一张图片，不需要排序；保留这个接口用于复用 FileDropzone。
}

async function handleProcess() {
  if (files.value.length === 0) {
    error.value = t('error.chooseFile')
    return
  }

  const widthPercent = Number.parseFloat(cropBoxStyle.value.width) / 100
  const heightPercent = Number.parseFloat(cropBoxStyle.value.height) / 100

  processing.value = true
  error.value = ''

  try {
    results.value = await cropImage(files.value[0], {
      outputFormat: outputFormat.value,
      quality: 92,
      cropXPercent: (1 - widthPercent) / 2,
      cropYPercent: (1 - heightPercent) / 2,
      cropWidthPercent: widthPercent,
      cropHeightPercent: heightPercent
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
