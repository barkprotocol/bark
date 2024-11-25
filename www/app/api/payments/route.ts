import { NextResponse } from 'next/server'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { 
  SOLANA_NETWORK, 
  MERCHANT_WALLET_ADDRESS, 
  BARK_TOKEN_MINT, 
  USDC_MINT,
  TOKEN_INFO
} from '@/utils/payments/constants'

export async function POST(request: Request) {
  try {
    const { amount, fromToken, buyerPublicKey } = await request.json()

    // Validate input
    if (!amount || !fromToken || !buyerPublicKey) {
      return NextResponse.json({ error: 'Invalid input: amount, fromToken, and buyerPublicKey are required' }, { status: 400 })
    }

    if (!['SOL', 'USDC'].includes(fromToken)) {
      return NextResponse.json({ error: 'Invalid fromToken. Must be SOL or USDC' }, { status: 400 })
    }

    // Connect to Solana network
    const connection = new Connection(SOLANA_NETWORK, 'confirmed')

    let transaction: Transaction

    if (fromToken === 'SOL') {
      // Create SOL transfer transaction
      transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(buyerPublicKey),
          toPubkey: new PublicKey(MERCHANT_WALLET_ADDRESS),
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      )
    } else {
      // For USDC, create SPL token transfer transaction
      const tokenMintAddress = USDC_MINT
      const fromTokenAccount = await getAssociatedTokenAddress(
        tokenMintAddress,
        new PublicKey(buyerPublicKey)
      )
      const toTokenAccount = await getAssociatedTokenAddress(
        tokenMintAddress,
        new PublicKey(MERCHANT_WALLET_ADDRESS)
      )

      transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          new PublicKey(buyerPublicKey),
          Math.floor(amount * (10 ** TOKEN_INFO[fromToken].decimals)),
          [],
          TOKEN_PROGRAM_ID
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

    // Generate a unique transaction ID
    const transactionId = generateTransactionId()

    // Return the serialized transaction and transaction ID
    return NextResponse.json({ 
      transaction: base64Transaction,
      transactionId: transactionId,
    })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json({ error: 'Payment processing failed', details: (error as Error).message }, { status: 500 })
  }
}

function generateTransactionId(): string {
  return 'txn_' + Math.random().toString(36).substr(2, 9)
}