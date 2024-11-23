import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { createBlink, updateBlink, deleteBlink, sendBark, purchaseGiftCard, redeemGiftCard } from '@/lib/blinks/api'
import { createPaymentTransaction } from '@/lib/payments/solana'
import { validatePaymentRequest } from '@/lib/payments/utils'
import { SOLANA_RPC_URL } from '@/lib/payments/constants'
import { Blink, ActionRequest, ActionResponse, PurchaseGiftCardRequest, RedeemGiftCardRequest } from '@/lib/blinks/types'

const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export async function POST(request: NextRequest): Promise<NextResponse<ActionResponse>> {
  try {
    const body: ActionRequest = await request.json()
    const { action, data } = body

    switch (action) {
      case 'createBlink':
        return handleCreateBlink(data as Partial<Blink>)
      case 'updateBlink':
        return handleUpdateBlink(data as { id: string; updates: Partial<Blink> })
      case 'deleteBlink':
        return handleDeleteBlink(data as { id: string })
      case 'sendBark':
        return handleSendBark(data as { from: string; to: string; amount: number })
      case 'purchaseGiftCard':
        return handlePurchaseGiftCard(data as PurchaseGiftCardRequest)
      case 'redeemGiftCard':
        return handleRedeemGiftCard(data as RedeemGiftCardRequest)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing action:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleCreateBlink(blinkData: Partial<Blink>): Promise<NextResponse<ActionResponse>> {
  try {
    const newBlink = await createBlink(blinkData)
    return NextResponse.json({ success: true, data: newBlink })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create Blink' }, { status: 400 })
  }
}

async function handleUpdateBlink(data: { id: string; updates: Partial<Blink> }): Promise<NextResponse<ActionResponse>> {
  try {
    const updatedBlink = await updateBlink(data.id, data.updates)
    return NextResponse.json({ success: true, data: updatedBlink })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update Blink' }, { status: 400 })
  }
}

async function handleDeleteBlink(data: { id: string }): Promise<NextResponse<ActionResponse>> {
  try {
    await deleteBlink(data.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete Blink' }, { status: 400 })
  }
}

async function handleSendBark(data: { from: string; to: string; amount: number }): Promise<NextResponse<ActionResponse>> {
  const { from, to, amount } = data

  // Validate the payment request
  const validationError = validatePaymentRequest(to, amount, 'bark')
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  try {
    const fromPubkey = new PublicKey(from)
    const toPubkey = new PublicKey(to)

    // Create the payment transaction
    const transaction = await createPaymentTransaction(fromPubkey, toPubkey, amount, 'bark')

    // Simulate the transaction
    const simulation = await connection.simulateTransaction(transaction)
    if (simulation.value.err) {
      return NextResponse.json({ error: 'Transaction simulation failed' }, { status: 400 })
    }

    // In a real-world scenario, you would typically return the transaction for signing on the client-side
    // Here, we're using a simplified approach for demonstration purposes
    const signature = await sendBark(fromPubkey, toPubkey, amount)

    return NextResponse.json({
      success: true,
      data: {
        signature,
        message: `Successfully sent ${amount} BARK from ${from} to ${to}`
      }
    })
  } catch (error) {
    console.error('Error sending BARK:', error)
    return NextResponse.json({ error: 'Failed to send BARK' }, { status: 400 })
  }
}

async function handlePurchaseGiftCard(data: PurchaseGiftCardRequest): Promise<NextResponse<ActionResponse>> {
  try {
    const result = await purchaseGiftCard(data.publicKey, data.amount)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to purchase gift card' }, { status: 400 })
  }
}

async function handleRedeemGiftCard(data: RedeemGiftCardRequest): Promise<NextResponse<ActionResponse>> {
  try {
    const result = await redeemGiftCard(data.publicKey, data.giftCode)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to redeem gift card' }, { status: 400 })
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: 'BARK Blink Actions API is running' })
}

