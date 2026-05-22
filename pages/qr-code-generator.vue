<template>
  <div>
    <section class="container tool-page-header">
      <NuxtLink class="crumb-link" to="/">{{ t('tool.back') }}</NuxtLink>
      <h1 class="tool-title">{{ t(tool.titleKey) }}</h1>
      <p class="tool-subtitle">{{ t(tool.descriptionKey) }}</p>
    </section>

    <section class="container workspace">
      <div class="work-panel">
        <div class="qr-input-panel">
          <div class="control-label">{{ t('qr.inputModeLabel') }}</div>
          <div class="format-grid qr-mode-grid">
            <button
              class="format-option"
              :class="{ 'is-selected': inputMode === 'text' }"
              type="button"
              @click="setInputMode('text')"
            >
              {{ t('qr.textMode') }}
            </button>
            <button
              class="format-option"
              :class="{ 'is-selected': inputMode === 'image' }"
              type="button"
              @click="setInputMode('image')"
            >
              {{ t('qr.imageMode') }}
            </button>
          </div>

          <template v-if="inputMode === 'text'">
            <label class="control-label" for="qr-content">{{ t('qr.contentLabel') }}</label>
            <textarea
              id="qr-content"
              v-model="content"
              class="textarea-input"
              rows="7"
              :placeholder="t('qr.contentPlaceholder')"
              @input="error = ''"
            />
          </template>

          <template v-else>
            <label class="control-label" for="qr-image">{{ t('qr.imageLabel') }}</label>
            <input
              id="qr-image"
              ref="imageInputRef"
              class="file-input"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              @change="handleImageSelect"
            >
            <button class="secondary-button qr-upload-button" type="button" @click="imageInputRef?.click()">
              {{ imageFile ? t('qr.changeImage') : t('qr.chooseImage') }}
            </button>

            <div v-if="imageFile" class="qr-image-file">
              <span class="file-chip">{{ imageExtension }}</span>
              <div class="selected-file-main">
                <strong>{{ imageFile.name }}</strong>
                <span>
                  {{ formatBytes(imageFile.size) }}
                  <template v-if="imageContentSize"> / {{ t('qr.encodedSize') }} {{ imageContentSize }}</template>
                </span>
              </div>
              <button class="ghost-button compact-button" type="button" @click="clearImage">
                {{ t('tool.remove') }}
              </button>
            </div>
          </template>

          <p class="support-line">{{ inputMode === 'text' ? t('qr.contentHelp') : t('qr.imageHelp') }}</p>
        </div>

        <LocalProcessingNotice />

        <section class="result-panel">
          <div class="result-head">
            <div>
              <h2>{{ t('qr.previewTitle') }}</h2>
              <span>{{ result ? t('tool.statusDone') : t('qr.emptyPreview') }}</span>
            </div>
          </div>

          <div class="qr-preview-area">
            <div v-if="result" class="qr-preview-card">
              <img class="qr-preview-image" :src="result.dataUrl" :alt="t('qr.previewAlt')">
              <div class="qr-preview-meta">
                <strong>{{ result.fileName }}</strong>
                <span>{{ size }}px / PNG / {{ formatBytes(result.blob.size) }}</span>
              </div>
            </div>
            <div v-else class="qr-empty-card">
              <span class="qr-empty-icon">
                <QrCode :size="54" />
              </span>
              <span>{{ t('qr.emptyPreview') }}</span>
            </div>
          </div>
        </section>
      </div>

      <aside class="settings-panel">
        <h2>{{ t('tool.settings') }}</h2>

        <div class="control-group">
          <label class="control-label" for="qr-size">
            <span>{{ t('qr.sizeLabel') }}</span>
            <span class="control-value">{{ size }}px</span>
          </label>
          <input id="qr-size" v-model.number="size" class="range-input" type="range" min="256" max="1024" step="64">
        </div>

        <div class="control-group">
          <label class="control-label" for="qr-foreground">{{ t('qr.foregroundLabel') }}</label>
          <input id="qr-foreground" v-model="foreground" class="color-input" type="color">
        </div>

        <div class="control-group">
          <label class="control-label" for="qr-background">{{ t('qr.backgroundLabel') }}</label>
          <input id="qr-background" v-model="background" class="color-input" type="color">
        </div>

        <div class="control-group">
          <label class="control-label" for="qr-margin">
            <span>{{ t('qr.marginLabel') }}</span>
            <span class="control-value">{{ margin }}</span>
          </label>
          <input id="qr-margin" v-model.number="margin" class="range-input" type="range" min="0" max="8">
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>
        <button class="primary-button process-button" type="button" :disabled="processing" @click="handleGenerate">
          {{ processing ? t('tool.statusProcessing') : t(tool.actionKey) }}
        </button>
        <button
          class="secondary-button process-button"
          type="button"
          :disabled="!result"
          @click="handleDownload"
        >
          {{ t('qr.downloadPng') }}
        </button>
      </aside>
    </section>

    <ToolFaq class="container" />
  </div>
</template>

<script setup lang="ts">
import { QrCode } from 'lucide-vue-next'
import type { QrCodeResult } from '~/composables/useQrCodeGenerator'
import { formatBytes } from '~/utils/fileSize'

const { t } = useLocale()
const { getTool } = useToolCatalog()
const { generateQrCode } = useQrCodeGenerator()
const { downloadBlob } = useDownloadFile()
const { trackToolEvent } = useToolAnalytics()
const tool = getTool('qr-code-generator')
const inputMode = ref<'text' | 'image'>('text')
const content = ref('https://filepilot.tools')
const imageInputRef = ref<HTMLInputElement | null>(null)
const imageFile = ref<File | null>(null)
const imageContent = ref('')
const size = ref(512)
const foreground = ref('#111827')
const background = ref('#ffffff')
const margin = ref(2)
const processing = ref(false)
const error = ref('')
const result = ref<QrCodeResult | null>(null)
const imageContentSize = computed(() => (imageContent.value ? formatBytes(imageContent.value.length) : ''))

const imageExtension = computed(() => {
  const extension = imageFile.value?.name.split('.').pop()

  return extension ? extension.slice(0, 4).toUpperCase() : 'IMG'
})

const imageQrMaxContentLength = 2400
const imageQrSizes = [96, 72, 56, 40, 32]
const imageQrQualities = [0.72, 0.56, 0.42, 0.3, 0.22]

function setInputMode(mode: 'text' | 'image') {
  inputMode.value = mode
  error.value = ''
  result.value = null
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }
    image.src = objectUrl
  })
}

function getFittedImageSize(image: HTMLImageElement, maxSize: number) {
  const width = image.naturalWidth || image.width
  const height = image.naturalHeight || image.height
  const ratio = Math.min(maxSize / width, maxSize / height, 1)

  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio))
  }
}

async function createImageQrContent(file: File): Promise<string> {
  const image = await loadImageFromFile(file)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available')
  }

  const candidates: string[] = []

  for (const maxSize of imageQrSizes) {
    const fittedSize = getFittedImageSize(image, maxSize)
    canvas.width = fittedSize.width
    canvas.height = fittedSize.height
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    for (const quality of imageQrQualities) {
      candidates.push(canvas.toDataURL('image/webp', quality))
      candidates.push(canvas.toDataURL('image/jpeg', quality))
    }
  }

  const bestCandidate = candidates
    .filter((candidate) => candidate.startsWith('data:image/'))
    .sort((first, second) => first.length - second.length)
    .find((candidate) => candidate.length <= imageQrMaxContentLength)

  if (!bestCandidate) {
    throw new Error('Image content is too large for one QR code')
  }

  return bestCandidate
}

async function handleImageSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    error.value = t('error.unsupported')
    target.value = ''
    return
  }

  try {
    imageFile.value = file
    imageContent.value = await createImageQrContent(file)
    trackToolEvent('tool_file_selected', {
      tool_key: tool.key,
      file_count: 1,
      file_type_group: 'image'
    })
    result.value = null
    error.value = ''
  } catch {
    error.value = t('qr.imagePrepareFailed')
  } finally {
    target.value = ''
  }
}

function clearImage() {
  imageFile.value = null
  imageContent.value = ''
  result.value = null
  error.value = ''
}

async function handleGenerate() {
  const value = inputMode.value === 'text' ? content.value.trim() : imageContent.value

  if (!value) {
    error.value = inputMode.value === 'text' ? t('qr.contentRequired') : t('qr.imageRequired')
    return
  }

  processing.value = true
  error.value = ''
  trackToolEvent('tool_process_started', { tool_key: tool.key })

  try {
    result.value = await generateQrCode(value, {
      size: size.value,
      foreground: foreground.value,
      background: background.value,
      margin: margin.value,
      errorCorrectionLevel: inputMode.value === 'image' ? 'L' : 'M'
    })
    trackToolEvent('tool_process_succeeded', {
      tool_key: tool.key,
      result_count: 1
    })
  } catch {
    error.value = inputMode.value === 'image' ? t('qr.imageGenerateFailed') : t('qr.generateFailed')
    trackToolEvent('tool_process_failed', {
      tool_key: tool.key,
      error_type: inputMode.value === 'image' ? 'image_generate' : 'text_generate'
    })
  } finally {
    processing.value = false
  }
}

function handleDownload() {
  if (result.value) {
    downloadBlob(result.value.blob, result.value.fileName)
    trackToolEvent('tool_result_downloaded', { tool_key: tool.key })
  }
}

watch([content, imageContent, size, foreground, background, margin, inputMode], () => {
  if (result.value) {
    result.value = null
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
