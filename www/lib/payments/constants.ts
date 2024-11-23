import { PublicKey } from '@solana/web3.js'

// Solana network configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet'
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'

// Token mints
export const SOL_MINT = new PublicKey('So11111111111111111111111111111111111111112') // Native SOL mint
export const BARK_TOKEN_MINT = new PublicKey(process.env.NEXT_PUBLIC_BARK_TOKEN_MINT || '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg')
export const USDC_COIN_MINT = new PublicKey(process.env.NEXT_PUBLIC_USDC_COIN_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

// Decimals for each token
export const DECIMALS = {
  sol: 9,
  bark: 9,
  usdc: 6,
}

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'sol', name: 'SOL', icon: 'https://ucarecdn.com/8bcc4664-01b2-4a88-85bc-9ebce234f08b/sol.png' },
  { id: 'bark', name: 'BARK', icon: 'https://ucarecdn.com/8aa0180d-1112-4aea-8210-55b266c3fb44/bark.png' },
  { id: 'usdc', name: 'USDC', icon: 'https://ucarecdn.com/ee18c01a-d01d-4ad6-adb6-cac9a5539d2c/usdc.png' },
]

// Transaction statuses
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

// API endpoints
export const API_ENDPOINTS = {
  CREATE_PAYMENT: '/api/v1/payments',
  GET_BALANCE: '/api/v1/balance',
  GET_TRANSACTIONS: '/api/v1/transactions',
}

// Timeouts and retries
export const TRANSACTION_TIMEOUT = 60000 // 60 seconds
export const MAX_RETRIES = 3
export const RETRY_DELAY = 1000 // 1 second

// UI constants
export const TOAST_DURATION = 5000 // 5 seconds
export const MAX_TRANSACTION_HISTORY = 10

// Validation constants
export const MIN_AMOUNT = 0.000001
export const MAX_AMOUNT = 1000000 // Adjust as needed

// Fee constants (if applicable)
export const TRANSACTION_FEE_PERCENT = 0.5 // 0.5%
export const MIN_TRANSACTION_FEE = 0.01 // Minimum fee in SOL
export const MAX_TRANSACTION_FEE = 1 // Maximum fee in SOL

// Localization
export const DEFAULT_LOCALE = 'en-US'
export const SUPPORTED_LOCALES = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP']

// Feature flags
export const ENABLE_QR_CODE_PAYMENTS = true
export const ENABLE_TRANSACTION_HISTORY = true
export const ENABLE_MULTI_CURRENCY_SUPPORT = true

// Security
export const MAX_FAILED_ATTEMPTS = 5
export const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

// Cache
export const BALANCE_CACHE_DURATION = 30 * 1000 // 30 seconds
export const TRANSACTION_HISTORY_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

