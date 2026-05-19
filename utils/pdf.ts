export const pdfPageSizes = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 }
}

export type PdfPageSizeName = keyof typeof pdfPageSizes

export function getPdfPageSize(name: PdfPageSizeName, orientation: 'portrait' | 'landscape') {
  const size = pdfPageSizes[name]

  if (orientation === 'landscape') {
    return {
      width: size.height,
      height: size.width
    }
  }

  return size
}
