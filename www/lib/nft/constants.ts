// Merkle tree address for compressed NFTs
export const MERKLE_TREE_ADDRESS = process.env.NEXT_PUBLIC_MERKLE_TREE_ADDRESS

// NFT.storage API key
export const NFT_STORAGE_API = process.env.NFT_STORAGE_API

// RPC endpoint for Solana
export const SOLANA_RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com'

// Maximum number of NFTs in the collection
export const MAX_COLLECTION_SIZE = 10000

// Royalty percentage (500 basis points = 5%)
export const ROYALTY_BASIS_POINTS = 500

// Default values for NFT creation
export const DEFAULT_NFT_SYMBOL = 'CNFT'
export const DEFAULT_NFT_SELLER_FEE_BASIS_POINTS = 500 // 5%

// IPFS gateway URL
export const IPFS_GATEWAY_URL = 'https://ipfs.io/ipfs/'

// Solana Explorer URL
export const SOLANA_EXPLORER_URL = 'https://explorer.solana.com'

// Rate limiting
export const RATE_LIMIT_REQUESTS = 10
export const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute

