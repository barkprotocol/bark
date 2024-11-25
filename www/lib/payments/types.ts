import { PublicKey } from '@solana/web3.js'

export type TokenSymbol = 'SOL' | 'USDC' | 'BARK'

export interface TokenInfo {
  name: string
  symbol: TokenSymbol
  icon: string
  decimals: number
  mint?: PublicKey
}

export type SupportedPaymentToken = 'SOL' | 'USDC'

export interface CreatePaymentParams {
  buyerPublicKey: string
  amount: number
  fromToken: SupportedPaymentToken
}

export interface CreatePaymentResponse {
  transaction: string // base64 encoded transaction
  transactionId: string
  signature: string
}

export interface VerifyPaymentParams {
  transactionId: string
}

export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface VerifyPaymentResponse {
  status: PaymentStatus
  signature?: string
  amount?: string
  fromToken?: SupportedPaymentToken
  toToken?: TokenSymbol
  timestamp?: number
}

export interface GenerateQRCodeParams {
  signature: string
  transactionId: string
  amount: string
  fromToken: SupportedPaymentToken
}

export interface PaymentDetails {
  transactionId: string
  signature: string
  amount: string
  fromToken: SupportedPaymentToken
  toToken: TokenSymbol
  status: PaymentStatus
  timestamp: number
}

export interface TokenPrice {
  symbol: TokenSymbol
  price: number
  lastUpdated: number
}

export interface ConversionRate {
  fromToken: TokenSymbol
  toToken: TokenSymbol
  rate: number
}

export interface UserWallet {
  publicKey: string
  balance: {
    [key in TokenSymbol]?: number
  }
}

export interface TransactionHistory {
  transactions: PaymentDetails[]
  hasMore: boolean
  nextCursor?: string
}

export interface FetchTransactionHistoryParams {
  publicKey: string
  limit?: number
  cursor?: string
}

