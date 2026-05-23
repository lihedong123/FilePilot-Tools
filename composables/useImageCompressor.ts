import type { ProcessedResult } from '~/types/tool'
import { formatBytes, getSavedPercent } from '~/utils/fileSize'
import { renderImageToBlob, renameFile, type ImageOutputFormat } from '~/utils/image'

export function useImageCompressor() {
  const { t } = useLocale()

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
      const shouldKeepOriginal = image.blob.size >= file.size
      const resultBlob = shouldKeepOriginal ? file : image.blob
      const savedPercent = shouldKeepOriginal ? 0 : getSavedPercent(file.size, image.blob.size)

      return {
        id: `${file.name}-${index}-${Date.now()}`,
        fileName: file.name,
        downloadName: shouldKeepOriginal
          ? file.name
          : renameFile(file.name, '-compressed', image.format),
        originalSize: file.size,
        newSize: resultBlob.size,
        savedPercent,
        outputFormat: image.format.toUpperCase(),
        status: shouldKeepOriginal ? 'warning' : 'success',
        summary: shouldKeepOriginal
          ? t('result.imageAlreadyOptimized').replace('{size}', formatBytes(file.size))
          : t('result.savedPercent').replace('{percent}', String(savedPercent)),
        blob: resultBlob
      }
    }))
  }

  return {
    processImages
  }
}
