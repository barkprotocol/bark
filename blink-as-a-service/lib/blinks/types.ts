import { PublicKey } from '@solana/web3.js'
import { BLINK_STATUS } from './constants'

// Blink-related types
export interface BlinkTransferRequest {
  fromPubkey: string
  toPubkey: string
  amount: number
  memo?: string
}

export interface BlinkTransferResult {
  id: string
  status: keyof typeof BLINK_STATUS
  fromPubkey: string
  toPubkey: string
  amount: number
  createdAt: Date
  completedAt?: Date
  cancelledAt?: Date
  transaction?: string // Base64 encoded serialized transaction
}

export type BlinkTransferAction = 'complete' | 'cancel'

export interface Blink {
  id: string
  name: string
  description: string
  image: string
  fromPubkey: string
  toPubkey: string
  amount: number
  status: keyof typeof BLINK_STATUS
  memo?: string
  createdAt: Date
  completedAt?: Date
  cancelledAt?: Date
  likes: number
  shares: number
  comments: number
  views: number
  owner: string
}

// Notification type
export interface Notification {
  id: number
  message: string
  read: boolean
}

// Chart data type
export interface ChartDataPoint {
  name: string
  value: number
}

export interface SwapBlinksRequest {
  userPublicKey: string
  userBlinkId: string
  availableBlinkId: string
}

export type ActionType = 'createBlink' | 'updateBlink' | 'deleteBlink' | 'sendBark' | 'purchaseGiftCard' | 'redeemGiftCard' | 'swap'

export interface ActionRequest {
  action: ActionType
  data: any
}

export interface ActionResponse {
  success: boolean
  data?: any
  error?: string
}

// BARK transfer type
export interface SendBarkData {
  from: string
  to: string
  amount: number
}

// Gift card types
export interface GiftCard {
  id: string
  code: string
  amount: number
  purchasedBy: string
  redeemedBy?: string
  purchasedAt: Date
  redeemedAt?: Date
}

export interface PurchaseGiftCardRequest {
  publicKey: string
  amount: number
}

export interface RedeemGiftCardRequest {
  publicKey: string
  giftCode: string
}

export interface PurchaseGiftCardResponse {
  giftCode: string
}

export interface RedeemGiftCardResponse {
  amount: number
}

