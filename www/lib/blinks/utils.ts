import { Blink, BlinkTransferRequest } from './types'
import { BLINK_STATUS } from './constants'
import { PublicKey } from '@solana/web3.js'

// TODO: Replace this with your actual database implementation
let blinkDatabase: Blink[] = []

export async function createBlink(request: BlinkTransferRequest): Promise<Blink> {
  const newBlink: Blink = {
    id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    ...request,
    status: BLINK_STATUS.PENDING,
    createdAt: new Date()
  }
  // TODO: Replace this with your database insert operation
  blinkDatabase.push(newBlink)
  return newBlink
}

export async function getBlink(id: string): Promise<Blink | undefined> {
  // TODO: Replace this with your database query
  return blinkDatabase.find(blink => blink.id === id)
}

export async function updateBlinkStatus(
  id: string, 
  status: keyof typeof BLINK_STATUS
): Promise<Blink> {
  // TODO: Replace this with your database update operation
  const blink = await getBlink(id)
  if (!blink) {
    throw new Error('Blink not found')
  }
  
  blink.status = status
  if (status === BLINK_STATUS.COMPLETED) {
    blink.completedAt = new Date()
  } else if (status === BLINK_STATUS.CANCELLED) {
    blink.cancelledAt = new Date()
  }
  
  return blink
}

export function validateBlinkTransferRequest(request: BlinkTransferRequest): string | null {
  if (!request.fromPubkey || !request.toPubkey || !request.amount) {
    return 'Missing required fields'
  }

  try {
    new PublicKey(request.fromPubkey)
    new PublicKey(request.toPubkey)
  } catch (error) {
    return 'Invalid public key'
  }

  if (typeof request.amount !== 'number' || request.amount <= 0) {
    return 'Invalid amount'
  }

  return null
}