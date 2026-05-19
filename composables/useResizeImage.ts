import type { ProcessedResult } from '~/types/tool'
import { renderImageToBlob, renameFile, type ImageOutputFormat } from '~/utils/image'

export function useResizeImage() {
  const resizeImages = async (
    files: File[],
    options: {
      width: number | null
      height: number | null
      keepAspectRatio: boolean
      outputFormat: ImageOutputFormat
      quality: number
    }
  ): Promise<ProcessedResult[]> => {
    return Promise.all(files.map(async (file, index) => {
      const source = await loadImageElement(file)
      let width = options.width ?? source.naturalWidth
      let height = options.height ?? source.naturalHeight

      // 保持比例时按产品文档规则处理：只填宽度时算高度，只填高度时算宽度，宽高都填时以宽度为准。
      if (options.keepAspectRatio) {
        const ratio = source.naturalHeight / source.naturalWidth

        if (options.width) {
          width = options.width
          height = Math.round(options.width * ratio)
        } else if (options.height) {
          height = options.height
          width = Math.round(options.height / ratio)
        }
      }

      const image = await renderImageToBlob(file, {
        outputFormat: options.outputFormat,
        quality: options.quality / 100,
        width,
        height
      })

      return {
        id: `${file.name}-${index}-${Date.now()}`,
        fileName: file.name,
        downloadName: renameFile(file.name, '-resized', image.format),
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
    resizeImages
  }
}
