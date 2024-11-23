import { NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js'
import { SOLANA_NETWORK, MERCHANT_WALLET_ADDRESS, CURRENCY_OPTIONS } from '@/utils/payments/constants'
import { TokenProgram, Token, u64 } from '@solana/spl-token'

export async function POST(request: Request) {
  try {
    const { amount, currency, buyerPublicKey } = await request.json()

    // Validate input
    if (!amount || !currency || !buyerPublicKey) {
      return NextResponse.json({ error: 'Invalid input: amount, currency, and buyerPublicKey are required' }, { status: 400 })
    }

    if (!CURRENCY_OPTIONS.includes(currency)) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 })
    }

    // Connect to Solana network
    const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), 'confirmed')

    let transaction: Transaction

    if (currency === 'sol') {
      // Create SOL transfer transaction
      transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(buyerPublicKey),
          toPubkey: new PublicKey(MERCHANT_WALLET_ADDRESS),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      )
    } else {
      // For other currencies (USDC, BARK), create SPL token transfer transaction
      const tokenMintAddress = getTokenMintAddress(currency)
      const tokenProgramId = TokenProgram.programId
      const fromTokenAccount = await Token.getAssociatedTokenAddress(
        tokenProgramId,
        new PublicKey(tokenMintAddress),
        new PublicKey(buyerPublicKey)
      )
      const toTokenAccount = await Token.getAssociatedTokenAddress(
        tokenProgramId,
        new PublicKey(tokenMintAddress),
        new PublicKey(MERCHANT_WALLET_ADDRESS)
      )

      transaction = new Transaction().add(
        Token.createTransferInstruction(
          tokenProgramId,
          fromTokenAccount,
          toTokenAccount,
          new PublicKey(buyerPublicKey),
          [],
          new u64(amount * (10 ** getTokenDecimals(currency)))
        )
      )
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = new PublicKey(buyerPublicKey)

    // Serialize the transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    })

    // Convert to base64
    const base64Transaction = serializedTransaction.toString('base64')

    // Return the serialized transaction
    return NextResponse.json({ transaction: base64Transaction })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json({ error: 'Payment processing failed', details: (error as Error).message }, { status: 500 })
  }
}

function getTokenMintAddress(currency: string): string {
  switch (currency) {
    case 'usdc':
      return 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' // USDC token mint address on mainnet
    case 'bark':
      return '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg'
    default:
      throw new Error('Invalid currency for token transfer')
  }
}

function getTokenDecimals(currency: string): number {
  switch (currency) {
    case 'usdc':
      return 6
    case 'bark':
      return 9 // BARK uses 9 decimals
    default:
      throw new Error('Invalid currency for token transfer')
  }
}
