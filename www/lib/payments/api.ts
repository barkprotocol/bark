import { CreatePaymentParams, CreatePaymentResponse, VerifyPaymentParams, VerifyPaymentResponse, TokenSymbol } from '@/lib/payments/types'
import { TOKEN_INFO, SUPPORTED_PAYMENT_TOKENS } from '@/lib/payments/constants'

export async function createPayment({ buyerPublicKey, amount, fromToken }: CreatePaymentParams): Promise<CreatePaymentResponse> {
  if (!buyerPublicKey || !amount || !fromToken) {
    throw new Error('Missing required parameters for payment creation')
  }

  if (!SUPPORTED_PAYMENT_TOKENS.includes(fromToken)) {
    throw new Error(`Unsupported token: ${fromToken}`)
  }

  try {
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyerPublicKey, amount, fromToken }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create payment')
    }

    const data: CreatePaymentResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error creating payment:', error)
    throw new Error('Failed to create payment. Please try again.')
  }
}

export async function verifyPayment({ transactionId }: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  if (!transactionId) {
    throw new Error('Transaction ID is required for payment verification')
  }

  try {
    const response = await fetch(`/api/payments?transactionId=${encodeURIComponent(transactionId)}&action=verify`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to verify payment')
    }

    const data: VerifyPaymentResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw new Error('Failed to verify payment. Please try again.')
  }
}

export function getTokenIconUrl(token: TokenSymbol): string {
  if (!TOKEN_INFO[token]) {
    throw new Error(`Invalid token symbol: ${token}`)
  }
  return TOKEN_INFO[token].icon
}

export async function fetchTokenPrice(token: TokenSymbol): Promise<number> {
  if (!TOKEN_INFO[token]) {
    throw new Error(`Invalid token symbol: ${token}`)
  }

  try {
    const response = await fetch(`/api/token-price?symbol=${encodeURIComponent(token)}`)

    if (!response.ok) {
      throw new Error('Failed to fetch token price')
    }

    const data = await response.json()
    return data.price
  } catch (error) {
    console.error('Error fetching token price:', error)
    throw new Error('Failed to fetch token price. Please try again.')
  }
}

