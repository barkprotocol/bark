import { PublicKey } from '@solana/web3.js'
import { Blink, GiftCard, PurchaseGiftCardResponse, RedeemGiftCardResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.barkprotocol.net'

// Blink-related API functions
export async function fetchBlinks(): Promise<Blink[]> {
  const response = await fetch(`${API_BASE_URL}/blinks`)
  if (!response.ok) {
    throw new Error('Failed to fetch Blinks')
  }
  return response.json()
}

export async function createBlink(blinkData: Partial<Blink>): Promise<Blink> {
  const response = await fetch(`${API_BASE_URL}/blinks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blinkData),
  })
  if (!response.ok) {
    throw new Error('Failed to create Blink')
  }
  return response.json()
}

export async function updateBlink(id: string, updates: Partial<Blink>): Promise<Blink> {
  const response = await fetch(`${API_BASE_URL}/blinks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    throw new Error('Failed to update Blink')
  }
  return response.json()
}

export async function deleteBlink(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blinks/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete Blink')
  }
}

// BARK token-related API functions
export async function fetchBarkBalance(publicKey: PublicKey): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/balance/${publicKey.toBase58()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch BARK balance')
  }
  const data = await response.json()
  return data.balance
}

export async function sendBark(from: PublicKey, to: PublicKey, amount: number): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/send-bark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: from.toBase58(), to: to.toBase58(), amount }),
  })
  if (!response.ok) {
    throw new Error('Failed to send BARK')
  }
  const data = await response.json()
  return data.transactionId
}

// Gift card-related API functions
export async function purchaseGiftCard(publicKey: string, amount: number): Promise<PurchaseGiftCardResponse> {
  const response = await fetch(`${API_BASE_URL}/gift-cards/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicKey, amount }),
  })
  if (!response.ok) {
    throw new Error('Failed to purchase gift card')
  }
  return response.json()
}

export async function redeemGiftCard(publicKey: string, giftCode: string): Promise<RedeemGiftCardResponse> {
  const response = await fetch(`${API_BASE_URL}/gift-cards/redeem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicKey, giftCode }),
  })
  if (!response.ok) {
    throw new Error('Failed to redeem gift card')
  }
  return response.json()
}

export async function fetchGiftCards(publicKey: string): Promise<GiftCard[]> {
  const response = await fetch(`${API_BASE_URL}/gift-cards/${publicKey}`)
  if (!response.ok) {
    throw new Error('Failed to fetch gift cards')
  }
  return response.json()
}

export async function swapBlinks(userPublicKey: string, userBlinkId: string, availableBlinkId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blinks/swap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPublicKey, userBlinkId, availableBlinkId }),
  })
  if (!response.ok) {
    throw new Error('Failed to swap')
  }
}