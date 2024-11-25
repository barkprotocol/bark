import { PublicKey } from '@solana/web3.js'
import { TokenInfo } from './types'

export const BARK_TOKEN_MINT = new PublicKey('2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg')
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

export const PAYMENT_FEE_PERCENTAGE = 0.002 // 0.2%
export const TREASURY_FEE_PERCENTAGE = 0.001 // 0.1%

export const TOKEN_INFO: Record<string, TokenInfo> = {
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    icon: 'https://ucarecdn.com/8bcc4664-01b2-4a88-85bc-9ebce234f08b/sol.png?height=24&width=24',
    decimals: 9,
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    icon: 'https://ucarecdn.com/67e17a97-f3bd-46c0-8627-e13b8b939d26/usdc.png?height=24&width=24',
    decimals: 6,
    mint: USDC_MINT,
  },
  BARK: {
    name: 'BARK',
    symbol: 'BARK',
    icon: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp?height=24&width=24',
    decimals: 9,
    mint: BARK_TOKEN_MINT,
  },
}

export const QR_CODE_EXPIRATION_TIME = 300 // 5 minutes in seconds

export const SOLANA_NETWORK = 'mainnet-beta' // or 'devnet' for testing

export const MERCHANT_WALLET_ADDRESS = 'BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo'