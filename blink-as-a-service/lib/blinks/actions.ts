import { Connection, PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram } from '@solana/web3.js'
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token'
import { BlinkTransferRequest, BlinkTransferResult } from './types'
import { SOLANA_RPC_URL, BLINK_PROGRAM_ID, BLINK_MINT } from './constants'
import { createBlink, getBlink, updateBlinkStatus } from './utils'

const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export async function initiateBlink(request: BlinkTransferRequest): Promise<BlinkTransferResult> {
  const { fromPubkey, toPubkey, amount } = request
  
  // Create a new Blink record in the database
  const blink = await createBlink(request)

  // Interact with the Solana program to initiate the transfer
  const fromPub = new PublicKey(fromPubkey)
  const toPub = new PublicKey(toPubkey)

  const fromATA = await getAssociatedTokenAddress(BLINK_MINT, fromPub)
  const toATA = await getAssociatedTokenAddress(BLINK_MINT, toPub)

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      fromPub,
      toATA,
      toPub,
      BLINK_MINT
    ),
    createTransferInstruction(
      fromATA,
      toATA,
      fromPub,
      BigInt(amount)
    )
  )

  // Note: In a real application, you would need to sign this transaction with the user's wallet
  // This would typically be done on the client-side
  // Here, we're just creating the transaction

  return {
    id: blink.id,
    status: 'pending',
    fromPubkey,
    toPubkey,
    amount,
    createdAt: blink.createdAt,
    transaction: transaction.serialize().toString('base64')
  }
}

export async function completeBlink(blinkId: string): Promise<BlinkTransferResult> {
  const blink = await getBlink(blinkId)
  if (!blink) {
    throw new Error('Blink not found')
  }

  // In a real implementation, you would verify the transaction on-chain here
  // For now, we'll just update the status
  const updatedBlink = await updateBlinkStatus(blinkId, 'completed')

  return {
    id: updatedBlink.id,
    status: updatedBlink.status,
    fromPubkey: updatedBlink.fromPubkey,
    toPubkey: updatedBlink.toPubkey,
    amount: updatedBlink.amount,
    createdAt: updatedBlink.createdAt,
    completedAt: updatedBlink.completedAt
  }
}

export async function cancelBlink(blinkId: string): Promise<BlinkTransferResult> {
  const blink = await getBlink(blinkId)
  if (!blink) {
    throw new Error('Blink not found')
  }

  // In a real implementation, you would cancel the transfer on-chain here if necessary
  // For now, we'll just update the status
  const updatedBlink = await updateBlinkStatus(blinkId, 'cancelled')

  return {
    id: updatedBlink.id,
    status: updatedBlink.status,
    fromPubkey: updatedBlink.fromPubkey,
    toPubkey: updatedBlink.toPubkey,
    amount: updatedBlink.amount,
    createdAt: updatedBlink.createdAt,
    cancelledAt: updatedBlink.cancelledAt
  }
}

