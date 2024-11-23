'use client'

import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Gift, Send, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { purchaseGiftCard, redeemGiftCard } from '@/lib/blinks/api'

export default function GiftPage() {
  const { connected, publicKey } = useWallet()
  const { toast } = useToast()
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [redeemCode, setRedeemCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase a gift card.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const amount = parseFloat(purchaseAmount)
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid amount")
      }

      const result = await purchaseGiftCard(publicKey.toString(), amount)
      toast({
        title: "Gift Card Purchased",
        description: `You have successfully purchased a ${amount} BARK gift card. The code is: ${result.giftCode}`,
      })
      setPurchaseAmount('')
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to redeem a gift card.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await redeemGiftCard(publicKey.toString(), redeemCode)
      toast({
        title: "Gift Card Redeemed",
        description: `You have successfully redeemed a gift card for ${result.amount} BARK.`,
      })
      setRedeemCode('')
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!connected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access BARK Gift Cards.</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletMultiButton />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">BARK Gift Cards</h1>
        <Tabs defaultValue="purchase" className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
          </TabsList>
          <TabsContent value="purchase">
            <Card>
              <CardHeader>
                <CardTitle>Purchase a Gift Card</CardTitle>
                <CardDescription>Buy a BARK gift card for yourself or a friend.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePurchase}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="purchaseAmount">Amount (BARK)</Label>
                      <Input
                        id="purchaseAmount"
                        placeholder="Enter amount"
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                        type="number"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> Purchase Gift Card
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="redeem">
            <Card>
              <CardHeader>
                <CardTitle>Redeem a Gift Card</CardTitle>
                <CardDescription>Enter your gift card code to redeem BARK tokens.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRedeem}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="redeemCode">Gift Card Code</Label>
                      <Input
                        id="redeemCode"
                        placeholder="Enter gift card code"
                        value={redeemCode}
                        onChange={(e) => setRedeemCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleRedeem}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Gift className="mr-2 h-4 w-4" /> Redeem Gift Card
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

