import { CreatePaymentParams, CreatePaymentResponse, VerifyPaymentParams, VerifyPaymentResponse, TokenSymbol } from './types'
import { TOKEN_INFO } from './constants'

export async function createPayment({ buyerPublicKey, amount, fromToken }: CreatePaymentParams): Promise<CreatePaymentResponse> {
  const response = await fetch('/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buyerPublicKey, amount, fromToken }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create payment')
  }

  return response.json()
}

export async function verifyPayment({ transactionId }: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  const response = await fetch(`/api/payments?transactionId=${transactionId}&action=verify`)

  if (!response.ok) {
    throw new Error('Failed to verify payment')
  }

  return response.json()
}

export function getTokenIconUrl(token: TokenSymbol): string {
  return TOKEN_INFO[token].icon
}