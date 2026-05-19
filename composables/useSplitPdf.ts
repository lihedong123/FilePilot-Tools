import { PDFDocument } from 'pdf-lib'
import type { ProcessedResult } from '~/types/tool'
import { parsePageRange } from '~/utils/pageRange'

export function useSplitPdf() {
  const splitPdf = async (
    file: File,
    options: {
      pageRange: string
      outputName: string
    }
  ): Promise<ProcessedResult[]> => {
    const sourcePdf = await PDFDocument.load(await file.arrayBuffer())
    const selectedPages = parsePageRange(options.pageRange, sourcePdf.getPageCount())
    const outputPdf = await PDFDocument.create()
    const copiedPages = await outputPdf.copyPages(sourcePdf, selectedPages)

    copiedPages.forEach((page) => outputPdf.addPage(page))

    const bytes = await outputPdf.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })

    return [
      {
        id: `split-pdf-${Date.now()}`,
        fileName: file.name,
        downloadName: options.outputName || 'split.pdf',
        originalSize: file.size,
        newSize: blob.size,
        outputFormat: 'PDF',
        status: 'success',
        summary: `Exported ${selectedPages.length} pages`,
        blob
      }
    ]
  }

  return {
    splitPdf
  }
}
