import { PDFDocument } from 'pdf-lib'
import type { ProcessedResult } from '~/types/tool'
import { bytesToArrayBuffer } from '~/utils/blob'
import { renderImageToBlob } from '~/utils/image'
import { getPdfPageSize, type PdfPageSizeName } from '~/utils/pdf'

export function useImageToPdf() {
  const createPdf = async (
    files: File[],
    options: {
      pageSize: PdfPageSizeName
      orientation: 'auto' | 'portrait' | 'landscape'
      margin: number
    }
  ): Promise<ProcessedResult[]> => {
    const pdfDoc = await PDFDocument.create()

    for (const file of files) {
      const bytes = file.type === 'image/webp'
        ? await (await renderImageToBlob(file, {
          outputFormat: 'jpg',
          quality: 0.92,
          background: '#ffffff'
        })).blob.arrayBuffer()
        : await file.arrayBuffer()
      const image = file.type === 'image/png'
        ? await pdfDoc.embedPng(bytes)
        : await pdfDoc.embedJpg(bytes)
      const imageIsLandscape = image.width >= image.height
      const orientation = options.orientation === 'auto'
        ? imageIsLandscape ? 'landscape' : 'portrait'
        : options.orientation
      const size = getPdfPageSize(options.pageSize, orientation)
      const page = pdfDoc.addPage([size.width, size.height])
      const margin = options.margin * 2.83465
      const maxWidth = size.width - margin * 2
      const maxHeight = size.height - margin * 2
      const scale = Math.min(maxWidth / image.width, maxHeight / image.height)
      const width = image.width * scale
      const height = image.height * scale

      page.drawImage(image, {
        x: (size.width - width) / 2,
        y: (size.height - height) / 2,
        width,
        height
      })
    }

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([bytesToArrayBuffer(pdfBytes)], { type: 'application/pdf' })

    return [
      {
        id: `image-pdf-${Date.now()}`,
        fileName: files.length === 1 ? files[0].name : `${files.length} images`,
        downloadName: 'images.pdf',
        originalSize: files.reduce((total, file) => total + file.size, 0),
        newSize: blob.size,
        outputFormat: 'PDF',
        status: 'success',
        summary: `Created ${pdfDoc.getPageCount()} page PDF`,
        blob
      }
    ]
  }

  return {
    createPdf
  }
}
