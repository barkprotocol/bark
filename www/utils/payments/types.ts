import { PublicKey } from '@solana/web3.js'

export type TokenSymbol = 'SOL' | 'USDC' | 'BARK'

export interface TokenInfo {
  name: string
  symbol: TokenSymbol
  icon: string
  decimals: number
  mint?: PublicKey
}

export interface CreatePaymentParams {
  buyerPublicKey: string
  amount: number
  fromToken: 'SOL' | 'USDC'
}

export interface CreatePaymentResponse {
  transaction: string // base64 encoded transaction
  transactionId: string
}

export interface VerifyPaymentParams {
  transactionId: string
}

export interface VerifyPaymentResponse {
  status: 'pending' | 'completed' | 'failed'
}

export interface GenerateQRCodeParams {
  signature: string
  transactionId: string
  amount: string
  fromToken: 'SOL' | 'USDC'
}

export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface PaymentDetails {
  transactionId: string
  signature: string
  amount: string
  fromToken: TokenSymbol
  toToken: TokenSymbol
  status: PaymentStatus
  timestamp: number
}