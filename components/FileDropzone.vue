<template>
  <section
    class="dropzone"
    :class="{ 'is-dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <ObBlock :ob_info="ob_info" />
    <UploadCloud class="drop-icon" :size="38" />
    <h2>{{ title || t('tool.dropTitle') }}</h2>
    <p>{{ description || t('tool.dropCopy') }}</p>
    <p class="support-line">{{ t('tool.supportedFormats') }}: {{ supportLabel }}</p>
    <input
      ref="inputRef"
      class="file-input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleInput"
    >
    <button class="secondary-button" type="button" @click="inputRef?.click()">
      <FolderOpen :size="18" />
      {{ buttonText || t('tool.chooseFiles') }}
    </button>
    <p v-if="error" class="error-text">{{ error }}</p>
  </section>

  <LocalProcessingNotice />

  <section v-if="files.length > 0" class="selected-panel">
    <div class="selected-head">
      <div>
        <h2>{{ t('tool.selectedFiles') }}</h2>
        <p>{{ files.length }} {{ files.length === 1 ? 'file' : 'files' }}</p>
      </div>
      <button class="ghost-button compact-button" type="button" @click="$emit('clear')">
        {{ t('tool.clear') }}
      </button>
    </div>

    <ul class="selected-list">
      <li v-for="(file, index) in files" :key="`${file.name}-${file.size}-${index}`" class="selected-item">
        <span class="file-chip">{{ formatExtension(file.name) }}</span>
        <div class="selected-file-main">
          <strong>{{ file.name }}</strong>
          <span>{{ formatBytes(file.size) }}</span>
        </div>
        <div class="file-actions">
          <button
            v-if="files.length > 1"
            class="icon-button"
            type="button"
            :aria-label="t('tool.moveUp')"
            :disabled="index === 0"
            @click="$emit('move', index, -1)"
          >
            <ArrowUp :size="16" />
          </button>
          <button
            v-if="files.length > 1"
            class="icon-button"
            type="button"
            :aria-label="t('tool.moveDown')"
            :disabled="index === files.length - 1"
            @click="$emit('move', index, 1)"
          >
            <ArrowDown :size="16" />
          </button>
          <button class="icon-button danger" type="button" :aria-label="t('tool.remove')" @click="$emit('remove', index)">
            <Trash2 :size="16" />
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp, FolderOpen, Trash2, UploadCloud } from 'lucide-vue-next'
import { formatBytes } from '~/utils/fileSize'

const props = defineProps<{
  files: File[]
  accept: string
  multiple: boolean
  maxFiles: number
  maxFileSize: number
  title?: string
  description?: string
  buttonText?: string
}>()

const emit = defineEmits<{
  select: [files: File[]]
  remove: [index: number]
  move: [index: number, direction: -1 | 1]
  clear: []
}>()

const ob_info = {
  name: 'file-dropzone',
  file: 'D:\\zhizhouAi\\myproject\\components\\FileDropzone.vue'
}

const { t } = useLocale()
const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref('')

const supportLabel = computed(() => {
  return props.accept
    .split(',')
    .map((item) => item.replace('image/', '').replace('application/', '').replace('jpeg', 'jpg').toUpperCase())
    .join(', ')
})

function formatExtension(fileName: string) {
  const extension = fileName.split('.').pop()
  return extension ? extension.slice(0, 4).toUpperCase() : 'FILE'
}

function acceptsFile(file: File) {
  const accepted = props.accept.split(',').map((item) => item.trim())

  return accepted.some((item) => {
    if (item.endsWith('/*')) {
      return file.type.startsWith(item.replace('/*', '/'))
    }

    return file.type === item
  })
}

function filterFiles(fileList: FileList | File[]) {
  error.value = ''
  const incoming = Array.from(fileList)
  const filtered: File[] = []

  for (const file of incoming) {
    if (!acceptsFile(file)) {
      error.value = t('error.unsupported')
      continue
    }

    if (file.size > props.maxFileSize) {
      error.value = t('error.tooLarge')
      continue
    }

    filtered.push(file)
  }

  const nextFiles = props.multiple ? filtered.slice(0, props.maxFiles) : filtered.slice(0, 1)

  if (nextFiles.length > 0) {
    emit('select', nextFiles)
  }
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files) {
    filterFiles(target.files)
    target.value = ''
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false

  if (event.dataTransfer?.files) {
    filterFiles(event.dataTransfer.files)
  }
}
</script>
