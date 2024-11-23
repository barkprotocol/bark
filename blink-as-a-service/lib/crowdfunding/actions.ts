import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js'
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { 
  NEXT_PUBLIC_USDC_COIN_MINT, 
  BARK_MINT_ADDRESS, 
  SOLANA_NETWORK 
} from './constants'

const CONNECTION = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`)

export async function transferSol(
  from: PublicKey, 
  to: PublicKey, 
  amount: number, 
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amount,
    })
  )

  const { blockhash } = await CONNECTION.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  const signedTransaction = await signTransaction(transaction)
  const signature = await sendAndConfirmTransaction(CONNECTION, signedTransaction, [])

  return signature
}

export async function transferUsdc(
  from: PublicKey, 
  to: PublicKey, 
  amount: number, 
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  const fromTokenAccount = await getAssociatedTokenAddress(NEXT_PUBLIC_USDC_COIN_MINT, from)
  const toTokenAccount = await getAssociatedTokenAddress(NEXT_PUBLIC_USDC_COIN_MINT, to)

  const transaction = new Transaction()

  // Check if the recipient's token account exists
  const toTokenAccountInfo = await CONNECTION.getAccountInfo(toTokenAccount)
  if (!toTokenAccountInfo) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        from,
        toTokenAccount,
        to,
        NEXT_PUBLIC_USDC_COIN_MINT
      )
    )
  }

  transaction.add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount
    )
  )

  const { blockhash } = await CONNECTION.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  const signedTransaction = await signTransaction(transaction)
  const signature = await sendAndConfirmTransaction(CONNECTION, signedTransaction, [])

  return signature
}

export async function transferBark(
  from: PublicKey, 
  to: PublicKey, 
  amount: number, 
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  const fromTokenAccount = await getAssociatedTokenAddress(BARK_MINT_ADDRESS, from)
  const toTokenAccount = await getAssociatedTokenAddress(BARK_MINT_ADDRESS, to)

  const transaction = new Transaction()

  // Check if the recipient's token account exists
  const toTokenAccountInfo = await CONNECTION.getAccountInfo(toTokenAccount)
  if (!toTokenAccountInfo) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        from,
        toTokenAccount,
        to,
        BARK_MINT_ADDRESS
      )
    )
  }

  transaction.add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount
    )
  )

  const { blockhash } = await CONNECTION.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  const signedTransaction = await signTransaction(transaction)
  const signature = await sendAndConfirmTransaction(CONNECTION, signedTransaction, [])

  return signature
}

export async function createAssociatedTokenAccount(
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  const associatedTokenAddress = await getAssociatedTokenAddress(mint, owner)

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      payer,
      associatedTokenAddress,
      owner,
      mint
    )
  )

  const { blockhash } = await CONNECTION.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = payer

  const signedTransaction = await signTransaction(transaction)
  const signature = await sendAndConfirmTransaction(CONNECTION, signedTransaction, [])

  return signature
}

export async function transferToken(
  from: PublicKey,
  fromTokenAccount: PublicKey,
  toTokenAccount: PublicKey,
  owner: PublicKey,
  amount: number,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  const transaction = new Transaction().add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      owner,
      amount
    )
  )

  const { blockhash } = await CONNECTION.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  const signedTransaction = await signTransaction(transaction)
  const signature = await sendAndConfirmTransaction(CONNECTION, signedTransaction, [])

  return signature
}

