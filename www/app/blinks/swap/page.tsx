'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeftRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchBlinks, swapBlinks } from '@/lib/blinks/api'
import { Blink } from '@/lib/blinks/types'

export default function SwapPage() {
  const { connected, publicKey } = useWallet()
  const { toast } = useToast()
  const [userBlinks, setUserBlinks] = useState<Blink[]>([])
  const [availableBlinks, setAvailableBlinks] = useState<Blink[]>([])
  const [selectedUserBlink, setSelectedUserBlink] = useState<string>('')
  const [selectedAvailableBlink, setSelectedAvailableBlink] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (connected && publicKey) {
      fetchUserBlinks()
      fetchAvailableBlinks()
    }
  }, [connected, publicKey])

  const fetchUserBlinks = async () => {
    setIsLoading(true)
    try {
      const blinks = await fetchBlinks(publicKey!.toString())
      setUserBlinks(blinks)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch your Blinks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAvailableBlinks = async () => {
    setIsLoading(true)
    try {
      const blinks = await fetchBlinks() // Fetch all available Blinks
      setAvailableBlinks(blinks.filter(blink => blink.owner !== publicKey!.toString()))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch available Blinks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwap = async () => {
    if (!selectedUserBlink || !selectedAvailableBlink) {
      toast({
        title: "Error",
        description: "Please select Blinks to swap.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await swapBlinks(publicKey!.toString(), selectedUserBlink, selectedAvailableBlink)
      toast({
        title: "Success",
        description: "Blinks swapped successfully!",
      })
      fetchUserBlinks()
      fetchAvailableBlinks()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to swap Blinks. Please try again.",
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
            <CardDescription>Please connect your wallet to access the Blink Swap feature.</CardDescription>
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
        <h1 className="text-4xl font-bold mb-8 text-center">Swap Your Blinks</h1>
        <Card>
          <CardHeader>
            <CardTitle>Blink Swap</CardTitle>
            <CardDescription>Exchange your Blinks with other users in the BARK Protocol ecosystem.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="userBlink">Your Blink</Label>
                <Select value={selectedUserBlink} onValueChange={setSelectedUserBlink}>
                  <SelectTrigger id="userBlink">
                    <SelectValue placeholder="Select your Blink" />
                  </SelectTrigger>
                  <SelectContent>
                    {userBlinks.map((blink) => (
                      <SelectItem key={blink.id} value={blink.id}>
                        {blink.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availableBlink">Available Blink</Label>
                <Select value={selectedAvailableBlink} onValueChange={setSelectedAvailableBlink}>
                  <SelectTrigger id="availableBlink">
                    <SelectValue placeholder="Select available Blink" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBlinks.map((blink) => (
                      <SelectItem key={blink.id} value={blink.id}>
                        {blink.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSwap} 
              disabled={isLoading || !selectedUserBlink || !selectedAvailableBlink}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Swapping...
                </>
              ) : (
                <>
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Swap Blinks
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

