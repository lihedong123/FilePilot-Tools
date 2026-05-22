export type LocaleCode = 'en' | 'zh-CN'

export type ToolKey =
  | 'image-compressor'
  | 'image-converter'
  | 'image-to-pdf'
  | 'crop-image'
  | 'rotate-image'
  | 'merge-pdf'
  | 'split-pdf'
  | 'compress-pdf'
  | 'pdf-to-images'
  | 'resize-image'
  | 'qr-code-generator'

export type ToolCategory = 'image' | 'pdf' | 'qr'

export type ToolInfo = {
  key: ToolKey
  titleKey: string
  descriptionKey: string
  cardDescriptionKey: string
  href: string
  icon: string
  category: ToolCategory
  accept: string
  multiple: boolean
  maxFiles: number
  maxFileSize: number
  actionKey: string
  seoTitleKey: string
  seoDescriptionKey: string
}

export type ProcessedResult = {
  id: string
  fileName: string
  downloadName: string
  originalSize?: number
  newSize?: number
  savedPercent?: number
  outputFormat?: string
  status: 'success' | 'warning' | 'failed'
  summary: string
  message?: string
  blob?: Blob
}
