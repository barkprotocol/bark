import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token'
import { NEXT_PUBLIC_USDC_COIN_MINT, BARK_MINT_ADDRESS } from './constants'

export async function transferSol(connection: Connection, from: PublicKey, to: PublicKey, amount: number) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amount,
    })
  )

  const { blockhash } = await connection.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  // In a real application, you would sign and send this transaction
  // For now, we'll just return the transaction
  return transaction
}

export async function transferUsdc(connection: Connection, from: PublicKey, to: PublicKey, amount: number) {
  const fromTokenAccount = await getAssociatedTokenAddress(NEXT_PUBLIC_USDC_COIN_MINT, from)
  const toTokenAccount = await getAssociatedTokenAddress(NEXT_PUBLIC_USDC_COIN_MINT, to)

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      from,
      toTokenAccount,
      to,
      NEXT_PUBLIC_USDC_COIN_MINT
    ),
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount
    )
  )

  const { blockhash } = await connection.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  // In a real application, you would sign and send this transaction
  // For now, we'll just return the transaction
  return transaction
}

export async function transferBark(connection: Connection, from: PublicKey, to: PublicKey, amount: number) {
  const fromTokenAccount = await getAssociatedTokenAddress(BARK_MINT_ADDRESS, from)
  const toTokenAccount = await getAssociatedTokenAddress(BARK_MINT_ADDRESS, to)

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      from,
      toTokenAccount,
      to,
      BARK_MINT_ADDRESS
    ),
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount
    )
  )

  const { blockhash } = await connection.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = from

  // In a real application, you would sign and send this transaction
  // For now, we'll just return the transaction
  return transaction
}
