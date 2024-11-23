import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { PaymentRequest, PaymentResult } from '@/lib/payments/types'
import { validatePaymentRequest, simulateTransaction } from '@/lib/payments/utils'
import { createPaymentTransaction } from '@/lib/payments/solana'
import { SOLANA_RPC_URL } from '@/lib/payments/constants'

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    const { recipient, amount, paymentMethod } = body

    // Validate the payment request
    const validationError = validatePaymentRequest(recipient, amount, paymentMethod)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    // Create a connection to the Solana network
    const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

    // Create the payment transaction
    const fromPubkey = new PublicKey(request.headers.get('x-wallet-public-key') || '')
    const toPubkey = new PublicKey(recipient)
    const transaction = await createPaymentTransaction(fromPubkey, toPubkey, amount, paymentMethod)

    // Simulate the transaction
    const simulationResult = await simulateTransaction(connection, transaction)

    if (simulationResult.status === 'failed') {
      return NextResponse.json({ error: simulationResult.error }, { status: 400 })
    }

    // If simulation is successful, return the serialized transaction
    const serializedTransaction = transaction.serialize({ requireAllSignatures: false }).toString('base64')

    const response: PaymentResult = {
      status: 'pending',
      transactionId: transaction.signature?.toString(),
      serializedTransaction,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error processing payment request:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Payment API is running' })
}

