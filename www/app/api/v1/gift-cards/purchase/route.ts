import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { v4 as uuidv4 } from 'uuid'
import { PurchaseGiftCardRequest, GiftCard } from '@/lib/blinks/types'
import { SOLANA_RPC_URL, BARK_TOKEN_MINT, GIFT_CARD_ACCOUNT } from '@/lib/blinks/constants'
import { getTokenAccountInfo } from '@/lib/solana'
import { createGiftCard } from '@/lib/blinks/gift-cards'

const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: PurchaseGiftCardRequest = await request.json()
    const { publicKey, amount } = body

    // Validate input
    if (!publicKey || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid input: Public key and amount are required, and amount must be greater than 0' }, { status: 400 })
    }

    const userPublicKey = new PublicKey(publicKey)
    const giftCardAccount = new PublicKey(GIFT_CARD_ACCOUNT)

    // Check user's BARK balance
    const userTokenAccount = await getTokenAccountInfo(connection, userPublicKey, new PublicKey(BARK_TOKEN_MINT))
    if (!userTokenAccount) {
      return NextResponse.json({ error: 'User does not have a BARK token account' }, { status: 400 })
    }
    if (userTokenAccount.amount < BigInt(amount)) {
      return NextResponse.json({ error: 'Insufficient BARK balance' }, { status: 400 })
    }

    // Get or create associated token account for the gift card account
    const giftCardATA = await getAssociatedTokenAddress(
      new PublicKey(BARK_TOKEN_MINT),
      giftCardAccount
    )

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      userTokenAccount.address,
      giftCardATA,
      userPublicKey,
      BigInt(amount),
      [],
      new PublicKey(BARK_TOKEN_MINT)
    )

    // Create and sign transaction
    const transaction = new Transaction().add(transferInstruction)
    const { blockhash } = await connection.getRecentBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = userPublicKey

    // In a real-world scenario, you would send this transaction to the client for signing
    // and then receive the signed transaction back for processing
    // For this example, we'll simulate a successful transaction
    const simulatedSignature = await connection.simulateTransaction(transaction)
    
    if (simulatedSignature.value.err) {
      return NextResponse.json({ error: 'Transaction simulation failed', details: simulatedSignature.value.err }, { status: 400 })
    }

    // Create gift card
    const giftCardCode = uuidv4()
    const giftCard: GiftCard = {
      id: uuidv4(),
      code: giftCardCode,
      amount: amount,
      purchasedBy: publicKey,
      purchasedAt: new Date(),
    }

    await createGiftCard(giftCard)

    return NextResponse.json({
      success: true,
      data: {
        giftCode: giftCardCode,
        amount: amount,
        transactionSignature: simulatedSignature.value.logs ? simulatedSignature.value.logs[0] : 'Simulated transaction successful',
      }
    })

  } catch (error) {
    console.error('Error purchasing gift card:', error)
    return NextResponse.json({ 
      error: 'Failed to purchase gift card', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ message: 'Gift card purchase endpoint is working' })
}

