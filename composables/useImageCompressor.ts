import type { ProcessedResult } from '~/types/tool'
import { formatBytes, getSavedPercent } from '~/utils/fileSize'
import { renderImageToBlob, renameFile, type ImageOutputFormat } from '~/utils/image'

export function useImageCompressor() {
  const processImages = async (
    files: File[],
    options: {
      quality: number
      outputFormat: ImageOutputFormat
    }
  ): Promise<ProcessedResult[]> => {
    const qualityRatio = options.quality / 100

    return Promise.all(files.map(async (file, index) => {
      const image = await renderImageToBlob(file, {
        outputFormat: options.outputFormat,
        quality: qualityRatio
      })
      const savedPercent = getSavedPercent(file.size, image.blob.size)

      return {
        id: `${file.name}-${index}-${Date.now()}`,
        fileName: file.name,
        downloadName: renameFile(file.name, '-compressed', image.format),
        originalSize: file.size,
        newSize: image.blob.size,
        savedPercent,
        outputFormat: image.format.toUpperCase(),
        status: 'success',
        summary: savedPercent > 0
          ? `${savedPercent}% saved`
          : `New file is ${formatBytes(image.blob.size)}`,
        blob: image.blob
      }
    }))
  }

  return {
    processImages
  }
}
