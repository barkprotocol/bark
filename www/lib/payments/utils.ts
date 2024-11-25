import { TokenSymbol, SupportedPaymentToken, ConversionRate } from './types'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

/**
 * Format a number to a currency string with the specified number of decimal places
 */
export function formatCurrency(amount: number, decimals: number = 2): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Convert an amount from one token to another based on the conversion rate
 */
export function convertAmount(
  amount: number,
  fromToken: TokenSymbol,
  toToken: TokenSymbol,
  conversionRates: ConversionRate[]
): number {
  if (fromToken === toToken) return amount

  const rate = conversionRates.find(
    (r) => r.fromToken === fromToken && r.toToken === toToken
  )

  if (!rate) {
    throw new Error(`No conversion rate found for ${fromToken} to ${toToken}`)
  }

  return amount * rate.rate
}

/**
 * Validate that the input amount is a positive number
 */
export function validateAmount(amount: string): boolean {
  const numAmount = parseFloat(amount)
  return !isNaN(numAmount) && numAmount > 0
}

/**
 * Convert lamports to SOL
 */
export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL
}

/**
 * Convert SOL to lamports
 */
export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL)
}

/**
 * Get the number of decimal places for a given token
 */
export function getTokenDecimals(token: TokenSymbol): number {
  switch (token) {
    case 'SOL':
      return 9
    case 'USDC':
      return 6
    case 'BARK':
      return 9
    default:
      throw new Error(`Unknown token: ${token}`)
  }
}

/**
 * Format an amount for display based on the token type
 */
export function formatTokenAmount(amount: number, token: TokenSymbol): string {
  const decimals = getTokenDecimals(token)
  return `${formatCurrency(amount, decimals)} ${token}`
}

/**
 * Truncate a string (e.g., for displaying long addresses)
 */
export function truncateString(str: string, start: number = 4, end: number = 4): string {
  if (str.length <= start + end) return str
  return `${str.slice(0, start)}...${str.slice(-end)}`
}

/**
 * Check if a token is a supported payment token
 */
export function isSupportedPaymentToken(token: string): token is SupportedPaymentToken {
  return token === 'SOL' || token === 'USDC'
}

