import { NFTStorage, File } from 'nft.storage'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createSignerFromKeypair, signerIdentity, publicKey, transactionBuilder } from '@metaplex-foundation/umi'
import { addPlugin, fetchAsset } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { 
  MERKLE_TREE_ADDRESS, 
  NFT_STORAGE_API, 
  SOLANA_RPC_ENDPOINT,
  MAX_COLLECTION_SIZE,
  ROYALTY_BASIS_POINTS
} from './constants'

// Initialize NFT.storage client
const nftStorage = new NFTStorage({ token: NFT_STORAGE_API })

// Initialize UMI
const umi = createUmi(SOLANA_RPC_ENDPOINT)

export interface NFTMetadata {
  name: string
  description: string
  image: File
  attributes?: Array<{ trait_type: string; value: string }>
}

export async function uploadToNFTStorage(metadata: NFTMetadata): Promise<string> {
  try {
    const result = await nftStorage.store({
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      attributes: metadata.attributes
    })
    return result.url
  } catch (error) {
    console.error('Error uploading to NFT.storage:', error)
    throw new Error('Failed to upload metadata to NFT.storage')
  }
}

export async function mintCompressedNFT(
  metadataUri: string, 
  name: string, 
  walletPublicKey: string
): Promise<string> {
  try {
    if (!MERKLE_TREE_ADDRESS) {
      throw new Error('Merkle tree address not configured')
    }

    const signer = createSignerFromKeypair(umi, {
      publicKey: walletPublicKey,
      secretKey: new Uint8Array(0), // We don't have access to the secret key
    })
    umi.use(signerIdentity(signer))

    const merkleTree = publicKey(MERKLE_TREE_ADDRESS)
    
    const tx = transactionBuilder()
      .add(
        addPlugin({
          name: name,
          uri: metadataUri,
          sellerFeeBasisPoints: ROYALTY_BASIS_POINTS,
          compression: {
            compressed: true,
            tree: merkleTree,
            limit: MAX_COLLECTION_SIZE,
          },
        })
      )

    const { signature } = await tx.sendAndConfirm(umi)
    
    // Fetch the created asset
    const asset = await fetchAsset(umi, publicKey(base58.serialize(signature)))

    return asset.id.toString()
  } catch (error) {
    console.error('Error minting compressed NFT:', error)
    throw new Error('Failed to mint compressed NFT')
  }
}

export async function createAndMintNFT(
  metadata: NFTMetadata,
  walletPublicKey: string
): Promise<{ metadataUri: string; nftAddress: string }> {
  try {
    const metadataUri = await uploadToNFTStorage(metadata)
    const nftAddress = await mintCompressedNFT(metadataUri, metadata.name, walletPublicKey)
    return { metadataUri, nftAddress }
  } catch (error) {
    console.error('Error creating and minting NFT:', error)
    throw new Error('Failed to create and mint NFT')
  }
}

export async function fetchNFTMetadata(mintAddress: string): Promise<NFTMetadata> {
  try {
    const asset = await fetchAsset(umi, publicKey(mintAddress))
    const response = await fetch(asset.uri)
    if (!response.ok) {
      throw new Error('Failed to fetch NFT metadata')
    }
    const metadata = await response.json()
    return metadata
  } catch (error) {
    console.error('Error fetching NFT metadata:', error)
    throw new Error('Failed to fetch NFT metadata')
  }
}

