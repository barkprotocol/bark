import { PublicKey } from '@solana/web3.js'
import { v4 as uuidv4 } from 'uuid'
import { GiftCard, PurchaseGiftCardResponse, RedeemGiftCardResponse } from './types'
import { BARK_TOKEN_MINT } from './constants'
import { getTokenAccountInfo, createAssociatedTokenAccountInstruction, createTransferInstruction } from '../solana'

// This would be replaced with an actual database in a production environment
let giftCardDatabase: GiftCard[] = []

export async function createGiftCard(amount: number, purchasedBy: string): Promise<PurchaseGiftCardResponse> {
  const giftCard: GiftCard = {
    id: uuidv4(),
    code: uuidv4(),
    amount,
    purchasedBy,
    purchasedAt: new Date(),
  }

  giftCardDatabase.push(giftCard)

  return {
    giftCode: giftCard.code,
  }
}

export async function getGiftCard(code: string): Promise<GiftCard | null> {
  return giftCardDatabase.find(gc => gc.code === code) || null
}

export async function redeemGiftCard(code: string, redeemedBy: string): Promise<RedeemGiftCardResponse> {
  const giftCard = await getGiftCard(code)

  if (!giftCard) {
    throw new Error('Gift card not found')
  }

  if (giftCard.redeemedBy) {
    throw new Error('Gift card has already been redeemed')
  }

  giftCard.redeemedBy = redeemedBy
  giftCard.redeemedAt = new Date()

  // In a real-world scenario, you would perform the token transfer here
  // For this example, we'll assume the transfer is successful

  return {
    amount: giftCard.amount,
  }
}

export async function transferGiftCardFunds(
  connection: Connection,
  giftCard: GiftCard,
  recipientPublicKey: PublicKey
): Promise<string> {
  const giftCardAccount = new PublicKey(process.env.GIFT_CARD_ACCOUNT!)
  const recipientTokenAccount = await getTokenAccountInfo(connection, recipientPublicKey, BARK_TOKEN_MINT)

  if (!recipientTokenAccount) {
    // If the recipient doesn't have a token account, create one
    const createAtaIx = createAssociatedTokenAccountInstruction(
      recipientPublicKey,
      recipientPublicKey,
      BARK_TOKEN_MINT
    )
    // You would need to send and confirm this transaction before proceeding
  }

  const transferIx = createTransferInstruction(
    giftCardAccount,
    recipientTokenAccount!.address,
    giftCardAccount,
    BigInt(giftCard.amount),
    [],
    BARK_TOKEN_MINT
  )

  // In a real-world scenario, you would create a transaction with this instruction,
  // sign it with the gift card account's keypair, and send it to the network
  // For this example, we'll just return a mock transaction signature
  return 'mock_transaction_signature'
}

export async function getGiftCardsByUser(userPublicKey: string): Promise<GiftCard[]> {
  return giftCardDatabase.filter(gc => gc.purchasedBy === userPublicKey || gc.redeemedBy === userPublicKey)
}

