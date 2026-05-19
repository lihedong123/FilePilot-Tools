import { PDFDocument } from 'pdf-lib'
import type { ProcessedResult } from '~/types/tool'
import { bytesToArrayBuffer } from '~/utils/blob'

export function useMergePdf() {
  const mergePdfs = async (
    files: File[],
    options: {
      outputName: string
    }
  ): Promise<ProcessedResult[]> => {
    const mergedPdf = await PDFDocument.create()
    let pageCount = 0

    for (const file of files) {
      const sourcePdf = await PDFDocument.load(await file.arrayBuffer())
      const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())

      copiedPages.forEach((page) => {
        mergedPdf.addPage(page)
        pageCount += 1
      })
    }

    const bytes = await mergedPdf.save()
    const blob = new Blob([bytesToArrayBuffer(bytes)], { type: 'application/pdf' })

    return [
      {
        id: `merged-pdf-${Date.now()}`,
        fileName: `${files.length} PDF files`,
        downloadName: options.outputName || 'merged.pdf',
        originalSize: files.reduce((total, file) => total + file.size, 0),
        newSize: blob.size,
        outputFormat: 'PDF',
        status: 'success',
        summary: `Merged ${pageCount} pages`,
        blob
      }
    ]
  }

  return {
    mergePdfs
  }
}
