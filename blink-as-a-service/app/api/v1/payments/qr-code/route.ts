import { NextResponse } from 'next/server'
import { encodeURL, createQR } from '@solana/pay'
import { PublicKey } from '@solana/web3.js'
import { PAYMENT_METHODS } from '@/lib/payments/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const recipient = searchParams.get('recipient')
  const amount = searchParams.get('amount')
  const paymentMethod = searchParams.get('paymentMethod')

  if (!recipient || !amount || !paymentMethod) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  if (!PAYMENT_METHODS.some(method => method.id === paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }

  try {
    const recipientPublicKey = new PublicKey(recipient)
    const url = encodeURL({
      recipient: recipientPublicKey,
      amount: parseFloat(amount),
      splToken: paymentMethod !== 'sol' ? (paymentMethod === 'bark' ? process.env.NEXT_PUBLIC_BARK_TOKEN_MINT : process.env.NEXT_PUBLIC_USDC_TOKEN_MINT) : undefined,
      reference: new PublicKey(process.env.NEXT_PUBLIC_REFERENCE_PUBLIC_KEY || ''),
      label: 'BARK Blink Payment',
      message: 'Thanks for your payment!',
    })

    const qr = createQR(url)
    const qrCode = await qr.getRawData('svg')

    return new NextResponse(qrCode, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 })
  }
}

