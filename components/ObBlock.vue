<template>
  <span class="ob-block" :data-ob-name="ob_info.name" :data-ob-file="ob_info.file" aria-hidden="true" />
</template>

<script setup lang="ts">
defineProps<{
  ob_info: {
    name: string
    file: string
  }
}>()
</script>

<style scoped>
.ob-block {
  display: none;
}
</style>
