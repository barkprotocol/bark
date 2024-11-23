import { PublicKey } from '@solana/web3.js'

// Solana network configuration
export const SOLANA_NETWORK = 'mainnet'
export const SOLANA_RPC_URL = `https://api.${SOLANA_NETWORK}.solana.com`

// Program and token addresses
export const SOLANA_ESCROW_PROGRAM_ID = new PublicKey('YOUR_PROGRAM_ID_HERE')
export const NEXT_PUBLIC_USDC_COIN_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
export const BARK_MINT_ADDRESS = new PublicKey('2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg')
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
export const CAMPAIGN_TREASURY_ADDRESS = new PublicKey('BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo')

// Application settings
export const CREATION_FEE_PERCENTAGE = 0.0025 // 0.25%
export const SOLANA_EXPLORER_URL = `https://explorer.solana.com`

export const CURRENCY_ICONS = {
  SOL: 'https://ucarecdn.com/0aa23f11-40b3-4cdc-891b-a169ed9f9328/sol.png',
  USDC: 'https://ucarecdn.com/ee18c01a-d01d-4ad6-adb6-cac9a5539d2c/usdc.png',
  BARK: 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png'
}

// Decimal places for different tokens
export const TOKEN_DECIMALS = {
    SOL: 9,
    USDC: 6,
    BARK: 9
  }
  
  // Campaign categories
  export const CAMPAIGN_CATEGORIES = [
    'Community',
    'Ecology',
    'Social',
    'Disaster Relief'
  ] as const
  
  // Campaign types
  export const CAMPAIGN_TYPES = [
    'SOL',
    'USDC',
    'BARK'
  ] as const
  
  // Default campaign duration in days
  export const DEFAULT_CAMPAIGN_DURATION = 30
