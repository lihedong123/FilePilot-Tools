<template>
  <section class="result-panel">
    <div class="result-head">
      <div>
        <h2>{{ t('tool.result') }}</h2>
        <span>{{ results.length > 0 ? t('tool.statusDone') : t('tool.emptyResult') }}</span>
      </div>
    </div>

    <div v-if="results.length === 0" class="empty-result">
      {{ t('tool.emptyResult') }}
    </div>

    <table v-else class="result-table">
      <thead>
        <tr>
          <th>{{ t('tool.file') }}</th>
          <th>{{ t('tool.original') }}</th>
          <th>{{ t('tool.newSize') }}</th>
          <th>{{ t('tool.summary') }}</th>
          <th>{{ t('tool.download') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.id">
          <td>{{ result.fileName }}</td>
          <td>{{ result.originalSize ? formatBytes(result.originalSize) : '-' }}</td>
          <td>{{ result.newSize ? formatBytes(result.newSize) : '-' }}</td>
          <td>
            <span :class="result.savedPercent && result.savedPercent > 0 ? 'saving' : 'muted-text'">
              {{ result.summary }}
            </span>
          </td>
          <td>
            <button
              class="download-button"
              type="button"
              :disabled="!result.blob"
              @click="download(result)"
            >
              {{ t('tool.download') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="results.length > 0" class="mobile-results">
      <article v-for="result in results" :key="`${result.id}-mobile`" class="mobile-result-card">
        <strong>{{ result.fileName }}</strong>
        <span v-if="result.originalSize && result.newSize">
          {{ formatBytes(result.originalSize) }} -> {{ formatBytes(result.newSize) }}
        </span>
        <span>{{ result.summary }}</span>
        <button
          class="download-button"
          type="button"
          :disabled="!result.blob"
          @click="download(result)"
        >
          {{ t('tool.download') }}
        </button>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProcessedResult } from '~/types/tool'
import { formatBytes } from '~/utils/fileSize'

defineProps<{
  results: ProcessedResult[]
}>()


const { t } = useLocale()
const { downloadBlob } = useDownloadFile()

function download(result: ProcessedResult) {
  if (result.blob) {
    downloadBlob(result.blob, result.downloadName)
  }
}
</script>
