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
          @select="setFile"
          @remove="removeFile"
          @move="moveFile"
          @clear="clearFiles"
        />
        <div class="preview-stage">
          <div ref="previewRef" class="image-canvas crop-preview" @pointermove="handleCropPointerMove" @pointerup="stopCropDrag" @pointerleave="stopCropDrag">
            <img v-if="previewUrl" class="crop-preview-image" :src="previewUrl" :alt="files[0]?.name || t(tool.titleKey)">
            <div v-else class="crop-preview-empty">
              {{ t('crop.previewEmpty') }}
            </div>
            <div
              class="crop-box"
              :style="cropBoxStyle"
              @pointerdown.stop="startCropDrag"
            >
              <span class="crop-grid-line" />
              <span class="crop-grid-line" />
            </div>
          </div>
        </div>
        <ResultList :results="results" :tool-key="tool.key" />
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
              @click="setRatio(ratioItem.value)"
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
          <input id="crop-size" v-model.number="cropSize" class="range-input" type="range" min="30" max="100" @input="applyCropSize">
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

type CropRatio = 'free' | '1:1' | '4:3' | '16:9' | '3:4'

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { cropImage } = useCropImage()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('crop-image')
const files = ref<File[]>([])
const results = ref<ProcessedResult[]>([])
const ratio = ref<CropRatio>('free')
const cropSize = ref(72)
const outputFormat = ref<ImageOutputFormat>('same')
const processing = ref(false)
const error = ref('')
const previewUrl = ref('')
const previewRef = ref<HTMLElement | null>(null)
const cropRect = ref({
  x: 14,
  y: 14,
  width: 72,
  height: 50.4
})
const dragState = ref<{
  pointerId: number
  startX: number
  startY: number
  startRectX: number
  startRectY: number
} | null>(null)
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
const cropBoxStyle = computed(() => ({
  left: `${cropRect.value.x}%`,
  top: `${cropRect.value.y}%`,
  width: `${cropRect.value.width}%`,
  height: `${cropRect.value.height}%`
}))

function getRatioValue(value: CropRatio) {
  if (value === '1:1') return 1
  if (value === '4:3') return 4 / 3
  if (value === '16:9') return 16 / 9
  if (value === '3:4') return 3 / 4
  return 1.4
}

function setFile(nextFiles: File[]) {
  files.value = nextFiles.slice(0, 1)
  results.value = []
  error.value = ''
}

function removeFile(index: number) {
  files.value.splice(index, 1)
  results.value = []
}

function clearFiles() {
  files.value = []
  results.value = []
}

function moveFile() {
  // 图片裁剪只处理一张图片，不需要排序；保留这个接口用于复用 FileDropzone。
}

function setRatio(value: CropRatio) {
  ratio.value = value
  applyCropSize()
}

function applyCropSize() {
  const width = cropSize.value
  const height = ratio.value === 'free'
    ? cropSize.value * 0.7
    : Math.min(86, width / getRatioValue(ratio.value))

  cropRect.value = constrainCropRect({
    ...cropRect.value,
    width,
    height
  })
}

function constrainCropRect(rect: typeof cropRect.value) {
  const width = Math.min(100, Math.max(10, rect.width))
  const height = Math.min(100, Math.max(10, rect.height))
  const x = Math.min(100 - width, Math.max(0, rect.x))
  const y = Math.min(100 - height, Math.max(0, rect.y))

  return {
    x,
    y,
    width,
    height
  }
}

function startCropDrag(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  dragState.value = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startRectX: cropRect.value.x,
    startRectY: cropRect.value.y
  }
}

function handleCropPointerMove(event: PointerEvent) {
  if (!dragState.value || !previewRef.value) {
    return
  }

  const bounds = previewRef.value.getBoundingClientRect()
  const deltaX = ((event.clientX - dragState.value.startX) / bounds.width) * 100
  const deltaY = ((event.clientY - dragState.value.startY) / bounds.height) * 100

  cropRect.value = constrainCropRect({
    ...cropRect.value,
    x: dragState.value.startRectX + deltaX,
    y: dragState.value.startRectY + deltaY
  })
}

function stopCropDrag() {
  dragState.value = null
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
    results.value = await cropImage(files.value[0], {
      outputFormat: outputFormat.value,
      quality: 92,
      cropXPercent: cropRect.value.x / 100,
      cropYPercent: cropRect.value.y / 100,
      cropWidthPercent: cropRect.value.width / 100,
      cropHeightPercent: cropRect.value.height / 100
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

watch(
  () => files.value[0],
  (file, previousFile) => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = ''
    }

    if (file) {
      previewUrl.value = URL.createObjectURL(file)
      cropSize.value = 72
      setRatio(ratio.value)
    }

    if (previousFile && previousFile !== file) {
      results.value = []
    }
  }
)

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
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
