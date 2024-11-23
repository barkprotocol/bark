import { Connection, PublicKey } from '@solana/web3.js'
import { TokenAccountInfo, PaymentMethod, PaymentStatus } from './types'
import { SOLANA_RPC_URL, DECIMALS, PAYMENT_METHODS } from './constants'

export async function getTokenAccountInfo(
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<TokenAccountInfo | null> {
  const tokenAccounts = await connection.getTokenAccountsByOwner(owner, { mint })
  
  if (tokenAccounts.value.length === 0) {
    return null
  }

  const accountInfo = tokenAccounts.value[0]
  const parsedAccountInfo = await connection.getParsedAccountInfo(accountInfo.pubkey)

  if (
    parsedAccountInfo.value &&
    'parsed' in parsedAccountInfo.value.data &&
    'info' in parsedAccountInfo.value.data.parsed
  ) {
    const info = parsedAccountInfo.value.data.parsed.info
    return {
      pubkey: accountInfo.pubkey,
      account: {
        mint: new PublicKey(info.mint),
        owner: new PublicKey(info.owner),
        amount: BigInt(info.tokenAmount.amount)
      }
    }
  }

  return null
}

export function formatAmount(amount: number, paymentMethod: PaymentMethod['id']): string {
  const decimals = DECIMALS[paymentMethod] || 9
  return amount.toFixed(decimals)
}

export function formatAddress(address: string, length: number = 4): string {
  if (address.length <= length * 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function validatePaymentMethod(method: string): method is PaymentMethod['id'] {
  return PAYMENT_METHODS.some(pm => pm.id === method)
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && isFinite(amount)
}

export function validateAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

export async function getBalance(publicKey: PublicKey, paymentMethod: PaymentMethod['id']): Promise<number> {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

  if (paymentMethod === 'sol') {
    const balance = await connection.getBalance(publicKey)
    return balance / 10 ** DECIMALS.sol
  } else {
    const mint = new PublicKey(process.env[`NEXT_PUBLIC_${paymentMethod.toUpperCase()}_TOKEN_MINT`] || '')
    const tokenAccountInfo = await getTokenAccountInfo(connection, publicKey, mint)
    
    if (!tokenAccountInfo) {
      return 0
    }

    return Number(tokenAccountInfo.account.amount) / 10 ** DECIMALS[paymentMethod]
  }
}

export function getPaymentMethodIcon(paymentMethod: PaymentMethod['id']): string {
  const method = PAYMENT_METHODS.find(pm => pm.id === paymentMethod)
  return method ? method.icon : ''
}

export function getPaymentMethodName(paymentMethod: PaymentMethod['id']): string {
  const method = PAYMENT_METHODS.find(pm => pm.id === paymentMethod)
  return method ? method.name : paymentMethod.toUpperCase()
}

export function formatTimestamp(timestamp: number | Date): string {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function getStatusColor(status: PaymentStatus): string {
  switch (status) {
    case 'completed':
      return 'text-green-600'
    case 'pending':
      return 'text-yellow-600'
    case 'failed':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      await sleep(delay * (i + 1))
    }
  }

  throw lastError
}

export function parseError(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unknown error occurred'

