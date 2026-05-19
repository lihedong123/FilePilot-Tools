export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function getSavedPercent(originalSize: number, newSize: number): number {
  if (originalSize <= 0) {
    return 0
  }

  return Math.round(((originalSize - newSize) / originalSize) * 100)
}
