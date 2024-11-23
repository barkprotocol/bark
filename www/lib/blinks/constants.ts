import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { createTransferInstruction } from '@solana/spl-token'
import { v4 as uuidv4 } from 'uuid'
import { PurchaseGiftCardRequest, GiftCard } from './types'
import { SOLANA_RPC_URL, BARK_TOKEN_MINT, GIFT_CARD_ACCOUNT } from './constants'
import { getTokenAccountInfo } from '../solana'
import { createGiftCard } from './gift-cards'

const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: PurchaseGiftCardRequest = await request.json()
    const { publicKey, amount } = body

    // Validate input
    if (!publicKey || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const userPublicKey = new PublicKey(publicKey)
    const giftCardAccount = new PublicKey(GIFT_CARD_ACCOUNT)

    // Check user's BARK balance
    const userTokenAccount = await getTokenAccountInfo(connection, userPublicKey, new PublicKey(BARK_TOKEN_MINT))
    if (!userTokenAccount || userTokenAccount.amount < BigInt(amount)) {
      return NextResponse.json({ error: 'Insufficient BARK balance' }, { status: 400 })
    }

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      userTokenAccount.address,
      giftCardAccount,
      userPublicKey,
      BigInt(amount),
      [],
      BARK_TOKEN_MINT
    )

    // Create and sign transaction
    const transaction = new Transaction().add(transferInstruction)
    const { blockhash } = await connection.getRecentBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = userPublicKey

    // In a real-world scenario, you would send this transaction to the client for signing
    // and then receive the signed transaction back for processing
    // For this example, we'll assume the transaction is successful

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
      }
    })

  } catch (error) {
    console.error('Error purchasing gift card:', error)
    return NextResponse.json({ error: 'Failed to purchase gift card' }, { status: 500 })
  }
}

