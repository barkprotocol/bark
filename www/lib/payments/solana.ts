import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token'
import { PaymentMethod, TokenAccountInfo } from './types'
import { SOLANA_RPC_URL, BARK_TOKEN_MINT, USDC_COIN_MINT, DECIMALS } from './constants'
import { getTokenAccountInfo } from './utils'

const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export async function createPaymentTransaction(
  fromPubkey: PublicKey,
  toPubkey: PublicKey,
  amount: number,
  paymentMethod: string
): Promise<Transaction> {
  const transaction = new Transaction()

  if (paymentMethod === 'sol') {
    const lamports = Math.round(amount * LAMPORTS_PER_SOL)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      })
    )
  } else {
    const tokenMint = paymentMethod === 'bark' ? BARK_TOKEN_MINT : USDC_COIN_MINT
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(fromPubkey, tokenMint)
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(toPubkey, tokenMint)

    const tokenAmount = BigInt(Math.round(amount * (10 ** DECIMALS[paymentMethod])))

    transaction.add(
      createTransferInstruction(
        fromTokenAccount.pubkey,
        toTokenAccount.pubkey,
        fromPubkey,
        tokenAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    )
  }

  return transaction
}

async function getOrCreateAssociatedTokenAccount(
  owner: PublicKey,
  mint: PublicKey
): Promise<TokenAccountInfo> {
  const associatedTokenAddress = await getAssociatedTokenAddress(mint, owner)
  
  let tokenAccountInfo = await getTokenAccountInfo(connection, owner, mint)

  if (!tokenAccountInfo) {
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        owner,
        associatedTokenAddress,
        owner,
        mint
      )
    )

    const signature = await connection.sendTransaction(transaction, [])
    await connection.confirmTransaction(signature, 'confirmed')

    tokenAccountInfo = await getTokenAccountInfo(connection, owner, mint)

    if (!tokenAccountInfo) {
      throw new Error('Failed to create associated token account')
    }
  }

  return tokenAccountInfo
}

export async function getBalance(publicKey: PublicKey, paymentMethod: PaymentMethod['id']): Promise<number> {
  if (paymentMethod === 'sol') {
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } else {
    const mint = paymentMethod === 'bark' ? BARK_TOKEN_MINT : USDC_COIN_MINT
    const tokenAccountInfo = await getTokenAccountInfo(connection, publicKey, mint)
    
    if (!tokenAccountInfo) {
      return 0
    }

    return Number(tokenAccountInfo.account.amount) / (10 ** DECIMALS[paymentMethod])
  }
}

export async function sendAndConfirmTransaction(
  transaction: Transaction,
  signers: PublicKey[]
): Promise<string> {
  try {
    const signature = await connection.sendTransaction(transaction, signers)
    const confirmation = await connection.confirmTransaction(signature, 'confirmed')

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`)
    }

    return signature
  } catch (error) {
    console.error('Error sending transaction:', error)
    throw error
  }
}

export async function getRecentBlockhash(): Promise<string> {
  const { blockhash } = await connection.getRecentBlockhash()
  return blockhash
}

export function deserializeTransaction(serializedTransaction: string): Transaction {
  const buffer = Buffer.from(serializedTransaction, 'base64')
  return Transaction.from(buffer)
}

