import { PDFDocument } from 'pdf-lib'
import type { ProcessedResult } from '~/types/tool'
import { bytesToArrayBuffer } from '~/utils/blob'
import { formatBytes, getSavedPercent } from '~/utils/fileSize'

type CompressLevel = 'low' | 'medium' | 'high'

export function useCompressPdf() {
  const { t } = useLocale()

  const compressPdf = async (
    file: File,
    options: {
      level: CompressLevel
    }
  ): Promise<ProcessedResult[]> => {
    const blob = await compressPdfByRasterizing(file, options.level)
    const shouldKeepOriginal = blob.size >= file.size
    const resultBlob = shouldKeepOriginal ? file : blob
    const savedPercent = shouldKeepOriginal ? 0 : getSavedPercent(file.size, blob.size)
    const summary = getCompressionSummary(file.size, blob.size, savedPercent, shouldKeepOriginal)

    return [
      {
        id: `${file.name}-compressed-pdf-${Date.now()}`,
        fileName: file.name,
        downloadName: shouldKeepOriginal
          ? file.name
          : file.name.replace(/\.pdf$/i, '-compressed.pdf'),
        originalSize: file.size,
        newSize: resultBlob.size,
        savedPercent,
        outputFormat: 'PDF',
        status: shouldKeepOriginal ? 'warning' : 'success',
        summary,
        message: shouldKeepOriginal
          ? t('result.pdfCannotReduceMessage')
          : getCompressionMessage(options.level),
        blob: resultBlob
      }
    ]
  }

  const getCompressionSummary = (
    originalSize: number,
    newSize: number,
    savedPercent: number,
    shouldKeepOriginal: boolean
  ) => {
    if (shouldKeepOriginal) {
      return t('result.pdfCannotReduce').replace('{size}', formatBytes(originalSize))
    }

    if (savedPercent <= 0 && newSize < originalSize) {
      return t('result.savedLessThanOne')
    }

    return t('result.savedPercent').replace('{percent}', String(savedPercent))
  }

  const getCompressionMessage = (level: CompressLevel) => {
    if (level === 'low') {
      return t('result.pdfCompressionDepends')
    }

    return t('result.pdfRasterCompressionMessage')
  }

  return {
    compressPdf
  }
}

async function compressPdfByRasterizing(file: File, level: CompressLevel) {
  const pdfjs = await import('pdfjs-dist')
  const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url')
  const rasterOptions = getRasterOptions(level)
  const targetSize = Math.floor(file.size * (1 - rasterOptions.targetSavedPercent / 100))

  pdfjs.GlobalWorkerOptions.workerSrc = worker.default

  const sourcePdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
  let outputBlob = await renderCompressedPdf(sourcePdf, rasterOptions.scale, rasterOptions.quality)

  // PDF 的最终体积受页面内容、字体、图片和原文件结构影响，单次 JPEG 质量参数不能保证刚好达到目标比例。
  // 这里按目标节省比例继续降低质量，尽量让低压缩接近 20%，中等压缩接近 45%，同时避免无限重试。
  let quality = rasterOptions.quality
  for (let attempt = 0; outputBlob.size > targetSize && quality > rasterOptions.minQuality && attempt < 4; attempt += 1) {
    quality = Math.max(rasterOptions.minQuality, quality - rasterOptions.qualityStep)
    outputBlob = await renderCompressedPdf(sourcePdf, rasterOptions.scale, quality)
  }

  sourcePdf.destroy()

  return outputBlob
}

async function renderCompressedPdf(
  sourcePdf: Awaited<ReturnType<Awaited<typeof import('pdfjs-dist')>['getDocument']>['promise']>,
  scale: number,
  quality: number
) {
  const pdfDoc = await PDFDocument.create()

  for (let pageNumber = 1; pageNumber <= sourcePdf.numPages; pageNumber += 1) {
    const sourcePage = await sourcePdf.getPage(pageNumber)
    const viewport = sourcePage.getViewport({ scale })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas is not available')
    }

    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    await sourcePage.render({ canvas, canvasContext: context, viewport }).promise

    const pageBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Failed to render compressed PDF page'))
          }
        },
        'image/jpeg',
        quality
      )
    })
    const pageImage = await pdfDoc.embedJpg(await pageBlob.arrayBuffer())
    const page = pdfDoc.addPage([pageImage.width, pageImage.height])

    page.drawImage(pageImage, {
      x: 0,
      y: 0,
      width: pageImage.width,
      height: pageImage.height
    })
  }

  const outputBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 40
  })

  return new Blob([bytesToArrayBuffer(outputBytes)], { type: 'application/pdf' })
}

function getRasterOptions(level: CompressLevel) {
  if (level === 'high') {
    return {
      scale: 0.72,
      quality: 0.36,
      minQuality: 0.24,
      qualityStep: 0.04,
      targetSavedPercent: 60
    }
  }

  if (level === 'medium') {
    return {
      scale: 0.82,
      quality: 0.46,
      minQuality: 0.32,
      qualityStep: 0.04,
      targetSavedPercent: 45
    }
  }

  return {
    scale: 0.96,
    quality: 0.68,
    minQuality: 0.52,
    qualityStep: 0.04,
    targetSavedPercent: 20
  }
}
