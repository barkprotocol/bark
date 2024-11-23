'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import { NFTStorage, File } from 'nft.storage'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createSignerFromKeypair, signerIdentity, publicKey, transactionBuilder, Transaction } from '@metaplex-foundation/umi'
import { addPlugin, updatePlugin, fetchAsset, removePlugin } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Upload, CloudUpload, Coins, Settings, X, Info } from 'lucide-react'
import Link from 'next/link'
import { ConnectWalletButton } from '@/components/ui/connect-wallet-button'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MERKLE_TREE_ADDRESS, 
  NFT_STORAGE_API,
  SERVICE_FEE_PERCENTAGE,
  SOLANA_TRANSACTION_FEE,
  MIN_ROYALTY_PERCENTAGE,
  MAX_ROYALTY_PERCENTAGE,
  DEFAULT_ROYALTY_PERCENTAGE
} from '@/lib/nft/constants'
import Image from 'next/image'
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const CREATION_FEE_PERCENTAGE = 0.002 // 0.2%
const SOLANA_FEE = 0.000005 // Approximate Solana transaction fee in SOL

export default function CreateCNFTPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [nftUrl, setNftUrl] = useState('')
  const [nftAddress, setNftAddress] = useState('')
  const [customApi, setCustomApi] = useState('')
  const [customCollection, setCustomCollection] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [royaltyPercentage, setRoyaltyPercentage] = useState(DEFAULT_ROYALTY_PERCENTAGE)
  const [showInfoCard, setShowInfoCard] = useState(true)
  const { connected, publicKey: walletPublicKey, signTransaction } = useWallet()
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoCard(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleRemoveImage = useCallback(() => {
    setImage(null)
    setImagePreview(null)
  }, [])

  const uploadToNFTStorage = async () => {
    if (!image) return

    const nftStorage = new NFTStorage({ token: customApi || NFT_STORAGE_API })
    
    // Upload the image and metadata
    const metadata = await nftStorage.store({
      name,
      description,
      image,
    })

    return metadata.url
  }

  const mintNFT = async (metadataUri: string) => {
    const treeAddress = customCollection || MERKLE_TREE_ADDRESS
    if (!treeAddress || !walletPublicKey) {
      throw new Error('Merkle tree address or wallet not configured')
    }

    const umi = createUmi('https://api.mainnet-beta.solana.com')
    const signer = createSignerFromKeypair(umi, {
      publicKey: walletPublicKey.toBase58(),
      secretKey: new Uint8Array(0), // We don't have access to the secret key
    })
    umi.use(signerIdentity(signer))

    const merkleTree = publicKey(treeAddress)
    
    // Create the compressed NFT
    const tx = transactionBuilder()
      .add(
        addPlugin({
          name: 'Compressed NFT',
          uri: metadataUri,
          sellerFeeBasisPoints: royaltyPercentage * 100, // Convert percentage to basis points
          compression: {
            compressed: true,
            tree: merkleTree,
            limit: 10000,
          },
        })
      )

    const { signature } = await tx.sendAndConfirm(umi)
    
    // Fetch the created asset
    const asset = await fetchAsset(umi, publicKey(base58.serialize(signature)))

    return asset
  }

  const handleCreateCNFT = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !walletPublicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a compressed NFT.",
        variant: "destructive",
      })
      return
    }

    if (!name || !description || !image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an image.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Step 1: Upload to NFT.storage
      setStep(1)
      const metadataUrl = await uploadToNFTStorage()
      if (!metadataUrl) throw new Error('Failed to upload to NFT.storage')
      setNftUrl(metadataUrl)

      // Step 2: Mint NFT
      setStep(2)
      const { nftAddress, metadataUri } = await createAndMintNFT(
        { name, description, image: image as File, royaltyPercentage },
        walletPublicKey.toString()
      )
      setNftAddress(nftAddress)

      toast({
        title: "Compressed NFT Created",
        description: `Successfully created compressed NFT: ${name}`,
      })
      setName('')
      setDescription('')
      setImage(null)
      setImagePreview(null)
      setStep(1)
    } catch (error) {
      console.error('Error creating compressed NFT:', error)
      toast({
        title: "Error",
        description: "Failed to create compressed NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateFees = (royaltyPercentage: number) => {
    const serviceFee = SERVICE_FEE_PERCENTAGE / 100
    return {
      serviceFee,
      solanaTxFee: SOLANA_TRANSACTION_FEE,
      totalFee: serviceFee + SOLANA_TRANSACTION_FEE,
      royalty: royaltyPercentage
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/" passHref>
        <Button variant="ghost" className="mb-4 hover:bg-primary/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main
        </Button>
      </Link>
      <AnimatePresence>
        {showInfoCard && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Alert className="bg-white border border-brown-[#D0BFB4] dark:bg-card">
              <Info className="h-4 w-4 text-brown-[#D0BFB4]" />
              <AlertTitle>Important Information</AlertTitle>
              <AlertDescription>
                Creating a Compressed NFT involves a service fee of {SERVICE_FEE_PERCENTAGE}% plus Solana network fees.
                You can set custom royalties for your NFT. This info will auto-hide in 15 seconds.
              </AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowInfoCard(false)}
              >
                Close
              </Button>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Create Compressed NFT</CardTitle>
            <CardDescription>Mint a new compressed NFT on the Solana blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            {connected ? (
              <form onSubmit={handleCreateCNFT} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">NFT Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter NFT description"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                      className={imagePreview ? 'hidden' : ''}
                    />
                    {imagePreview && (
                      <div className="relative">
                        <Image
                          src={imagePreview}
                          alt="NFT Preview"
                          width={100}
                          height={100}
                          className="object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Change Image
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="royalty">Royalty Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="royalty"
                      min={MIN_ROYALTY_PERCENTAGE}
                      max={MAX_ROYALTY_PERCENTAGE}
                      step={0.1}
                      value={[royaltyPercentage]}
                      onValueChange={(value) => setRoyaltyPercentage(value[0])}
                    />
                    <span>{royaltyPercentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                  </Button>
                </div>
                {showAdvanced && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="customApi">Custom NFT.storage API Key (Optional)</Label>
                      <Input
                        id="customApi"
                        value={customApi}
                        onChange={(e) => setCustomApi(e.target.value)}
                        placeholder="Enter your NFT.storage API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customCollection">Custom Collection Address (Optional)</Label>
                      <Input
                        id="customCollection"
                        value={customCollection}
                        onChange={(e) => setCustomCollection(e.target.value)}
                        placeholder="Enter your collection address"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label>Creation Fees</Label>
                  <p className="text-sm text-muted-foreground">
                    Service Fee: {SERVICE_FEE_PERCENTAGE}% + Solana Fee: {SOLANA_TRANSACTION_FEE} SOL
                  </p>
                  <p className="text-sm font-semibold">
                    Total Fee: {calculateFees(royaltyPercentage).totalFee.toFixed(6)} SOL
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Royalty: {royaltyPercentage.toFixed(1)}%
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading || !name || !description || !image}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {step === 1 && "Uploading to NFT.storage..."}
                      {step === 2 && "Minting NFT..."}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Create Compressed NFT
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="mb-4 text-lg text-muted-foreground">Please connect your wallet to create a compressed NFT.</p>
                <ConnectWalletButton />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <div className="h-16" /> {/* Empty space */}
      {nftUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-2">
                <CloudUpload className="h-5 w-5 text-primary" />
                <span className="font-semibold">NFT.storage URL:</span>
                <span className="text-sm break-all">{nftUrl}</span>
              </div>
              {nftAddress && (
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-primary" />
                  <span className="font-semibold">NFT Address:</span>
                  <span className="text-sm break-all">{nftAddress}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}