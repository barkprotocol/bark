import { createQR } from '@solana/pay'
import { TOKEN_INFO } from './constants'
import { GenerateQRCodeParams } from './types'

export async function generateQRCode({ signature, transactionId, amount, fromToken }: GenerateQRCodeParams): Promise<string> {
  const url = `solana:${signature}?reference=${transactionId}&amount=${amount}&spl-token=${TOKEN_INFO[fromToken].mint}`
  const qr = createQR(url)
  const qrCodeSrc = await qr.getRawData('png')
  return URL.createObjectURL(new Blob([qrCodeSrc!], { type: 'image/png' }))
}