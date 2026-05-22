import type { ProcessedResult } from '~/types/tool'
import { renameFile, transformImageToBlob, type ImageOutputFormat } from '~/utils/image'

export function useRotateImage() {
  const rotateImages = async (
    files: File[],
    options: {
      outputFormat: ImageOutputFormat
      quality: number
      rotation: 0 | 90 | 180 | 270
      flipHorizontal: boolean
      flipVertical: boolean
    }
  ): Promise<ProcessedResult[]> => {
    return Promise.all(files.map(async (file, index) => {
      const image = await transformImageToBlob(file, {
        ...options,
        quality: options.quality / 100
      })

      return {
        id: `${file.name}-${index}-rotated-${Date.now()}`,
        fileName: file.name,
        downloadName: renameFile(file.name, '-rotated', image.format),
        originalSize: file.size,
        newSize: image.blob.size,
        outputFormat: image.format.toUpperCase(),
        status: 'success',
        summary: `${image.width} x ${image.height}`,
        blob: image.blob
      }
    }))
  }

  return {
    rotateImages
  }
}
