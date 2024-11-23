'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection, TransactionInstruction } from '@solana/web3.js'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, ArrowLeft, Gift, FileText, Image, Vote, Info } from 'lucide-react'
import Link from 'next/link'
import { ConnectWalletButton } from '@/components/ui/connect-wallet-button'
import { motion } from 'framer-motion'
import { SOLANA_NETWORK } from '@/lib/crowdfunding/constants'

interface Blink {
  id: string;
  name: string;
  type: 'blink' | 'spl' | 'nft' | 'gift' | 'governance';
}

export default function SendBlinkPage() {
  const [selectedBlink, setSelectedBlink] = useState('')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [blinks, setBlinks] = useState<Blink[]>([])
  const { connected, publicKey, signTransaction } = useWallet()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (connected && publicKey) {
      fetchBlinks()
    }
  }, [connected, publicKey])

  const fetchBlinks = async () => {
    setIsLoading(true)
    try {
      // In a BARK Blink application, this API call to fetch the user's Blinks and SPL tokens
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockBlinks: Blink[] = [
        { id: 'blink1', name: 'My First Blink', type: 'blink' },
        { id: 'spl1', name: 'USDC', type: 'spl' },
        { id: 'nft1', name: 'BARK NFT', type: 'nft' },
        { id: 'gift1', name: 'Birthday Gift', type: 'gift' },
        { id: 'gov1', name: 'Governance Proposal', type: 'governance' },
      ]
      setBlinks(mockBlinks)
    } catch (error) {
      console.error('Error fetching Blinks:', error)
      toast({
        title: "Error",
        description: "Failed to fetch your Blinks and SPL tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to send a Blink or token.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const selectedBlinkObj = blinks.find(b => b.id === selectedBlink)
      if (!selectedBlinkObj) throw new Error('Invalid selection')

      const recipientPubkey = new PublicKey(recipient)
      let transaction = new Transaction()

      switch (selectedBlinkObj.type) {
        case 'blink':
          // Simulated Blink transfer (replace with actual Blink transfer logic)
          transaction.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: recipientPubkey,
              lamports: LAMPORTS_PER_SOL / 100, // Small amount for demonstration
            })
          )
          break
        case 'spl':
          // SPL token transfer (example with USDC)
          const usdcMint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') // USDC mint on mainnet
          const token = new Token(
            connection,
            usdcMint,
            TOKEN_PROGRAM_ID,
            publicKey
          )
          const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(publicKey)
          const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(recipientPubkey)
          
          transaction.add(
            Token.createTransferInstruction(
              TOKEN_PROGRAM_ID,
              fromTokenAccount.address,
              toTokenAccount.address,
              publicKey,
              [],
              parseFloat(amount) * (10 ** 6) // USDC has 6 decimal places
            )
          )
          break
        case 'nft':
          // NFT transfer (simplified, actual implementation would require fetching NFT data)
          const nftMint = new PublicKey('YOUR_NFT_MINT_ADDRESS')
          const nftToken = new Token(
            connection,
            nftMint,
            TOKEN_PROGRAM_ID,
            publicKey
          )
          const fromNftAccount = await nftToken.getOrCreateAssociatedAccountInfo(publicKey)
          const toNftAccount = await nftToken.getOrCreateAssociatedAccountInfo(recipientPubkey)
          
          transaction.add(
            Token.createTransferInstruction(
              TOKEN_PROGRAM_ID,
              fromNftAccount.address,
              toNftAccount.address,
              publicKey,
              [],
              1 // NFTs typically have a quantity of 1
            )
          )
          break
        case 'gift':
          // Gift transfer (simplified, could include multiple tokens or special metadata)
          transaction.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: recipientPubkey,
              lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
            })
          )
          break
        case 'governance':
          // Governance action (simplified, actual implementation would interact with governance program)
          const governanceProgram = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw') // Governance program ID
          // Add governance instruction (this is a placeholder, actual instruction would depend on the specific action)
          break
      }

      // Add memo instruction if memo is provided
      if (memo) {
        const memoProgram = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')
        transaction.add(
          new TransactionInstruction({
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: Buffer.from(memo, 'utf-8'),
            programId: memoProgram
          })
        )
      }

      const connection = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`)
      const latestBlockhash = await connection.getLatestBlockhash()
      transaction.recentBlockhash = latestBlockhash.blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(signature)

      toast({
        title: "Transaction Successful",
        description: `Your ${selectedBlinkObj.type} has been sent successfully! Transaction signature: ${signature}`,
      })
      router.push('/my-blinks')
    } catch (error) {
      console.error('Error sending transaction:', error)
      toast({
        title: "Error",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderAdditionalFields = () => {
    const selectedBlinkObj = blinks.find(b => b.id === selectedBlink)
    if (!selectedBlinkObj) return null

    switch (selectedBlinkObj.type) {
      case 'spl':
      case 'gift':
        return (
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
        )
      case 'governance':
        return (
          <div className="space-y-2">
            <Label htmlFor="proposal">Proposal</Label>
            <Textarea
              id="proposal"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Enter governance proposal"
              required
            />
          </div>
        )
      default:
        return null
    }
  }

  const getButtonIcon = () => {
    const selectedBlinkObj = blinks.find(b => b.id === selectedBlink)
    if (!selectedBlinkObj) return <Send className="mr-2 h-4 w-4" />

    switch (selectedBlinkObj.type) {
      case 'gift':
        return <Gift className="mr-2 h-4 w-4" />
      case 'nft':
        return <Image className="mr-2 h-4 w-4" />
      case 'governance':
        return <Vote className="mr-2 h-4 w-4" />
      default:
        return <Send className="mr-2 h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Send a Blink or Token</CardTitle>
            <CardDescription>Transfer your Blink, SPL token, NFT, or perform a governance action on the Solana network</CardDescription>
          </CardHeader>
          <CardContent>
            {connected ? (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blink">Select Blink or Token</Label>
                  <Select value={selectedBlink} onValueChange={setSelectedBlink}>
                    <SelectTrigger id="blink">
                      <SelectValue placeholder="Choose a Blink or Token" />
                    </SelectTrigger>
                    <SelectContent>
                      {blinks.map((blink) => (
                        <SelectItem key={blink.id} value={blink.id}>{blink.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter Solana address"
                    required
                  />
                </div>
                {renderAdditionalFields()}
                <div className="space-y-2">
                  <Label htmlFor="memo">Memo (Optional)</Label>
                  <Input
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Enter an optional memo"
                  />
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="mb-4 text-lg text-muted-foreground">Please connect your wallet to send a Blink or token.</p>
                <ConnectWalletButton />
              </div>
            )}
          </CardContent>
          {connected && (
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                onClick={handleSend}
                disabled={isLoading || !selectedBlink || !recipient}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {getButtonIcon()}
                    Send
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" onClick={() => router.push('/send/how-it-works')}>
            <Info className="mr-2 h-4 w-4" />
            How It Works
          </Button>
          <Button variant="outline" onClick={() => router.push('/my-blinks')}>
            View My Blinks
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
