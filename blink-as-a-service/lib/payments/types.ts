import { PublicKey } from '@solana/web3.js'

export interface PaymentMethod {
  id: string
  name: string
  icon: string
}

export interface Transaction {
  id: string
  recipient: string
  amount: number
  timestamp: Date
  paymentMethod: string
}

export interface PaymentRequest {
  recipient: string
  amount: number
  paymentMethod: string
}

export interface QRCodeRequest {
  recipient: string
  amount: number
  paymentMethod: string
}

export interface TokenAccountInfo {
  pubkey: PublicKey
  account: {
    mint: PublicKey
    owner: PublicKey
    amount: bigint
  }
}

export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface PaymentResult {
  status: PaymentStatus
  transactionId?: string
  error?: string
}