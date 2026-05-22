import type { ProcessedResult } from '~/types/tool'
import { cropImageToBlob, renameFile, type ImageOutputFormat } from '~/utils/image'

export function useCropImage() {
  const cropImage = async (
    file: File,
    options: {
      outputFormat: ImageOutputFormat
      quality: number
      cropXPercent: number
      cropYPercent: number
      cropWidthPercent: number
      cropHeightPercent: number
    }
  ): Promise<ProcessedResult[]> => {
    const image = await cropImageToBlob(file, {
      ...options,
      quality: options.quality / 100
    })

    return [
      {
        id: `${file.name}-cropped-${Date.now()}`,
        fileName: file.name,
        downloadName: renameFile(file.name, '-cropped', image.format),
        originalSize: file.size,
        newSize: image.blob.size,
        outputFormat: image.format.toUpperCase(),
        status: 'success',
        summary: `${image.width} x ${image.height}`,
        blob: image.blob
      }
    ]
  }

  return {
    cropImage
  }
}
