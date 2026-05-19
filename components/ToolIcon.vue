<template>
  <span class="tool-icon" aria-hidden="true">
    <Minimize2 v-if="icon === 'compress'" :size="24" />
    <RefreshCw v-else-if="icon === 'convert'" :size="24" />
    <FileImage v-else-if="icon === 'image-pdf'" :size="24" />
    <Files v-else-if="icon === 'merge-pdf'" :size="24" />
    <SplitSquareHorizontal v-else-if="icon === 'split-pdf'" :size="24" />
    <Scaling v-else-if="icon === 'resize'" :size="24" />
    <FileText v-else :size="24" />
  </span>
</template>

<script setup lang="ts">
import {
  FileImage,
  FileText,
  Files,
  Minimize2,
  RefreshCw,
  Scaling,
  SplitSquareHorizontal
} from 'lucide-vue-next'

defineProps<{
  icon: string
}>()
</script>
