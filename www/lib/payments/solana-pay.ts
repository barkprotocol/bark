import { createQR } from '@solana/pay'
import { TOKEN_INFO, SUPPORTED_PAYMENT_TOKENS } from '@/lib/payments/constants'
import { GenerateQRCodeParams } from '@/lib/payments/types'

export async function generateQRCode({ signature, transactionId, amount, fromToken }: GenerateQRCodeParams): Promise<string> {
  if (!signature || !transactionId || !amount || !fromToken) {
    throw new Error('Missing required parameters for QR code generation')
  }

  if (!SUPPORTED_PAYMENT_TOKENS.includes(fromToken)) {
    throw new Error(`Unsupported token: ${fromToken}`)
  }

  const tokenMint = TOKEN_INFO[fromToken].mint
  if (!tokenMint) {
    throw new Error(`No mint address found for token: ${fromToken}`)
  }

  const url = `solana:${signature}?reference=${transactionId}&amount=${amount}&spl-token=${tokenMint.toBase58()}`
  
  try {
    const qr = createQR(url)
    const qrCodeSrc = await qr.getRawData('png')
    
    if (!qrCodeSrc) {
      throw new Error('Failed to generate QR code')
    }
    
    return URL.createObjectURL(new Blob([qrCodeSrc], { type: 'image/png' }))
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

