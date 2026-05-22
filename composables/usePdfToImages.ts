import type { ProcessedResult } from '~/types/tool'

export function usePdfToImages() {
  const convertPdfToImages = async (
    file: File,
    options: {
      outputFormat: 'jpg' | 'png'
      quality: number
      pageRange: string
    }
  ): Promise<ProcessedResult[]> => {
    const pdfjs = await import('pdfjs-dist')
    const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url')

    pdfjs.GlobalWorkerOptions.workerSrc = worker.default

    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
    const pages = parsePageRange(options.pageRange, pdf.numPages)
    const mimeType = options.outputFormat === 'jpg' ? 'image/jpeg' : 'image/png'

    return Promise.all(pages.map(async (pageNumber) => {
      const page = await pdf.getPage(pageNumber)
      const viewport = page.getViewport({ scale: 2 })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Canvas is not available')
      }

      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      await page.render({ canvas, canvasContext: context, viewport }).promise

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result)
            } else {
              reject(new Error('Failed to create page image'))
            }
          },
          mimeType,
          options.quality / 100
        )
      })

      return {
        id: `${file.name}-page-${pageNumber}-${Date.now()}`,
        fileName: `${file.name} page ${pageNumber}`,
        downloadName: file.name.replace(/\.pdf$/i, `-page-${pageNumber}.${options.outputFormat}`),
        originalSize: file.size,
        newSize: blob.size,
        outputFormat: options.outputFormat.toUpperCase(),
        status: 'success',
        summary: `Page ${pageNumber}`,
        blob
      }
    }))
  }

  return {
    convertPdfToImages
  }
}

function parsePageRange(value: string, totalPages: number): number[] {
  if (value.trim().toLowerCase() === 'all') {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set<number>()

  value.split(',').forEach((part) => {
    const trimmed = part.trim()
    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/)
    const singleMatch = trimmed.match(/^\d+$/)

    if (rangeMatch) {
      const start = Number(rangeMatch[1])
      const end = Number(rangeMatch[2])

      for (let page = start; page <= end; page += 1) {
        pages.add(page)
      }
    } else if (singleMatch) {
      pages.add(Number(trimmed))
    }
  })

  const validPages = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)

  if (validPages.length === 0) {
    throw new Error('Invalid page range')
  }

  return validPages
}
