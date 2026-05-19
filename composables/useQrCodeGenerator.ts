import QRCode from 'qrcode'

export type QrCodeOptions = {
  size: number
  foreground: string
  background: string
  margin: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}

export type QrCodeResult = {
  dataUrl: string
  blob: Blob
  fileName: string
  size: number
}

export function useQrCodeGenerator() {
  const generateQrCode = async (content: string, options: QrCodeOptions): Promise<QrCodeResult> => {
    const dataUrl = await QRCode.toDataURL(content, {
      type: 'image/png',
      width: options.size,
      margin: options.margin,
      color: {
        dark: options.foreground,
        light: options.background
      },
      errorCorrectionLevel: options.errorCorrectionLevel ?? 'M'
    })
    const response = await fetch(dataUrl)
    const blob = await response.blob()

    return {
      dataUrl,
      blob,
      fileName: 'qr-code.png',
      size: blob.size
    }
  }

  return {
    generateQrCode
  }
}
