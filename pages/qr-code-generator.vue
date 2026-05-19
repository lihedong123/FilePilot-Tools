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
          <label class="control-label" for="qr-content">{{ t('qr.contentLabel') }}</label>
          <textarea
            id="qr-content"
            v-model="content"
            class="textarea-input"
            rows="7"
            :placeholder="t('qr.contentPlaceholder')"
            @input="error = ''"
          />
          <p class="support-line">{{ t('qr.contentHelp') }}</p>
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
                <span>{{ size }}px · PNG · {{ formatBytes(result.blob.size) }}</span>
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
const tool = getTool('qr-code-generator')
const content = ref('https://filepilot.tools')
const size = ref(512)
const foreground = ref('#111827')
const background = ref('#ffffff')
const margin = ref(2)
const processing = ref(false)
const error = ref('')
const result = ref<QrCodeResult | null>(null)

async function handleGenerate() {
  const value = content.value.trim()

  if (!value) {
    error.value = t('qr.contentRequired')
    return
  }

  processing.value = true
  error.value = ''

  try {
    result.value = await generateQrCode(value, {
      size: size.value,
      foreground: foreground.value,
      background: background.value,
      margin: margin.value
    })
  } catch {
    error.value = t('qr.generateFailed')
  } finally {
    processing.value = false
  }
}

function handleDownload() {
  if (result.value) {
    downloadBlob(result.value.blob, result.value.fileName)
  }
}

watch([content, size, foreground, background, margin], () => {
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
