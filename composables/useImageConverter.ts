import type { ProcessedResult } from '~/types/tool'
import { renderImageToBlob, renameFile, type ImageOutputFormat } from '~/utils/image'

export function useImageConverter() {
  const convertImages = async (
    files: File[],
    options: {
      targetFormat: ImageOutputFormat
      quality: number
      background: string
    }
  ): Promise<ProcessedResult[]> => {
    const qualityRatio = options.quality / 100

    return Promise.all(files.map(async (file, index) => {
      const image = await renderImageToBlob(file, {
        outputFormat: options.targetFormat,
        quality: qualityRatio,
        background: options.background
      })

      return {
        id: `${file.name}-${index}-${Date.now()}`,
        fileName: file.name,
        downloadName: renameFile(file.name, '-converted', image.format),
        originalSize: file.size,
        newSize: image.blob.size,
        outputFormat: image.format.toUpperCase(),
        status: 'success',
        summary: `Converted to ${image.format.toUpperCase()}`,
        blob: image.blob
      }
    }))
  }

  return {
    convertImages
  }
}
