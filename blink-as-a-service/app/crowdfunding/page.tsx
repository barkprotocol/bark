'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import { transferSol, transferUsdc, transferBark, createAssociatedTokenAccount, transferToken } from '@/lib/crowdfunding/actions'
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Plus, DollarSign, Leaf, Users, AlertTriangle, LinkIcon, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { ConnectWalletButton } from '@/components/ui/connect-wallet-button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  SOLANA_PROGRAM_ID, 
  NEXT_PUBLIC_USDC_COIN_MINT, 
  TOKEN_PROGRAM_ID, 
  BARK_MINT_ADDRESS, 
  CAMPAIGN_TREASURY_ADDRESS, 
  SOLANA_NETWORK, 
  CREATION_FEE_PERCENTAGE, 
  SOLANA_EXPLORER_URL,
  CURRENCY_ICONS
} from '@/lib/crowdfunding/constants'

const CONNECTION = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`)

interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  creator: string
  endDate: Date
  category: 'Community' | 'Ecology' | 'Social' | 'Disaster Relief'
  impact: string
  socialMediaUrl?: string
  transactionSignature?: string
  imageUrl: string
  type: 'SOL' | 'USDC' | 'BARK'
  successPercentage: number
  escrowAddress: string
}

export default function CrowdfundingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [newCampaign, setNewCampaign] = useState({ 
    title: '', 
    description: '', 
    goal: '', 
    category: '', 
    impact: '',
    socialMediaUrl: '',
    imageUrl: '',
    type: 'SOL',
    successPercentage: 100
  })
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('All')
  const { connected, publicKey, signTransaction } = useWallet()
  const { toast } = useToast()

  useEffect(() => {
    if (connected) {
      fetchCampaigns()
    }
  }, [connected])

  const fetchCampaigns = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      toast({
        title: "Error",
        description: "Failed to fetch campaigns. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createEscrowAccount = async (amount: number, type: 'SOL' | 'USDC' | 'BARK') => {
    if (!publicKey || !signTransaction) throw new Error('Wallet not connected')

    // In a real implementation, this would interact with your Solana program
    // to create an escrow account. For now, we'll simulate it.
    const escrowKeypair = PublicKey.unique()
    
    switch (type) {
      case 'SOL':
        await transferSol(CONNECTION, publicKey, escrowKeypair, amount * LAMPORTS_PER_SOL)
        break
      case 'USDC':
        await transferUsdc(CONNECTION, publicKey, escrowKeypair, amount * 1_000_000) // USDC has 6 decimal places
        break
      case 'BARK':
        await transferBark(CONNECTION, publicKey, escrowKeypair, amount * 1_000_000_000) // Assuming BARK has 9 decimal places
        break
    }

    return escrowKeypair.toBase58()
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a campaign.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const goalAmount = parseFloat(newCampaign.goal)
      const creationFee = goalAmount * CREATION_FEE_PERCENTAGE
      const totalAmount = goalAmount + creationFee

      // Create escrow account
      const escrowAddress = await createEscrowAccount(totalAmount, newCampaign.type as 'SOL' | 'USDC' | 'BARK')

      // Send campaign data to the backend
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCampaign,
          creator: publicKey.toBase58(),
          escrowAddress,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create campaign')
      }

      const createdCampaign = await response.json()
      setCampaigns([...campaigns, createdCampaign])
      setNewCampaign({ 
        title: '', 
        description: '', 
        goal: '', 
        category: '', 
        impact: '', 
        socialMediaUrl: '',
        imageUrl: '',
        type: 'SOL',
        successPercentage: 100
      })
      toast({
        title: "Campaign Created",
        description: "Your crowdfunding campaign has been successfully created.",
      })
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDonate = async (campaignId: string, amount: number) => {
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to donate.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const campaign = campaigns.find(c => c.id === campaignId)
      if (!campaign) throw new Error('Campaign not found')

      switch (campaign.type) {
        case 'SOL':
          await transferSol(
            CONNECTION,
            publicKey,
            new PublicKey(campaign.escrowAddress),
            amount * LAMPORTS_PER_SOL
          )
          break
        case 'USDC':
          await transferUsdc(
            CONNECTION,
            publicKey,
            new PublicKey(campaign.escrowAddress),
            amount * 1_000_000 // USDC has 6 decimal places
          )
          break
        case 'BARK':
          await transferBark(
            CONNECTION,
            publicKey,
            new PublicKey(campaign.escrowAddress),
            amount * 1_000_000_000 // Assuming BARK has 9 decimal places
          )
          break
      }

      // Update the campaign's raised amount on the backend
      const response = await fetch(`/api/campaigns/${campaignId}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to update campaign')
      }

      const updatedCampaign = await response.json()
      setCampaigns(campaigns.map(c => c.id === campaignId ? updatedCampaign : c))
      toast({
        title: "Donation Successful",
        description: `You have successfully donated ${amount} ${campaign.type} to the campaign.`,
      })
    } catch (error) {
      console.error('Error donating:', error)
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCampaigns = filter === 'All' ? campaigns : campaigns.filter(campaign => campaign.category === filter)

  const getCategoryIcon = (category: Campaign['category']) => {
    switch (category) {
      case 'Ecology':
        return <Leaf className="h-5 w-5 text-green-500" />
      case 'Social':
        return <Users className="h-5 w-5 text-blue-500" />
      case 'Disaster Relief':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <DollarSign className="h-5 w-5 text-brown-[#D0BFB4]" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/" passHref>
        <Button variant="ghost" className="mb-4 hover:bg-primary/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main
        </Button>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">BARK | Crowdfunding Application</CardTitle>
            <CardDescription>Support community projects, ecological initiatives, social causes, and disaster relief efforts</CardDescription>
          </CardHeader>
          <CardContent>
            {connected ? (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Create New Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateCampaign} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Campaign Title</Label>
                        <Input
                          id="title"
                          value={newCampaign.title}
                          onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                          required
                          placeholder="Enter campaign title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Campaign Description</Label>
                        <Textarea
                          id="description"
                          value={newCampaign.description}
                          onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                          required
                          placeholder="Enter campaign description"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal">Funding Goal</Label>
                        <Input
                          id="goal"
                          type="number"
                          value={newCampaign.goal}
                          onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                          required
                          placeholder="Enter funding goal"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Campaign Type</Label>
                        <Select onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value as 'SOL' | 'USDC' | 'BARK' })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select campaign type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SOL">SOL</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="BARK">BARK</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setNewCampaign({ ...newCampaign, category: value as Campaign['category'] })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Community">Community</SelectItem>
                            <SelectItem value="Ecology">Ecology</SelectItem>
                            <SelectItem value="Social">Social</SelectItem>
                            <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="impact">Expected Impact</Label>
                        <Textarea
                          id="impact"
                          value={newCampaign.impact}
                          onChange={(e) => setNewCampaign({ ...newCampaign, impact: e.target.value })}
                          required
                          placeholder="Describe the expected impact of your campaign"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="socialMediaUrl">Social Media URL (Optional)</Label>
                        <Input
                          id="socialMediaUrl"
                          type="url"
                          value={newCampaign.socialMediaUrl}
                          onChange={(e) => setNewCampaign({ ...newCampaign, socialMediaUrl: e.target.value })}
                          placeholder="Enter social media URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Campaign Image URL</Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          value={newCampaign.imageUrl}
                          onChange={(e) => setNewCampaign({ ...newCampaign, imageUrl: e.target.value })}
                          required
                          placeholder="Enter campaign image URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="successPercentage">Success Percentage</Label>
                        <Input
                          id="successPercentage"
                          type="number"
                          value={newCampaign.successPercentage}
                          onChange={(e) => setNewCampaign({ ...newCampaign, successPercentage: parseInt(e.target.value) })}
                          required
                          min="1"
                          max="100"
                          placeholder="Enter success percentage"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Creation Fee: {(parseFloat(newCampaign.goal) * CREATION_FEE_PERCENTAGE).toFixed(2)} {newCampaign.type}
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Campaign
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                <div className="mb-6">
                  <Label htmlFor="filter">Filter Campaigns</Label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Campaigns</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Ecology">Ecology</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-6">
                  {filteredCampaigns.map((campaign) => (
                    <Card key={campaign.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{campaign.title}</CardTitle>
                          {getCategoryIcon(campaign.category)}
                        </div>
                        <CardDescription>Created by: {campaign.creator}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 relative h-48 w-full">
                          <Image
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        <p className="mb-4">{campaign.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress: {((campaign.raised / campaign.goal) * 100).toFixed(2)}%</span>
                            <span className="flex items-center">
                              <Image
                                src={CURRENCY_ICONS[campaign.type]}
                                alt={campaign.type}
                                width={20}
                                height={20}
                                className="mr-1"
                              />
                              {campaign.raised} / {campaign.goal} {campaign.type}
                            </span>
                          </div>
                          <Progress value={(campaign.raised / campaign.goal) * 100} />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                          Ends on: {campaign.endDate.toLocaleDateString()}
                        </p>
                        <p className="mt-2 text-sm font-semibold">Expected Impact:</p>
                        <p className="text-sm">{campaign.impact}</p>
                        <p className="mt-2 text-sm font-semibold">Success Percentage: {campaign.successPercentage}%</p>
                        {campaign.socialMediaUrl && (
                          <div className="mt-2">
                            <a href={campaign.socialMediaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center">
                              <LinkIcon className="h-4 w-4 mr-1" />
                              Social Media
                            </a>
                          </div>
                        )}
                        {campaign.transactionSignature && (
                          <div className="mt-2">
                            <a href={`${SOLANA_EXPLORER_URL}/tx/${campaign.transactionSignature}?cluster=${SOLANA_NETWORK}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center">
                              <LinkIcon className="h-4 w-4 mr-1" />
                              View on Solana Explorer
                            </a>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <form onSubmit={(e) => {
                          e.preventDefault()
                          const amount = parseFloat((e.target as HTMLFormElement).amount.value)
                          handleDonate(campaign.id, amount)
                        }} className="flex w-full space-x-2">
                          <Input
                            name="amount"
                            type="number"
                            placeholder={`Amount to donate (${campaign.type})`}
                            required
                            min="0"
                            step="0.01"
                          />
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <DollarSign className="h-4 w-4" />
                            )}
                            <span className="sr-only">Donate</span>
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="mb-4 text-lg text-muted-foreground">Please connect your wallet to view and create crowdfunding campaigns.</p>
                <ConnectWalletButton />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

