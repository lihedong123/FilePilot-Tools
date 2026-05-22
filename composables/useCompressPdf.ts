import { PDFDocument } from 'pdf-lib'
import type { ProcessedResult } from '~/types/tool'
import { bytesToArrayBuffer } from '~/utils/blob'
import { formatBytes, getSavedPercent } from '~/utils/fileSize'

export function useCompressPdf() {
  const compressPdf = async (
    file: File,
    options: {
      level: 'low' | 'medium' | 'high'
    }
  ): Promise<ProcessedResult[]> => {
    const sourcePdf = await PDFDocument.load(await file.arrayBuffer())
    const outputBytes = await sourcePdf.save({
      useObjectStreams: options.level !== 'low',
      addDefaultPage: false,
      objectsPerTick: options.level === 'high' ? 80 : 40
    })
    const blob = new Blob([bytesToArrayBuffer(outputBytes)], { type: 'application/pdf' })
    const savedPercent = getSavedPercent(file.size, blob.size)

    return [
      {
        id: `${file.name}-compressed-pdf-${Date.now()}`,
        fileName: file.name,
        downloadName: file.name.replace(/\.pdf$/i, '-compressed.pdf'),
        originalSize: file.size,
        newSize: blob.size,
        savedPercent,
        outputFormat: 'PDF',
        status: 'success',
        summary: savedPercent > 0
          ? `${savedPercent}% saved`
          : `New file is ${formatBytes(blob.size)}`,
        message: 'Compression depends on how the PDF was created.',
        blob
      }
    ]
  }

  return {
    compressPdf
  }
}
