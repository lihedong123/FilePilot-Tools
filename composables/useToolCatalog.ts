import type { ToolInfo } from '~/types/tool'

const imageMaxSize = 20 * 1024 * 1024
const pdfMaxSize = 50 * 1024 * 1024

export function useToolCatalog() {
  const tools: ToolInfo[] = [
    {
      key: 'image-compressor',
      titleKey: 'tools.imageCompressor.title',
      descriptionKey: 'tools.imageCompressor.description',
      cardDescriptionKey: 'tools.imageCompressor.card',
      href: '/image-compressor',
      icon: 'compress',
      category: 'image',
      accept: 'image/jpeg,image/png,image/webp',
      multiple: true,
      maxFiles: 20,
      maxFileSize: imageMaxSize,
      actionKey: 'tools.imageCompressor.action',
      seoTitleKey: 'seo.compressTitle',
      seoDescriptionKey: 'seo.compressDescription'
    },
    {
      key: 'image-converter',
      titleKey: 'tools.imageConverter.title',
      descriptionKey: 'tools.imageConverter.description',
      cardDescriptionKey: 'tools.imageConverter.card',
      href: '/image-converter',
      icon: 'convert',
      category: 'image',
      accept: 'image/jpeg,image/png,image/webp',
      multiple: true,
      maxFiles: 20,
      maxFileSize: imageMaxSize,
      actionKey: 'tools.imageConverter.action',
      seoTitleKey: 'seo.convertTitle',
      seoDescriptionKey: 'seo.convertDescription'
    },
    {
      key: 'image-to-pdf',
      titleKey: 'tools.imageToPdf.title',
      descriptionKey: 'tools.imageToPdf.description',
      cardDescriptionKey: 'tools.imageToPdf.card',
      href: '/image-to-pdf',
      icon: 'image-pdf',
      category: 'image',
      accept: 'image/jpeg,image/png,image/webp',
      multiple: true,
      maxFiles: 20,
      maxFileSize: imageMaxSize,
      actionKey: 'tools.imageToPdf.action',
      seoTitleKey: 'seo.imageToPdfTitle',
      seoDescriptionKey: 'seo.imageToPdfDescription'
    },
    {
      key: 'merge-pdf',
      titleKey: 'tools.mergePdf.title',
      descriptionKey: 'tools.mergePdf.description',
      cardDescriptionKey: 'tools.mergePdf.card',
      href: '/merge-pdf',
      icon: 'merge-pdf',
      category: 'pdf',
      accept: 'application/pdf',
      multiple: true,
      maxFiles: 10,
      maxFileSize: pdfMaxSize,
      actionKey: 'tools.mergePdf.action',
      seoTitleKey: 'seo.mergePdfTitle',
      seoDescriptionKey: 'seo.mergePdfDescription'
    },
    {
      key: 'split-pdf',
      titleKey: 'tools.splitPdf.title',
      descriptionKey: 'tools.splitPdf.description',
      cardDescriptionKey: 'tools.splitPdf.card',
      href: '/split-pdf',
      icon: 'split-pdf',
      category: 'pdf',
      accept: 'application/pdf',
      multiple: false,
      maxFiles: 1,
      maxFileSize: pdfMaxSize,
      actionKey: 'tools.splitPdf.action',
      seoTitleKey: 'seo.splitPdfTitle',
      seoDescriptionKey: 'seo.splitPdfDescription'
    },
    {
      key: 'resize-image',
      titleKey: 'tools.resizeImage.title',
      descriptionKey: 'tools.resizeImage.description',
      cardDescriptionKey: 'tools.resizeImage.card',
      href: '/resize-image',
      icon: 'resize',
      category: 'image',
      accept: 'image/jpeg,image/png,image/webp',
      multiple: true,
      maxFiles: 20,
      maxFileSize: imageMaxSize,
      actionKey: 'tools.resizeImage.action',
      seoTitleKey: 'seo.resizeImageTitle',
      seoDescriptionKey: 'seo.resizeImageDescription'
    }
  ]

  const getTool = (key: ToolInfo['key']) => {
    const tool = tools.find((item) => item.key === key)

    if (!tool) {
      throw new Error(`Unknown tool: ${key}`)
    }

    return tool
  }

  return {
    tools,
    getTool,
    imageTools: tools.filter((tool) => tool.category === 'image'),
    pdfTools: tools.filter((tool) => tool.category === 'pdf')
  }
}
