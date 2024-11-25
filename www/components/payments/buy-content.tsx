'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, CreditCard, InfoIcon, RefreshCw } from 'lucide-react'
import { WalletButton } from '@/components/ui/wallet-button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { BARK_TOKEN_MINT, USDC_MINT } from '@/lib/payments/constants'
import { createPayment, verifyPayment, getTokenIconUrl } from '@/lib/payments/api'
import { useToast } from "@/components/ui/use-toast"
import QRCodeGenerator from './qr-code-generator'

const tokenInfo = {
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    mint: USDC_MINT,
  },
  BARK: {
    name: 'BARK',
    symbol: 'BARK',
    decimals: 9,
    mint: BARK_TOKEN_MINT,
  },
}

export function BuyContent() {
  const [amount, setAmount] = useState<string>('')
  const [fromToken, setFromToken] = useState<'SOL' | 'USDC'>('SOL')
  const [toToken] = useState<'BARK'>('BARK')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<{ transactionId: string; signature: string } | null>(null)
  const { connection } = useConnection()
  const wallet = useWallet()
  const { toast } = useToast()

  const handleReset = () => {
    setAmount('')
    setPaymentInfo(null)
    setError(null)
  }

  const handleGenerateQR = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (!wallet.connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before generating a QR code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { transactionId, signature } = await createPayment({
        buyerPublicKey: wallet.publicKey?.toBase58() || '',
        amount: parseFloat(amount),
        fromToken,
      })

      setPaymentInfo({ transactionId, signature })
      toast({
        title: "QR Code Generated",
        description: "Scan the QR code to complete your purchase.",
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
      setError('Failed to generate QR code. Please try again.')
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyPayment = async () => {
    if (!paymentInfo) {
      setError('No payment to verify')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { status } = await verifyPayment({ transactionId: paymentInfo.transactionId })
      toast({
        title: "Payment Verification",
        description: `Payment status: ${status}`,
      })

      if (status === 'completed') {
        handleReset()
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      setError('Failed to verify payment. Please try again.')
      toast({
        title: "Error",
        description: "Failed to verify payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-primary" />
            Buy BARK Tokens
          </CardTitle>
          <CardDescription>Purchase BARK tokens securely using SOL or USDC</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Select value={fromToken} onValueChange={(value) => setFromToken(value as 'SOL' | 'USDC')}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select token to pay with" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">
                  <div className="flex items-center">
                    <Image src={getTokenIconUrl('SOL')} alt="SOL" width={24} height={24} className="mr-2" />
                    SOL
                  </div>
                </SelectItem>
                <SelectItem value="USDC">
                  <div className="flex items-center">
                    <Image src={getTokenIconUrl('USDC')} alt="USDC" width={24} height={24} className="mr-2" />
                    USDC
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              className="flex-grow"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>You will receive:</span>
            <span className="font-bold">{amount || '0'} BARK</span>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-center">
            <WalletButton />
          </div>
          {paymentInfo ? (
            <QRCodeGenerator
              signature={paymentInfo.signature}
              transactionId={paymentInfo.transactionId}
              amount={amount}
              fromToken={fromToken}
            />
          ) : (
            <Button 
              onClick={handleGenerateQR} 
              disabled={isLoading || !wallet.connected} 
              className="w-full"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Payment QR Code
            </Button>
          )}
          {paymentInfo && (
            <Button 
              onClick={handleVerifyPayment} 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Verify Payment
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <InfoIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Payment fee: 0.2% per transaction + Solana network fee</p>
              <p>0.1% of each transaction goes to the Treasury</p>
            </TooltipContent>
          </Tooltip>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}