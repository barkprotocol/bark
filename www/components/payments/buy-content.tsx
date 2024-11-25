'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Copy, RefreshCw, CreditCard, InfoIcon, Send, QrCode } from 'lucide-react'
import { WalletButton } from '@/components/ui/wallet-button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { BARK_TOKEN_MINT, USDC_MINT, TOKEN_INFO, QR_CODE_EXPIRATION_TIME } from '@/lib/payments/constants'
import { createPayment, verifyPayment, getTokenIconUrl } from '@/lib/payments/api'
import { generateQRCode } from '@/lib/payments/solana-pay'
import { useToast } from "@/components/ui/use-toast"

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
  const [toToken, setToToken] = useState<'BARK'>('BARK')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(300) // 5 minutes countdown
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null)
  const { connection } = useConnection()
  const wallet = useWallet()
  const { toast } = useToast()

  const handleReset = useCallback(() => {
    setQrCode(null)
    setReference(null)
    setTransactionSignature(null)
    setAmount('')
    setTimeLeft(300)
    setError(null)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (reference && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleReset()
      toast({
        title: "QR Code Expired",
        description: "The QR code has expired. Please generate a new one.",
        variant: "destructive",
      })
    }
    return () => clearInterval(timer)
  }, [reference, timeLeft, handleReset, toast])

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

      setReference(transactionId)
      setTransactionSignature(signature)

      const qrCodeUrl = await generateQRCode({
        signature,
        transactionId,
        amount,
        fromToken,
      })

      setQrCode(qrCodeUrl)
      setTimeLeft(QR_CODE_EXPIRATION_TIME)
      toast({
        title: "QR Code Generated",
        description: "Scan the QR code to complete your purchase.",
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
      setError(error.message || 'Failed to generate QR code. Please try again.')
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
    if (!reference) {
      setError('No payment to verify')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { status } = await verifyPayment({ transactionId: reference })
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

  const handleCopyReference = () => {
    if (reference) {
      navigator.clipboard.writeText(reference)
      toast({
        title: "Copied",
        description: "Reference copied to clipboard",
      })
    }
  }

  const handleSendPaymentDetails = () => {
    if (reference && transactionSignature) {
      const subject = 'BARK Token Purchase Details'
      const body = `
        Transaction Reference: ${reference}
        Transaction Signature: ${transactionSignature}
        Amount: ${amount} ${fromToken}
        Token: BARK
        Solscan Link: https://solscan.io/tx/${transactionSignature}
      `
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Buy BARK Tokens</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Purchase BARK tokens securely using SOL or USDC</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <CreditCard className="mr-2 h-6 w-6 text-brown-[#D0BFB4]" />
              Purchase Tokens
            </CardTitle>
            <CardDescription>Buy BARK tokens using SOL or USDC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="buy">
                <div className="flex flex-col space-y-4">
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
                      aria-label="Payment amount"
                      className="flex-grow"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Select value={toToken} onValueChange={(value) => setToToken(value as 'BARK')}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select token to buy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BARK">
                          <div className="flex items-center">
                            <Image src={getTokenIconUrl('BARK')} alt="BARK" width={24} height={24} className="mr-2" />
                            BARK
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex space-x-2 w-full">
                      <Button onClick={handleGenerateQR} disabled={isLoading || !wallet.connected} className="flex-1 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><QrCode className="mr-2 h-4 w-4" /> Generate QR</>}
                      </Button>
                      <Button onClick={handleVerifyPayment} disabled={!reference || isLoading} className="flex-1 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify Payment'}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="qr">
                {qrCode ? (
                  <div className="flex flex-col items-center space-y-4">
                    <Image src={qrCode} alt="Payment QR Code" width={200} height={200} className="rounded-lg shadow-md" />
                    <Progress value={(timeLeft / 300) * 100} className="w-full" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </p>
                    {reference && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Reference: {reference}</span>
                        <Button size="sm" variant="outline" onClick={handleCopyReference}>
                          <Copy className="h-4 w-4 text-brown-[#D0BFB4]" />
                          <span className="sr-only">Copy reference</span>
                        </Button>
                      </div>
                    )}
                    {transactionSignature && (
                      <div className="flex items-center space-x-2">
                        <a
                          href={`https://solscan.io/tx/${transactionSignature}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View on Solscan
                        </a>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="outline" onClick={handleSendPaymentDetails}>
                              <Send className="h-4 w-4 text-brown-[#D0BFB4]" />
                              <span className="sr-only">Send payment details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send payment details via email</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Generate a QR code to view it here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center">
              <WalletButton />
            </div>
            <Alert className="bg-gray-50 dark:bg-gray-700 border-yellow-300 dark:border-yellow-600">
              <InfoIcon className="h-4 w-4 text-brown-[#D0BFB4]" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Ensure you have connecte
d your wallet and have sufficient funds before making a purchase. Always verify transaction details before confirming.
              </AlertDescription>
            </Alert>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Fee Information</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Payment fee: 0.2% per transaction + Solana network fee</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.1% of each transaction goes to the Treasury</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleReset} variant="outline" className="border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              <RefreshCw className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" />
              Reset
            </Button>
          </CardFooter>
        </Card>
        <div className="space-y-8">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <InfoIcon className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                BARK Token Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="https://ucarecdn.com/47ae5354-d470-439b-97b2-3c08d4b14120/stormlogoicon.png"
                  alt="BARK Token"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">BARK</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">The native token of the BARK Protocol ecosystem</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Name:</strong> BARK</li>
                <li><strong>Symbol:</strong> BARK</li>
                <li><strong>Decimals:</strong> 9</li>
                <li><strong>Total Supply:</strong> 18,271,889,396.27 BARK</li>
                <li><strong>Contract Address:</strong> 
                  <a
                    href={`https://solscan.io/token/${BARK_TOKEN_MINT.toBase58()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-brown-[#D0BFB4] hover:underline"
                  >
                    {BARK_TOKEN_MINT.toBase58().slice(0, 4)}...{BARK_TOKEN_MINT.toBase58().slice(-4)}
                  </a>
                </li>
                <li><strong>Current Price:</strong> $0.000000012 USD</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <InfoIcon className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Why Buy BARK?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Access to exclusive DeFi products on the BARK platform</li>
                <li>Participate in governance decisions shaping the future of BARK</li>
                <li>Earn rewards through staking and liquidity provision</li>
                <li>Trade with reduced fees on the DEX</li>
                <li>Potential for value appreciation as the ecosystem grows</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}