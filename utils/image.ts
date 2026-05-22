export type ImageOutputFormat = 'same' | 'jpg' | 'png' | 'webp'

export type CanvasImageResult = {
  blob: Blob
  width: number
  height: number
  format: Exclude<ImageOutputFormat, 'same'>
}

export function getFileExtension(fileName: string): string {
  const match = fileName.toLowerCase().match(/\.([a-z0-9]+)$/)
  return match ? match[1] : ''
}

export function getImageFormat(file: File, outputFormat: ImageOutputFormat): Exclude<ImageOutputFormat, 'same'> {
  if (outputFormat !== 'same') {
    return outputFormat
  }

  const extension = getFileExtension(file.name)

  if (extension === 'png' || extension === 'webp') {
    return extension
  }

  return 'jpg'
}

export function getImageMimeType(format: Exclude<ImageOutputFormat, 'same'>): string {
  return format === 'jpg' ? 'image/jpeg' : `image/${format}`
}

export function renameFile(fileName: string, suffix: string, extension: string): string {
  const cleanName = fileName.replace(/\.[^.]+$/, '')
  return `${cleanName}${suffix}.${extension === 'jpg' ? 'jpg' : extension}`
}

export function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to read image'))
    }

    image.src = url
  })
}

export async function renderImageToBlob(
  file: File,
  options: {
    outputFormat: ImageOutputFormat
    quality: number
    width?: number
    height?: number
    background?: string
  }
): Promise<CanvasImageResult> {
  const image = await loadImageElement(file)
  const format = getImageFormat(file, options.outputFormat)
  const width = options.width ?? image.naturalWidth
  const height = options.height ?? image.naturalHeight
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available')
  }

  canvas.width = width
  canvas.height = height

  // JPG 不支持透明背景，所以在转 JPG 时先铺一层背景色，避免透明区域被浏览器处理成黑色。
  if (format === 'jpg') {
    context.fillStyle = options.background ?? '#ffffff'
    context.fillRect(0, 0, width, height)
  }

  context.drawImage(image, 0, 0, width, height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('Failed to create image blob'))
        }
      },
      getImageMimeType(format),
      options.quality
    )
  })

  return {
    blob,
    width,
    height,
    format
  }
}

export async function cropImageToBlob(
  file: File,
  options: {
    outputFormat: ImageOutputFormat
    quality: number
    cropXPercent: number
    cropYPercent: number
    cropWidthPercent: number
    cropHeightPercent: number
    background?: string
  }
): Promise<CanvasImageResult> {
  const image = await loadImageElement(file)
  const format = getImageFormat(file, options.outputFormat)
  const sourceX = Math.round(image.naturalWidth * options.cropXPercent)
  const sourceY = Math.round(image.naturalHeight * options.cropYPercent)
  const sourceWidth = Math.round(image.naturalWidth * options.cropWidthPercent)
  const sourceHeight = Math.round(image.naturalHeight * options.cropHeightPercent)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available')
  }

  canvas.width = sourceWidth
  canvas.height = sourceHeight

  // JPG 不支持透明背景，所以裁剪后导出 JPG 时先铺底色，避免透明区域被浏览器处理成黑色。
  if (format === 'jpg') {
    context.fillStyle = options.background ?? '#ffffff'
    context.fillRect(0, 0, sourceWidth, sourceHeight)
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    sourceWidth,
    sourceHeight
  )

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('Failed to create cropped image blob'))
        }
      },
      getImageMimeType(format),
      options.quality
    )
  })

  return {
    blob,
    width: sourceWidth,
    height: sourceHeight,
    format
  }
}

export async function transformImageToBlob(
  file: File,
  options: {
    outputFormat: ImageOutputFormat
    quality: number
    rotation: 0 | 90 | 180 | 270
    flipHorizontal: boolean
    flipVertical: boolean
    background?: string
  }
): Promise<CanvasImageResult> {
  const image = await loadImageElement(file)
  const format = getImageFormat(file, options.outputFormat)
  const isQuarterTurn = options.rotation === 90 || options.rotation === 270
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available')
  }

  canvas.width = isQuarterTurn ? image.naturalHeight : image.naturalWidth
  canvas.height = isQuarterTurn ? image.naturalWidth : image.naturalHeight

  // 旋转和翻转先移动到画布中心处理，这样不同方向组合时不会把图片画到画布外。
  context.translate(canvas.width / 2, canvas.height / 2)
  context.rotate((options.rotation * Math.PI) / 180)
  context.scale(options.flipHorizontal ? -1 : 1, options.flipVertical ? -1 : 1)

  if (format === 'jpg') {
    context.save()
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.fillStyle = options.background ?? '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
  }

  context.drawImage(
    image,
    -image.naturalWidth / 2,
    -image.naturalHeight / 2,
    image.naturalWidth,
    image.naturalHeight
  )

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('Failed to create rotated image blob'))
        }
      },
      getImageMimeType(format),
      options.quality
    )
  })

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    format
  }
}
