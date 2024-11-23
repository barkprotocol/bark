'use client'

import { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { createQR } from '@solana/pay'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Copy, RefreshCw, CreditCard, InfoIcon, Send, QrCode } from 'lucide-react'
import { WalletButton } from '@/components/ui/wallet-button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const BARK_TOKEN_MINT = new PublicKey('4DsZctdxSVNLGYB5YtY8A8JDg6tUoSZnQHSamXecKWWf')
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

const tokenInfo = {
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    icon: 'https://ucarecdn.com/8bcc4664-01b2-4a88-85bc-9ebce234f08b/sol.png?height=24&width=24',
    decimals: 9,
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    icon: 'https://ucarecdn.com/67e17a97-f3bd-46c0-8627-e13b8b939d26/usdc.png?height=24&width=24',
    decimals: 6,
    mint: USDC_MINT,
  },
  BARK: {
    name: 'BARK',
    symbol: 'BARK',
    icon: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp?height=24&width=24',
    decimals: 9,
    mint: BARK_TOKEN_MINT,
  },
}

export default function BuyContent() {
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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (reference && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleReset()
    }
    return () => clearInterval(timer)
  }, [reference, timeLeft])

  const handleGenerateQR = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/storm/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          buyerPublicKey: wallet.publicKey?.toBase58(),
          amount: parseFloat(amount),
          fromToken,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment')
      }

      const data = await response.json()
      setReference(data.transactionId)
      setTransactionSignature(data.signature)

      // Generate Solana Pay QR code
      const url = `solana:${data.signature}?reference=${data.transactionId}&amount=${amount}&spl-token=${tokenInfo[fromToken].mint}`
      const qr = createQR(url)
      const qrCodeSrc = await qr.getRawData('png')
      setQrCode(URL.createObjectURL(new Blob([qrCodeSrc!], { type: 'image/png' })))
      setTimeLeft(300) // Reset countdown to 5 minutes
    } catch (error) {
      console.error('Error generating QR code:', error)
      setError(error.message || 'Failed to generate QR code. Please try again.')
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
      const response = await fetch(`/api/storm-protocol/payments?transactionId=${reference}&action=verify`)
      if (!response.ok) {
        throw new Error('Failed to verify payment')
      }

      const { status } = await response.json()
      alert(`Payment status: ${status}`)

      if (status === 'completed') {
        handleReset()
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      setError('Failed to verify payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setQrCode(null)
    setReference(null)
    setTransactionSignature(null)
    setAmount('')
    setTimeLeft(300)
    setError(null)
  }

  const handleCopyReference = () => {
    if (reference) {
      navigator.clipboard.writeText(reference)
      alert('Reference copied to clipboard')
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
                            <Image src={tokenInfo.SOL.icon} alt="SOL" width={24} height={24} className="mr-2" />
                            SOL
                          </div>
                        </SelectItem>
                        <SelectItem value="USDC">
                          <div className="flex items-center">
                            <Image src={tokenInfo.USDC.icon} alt="USDC" width={24} height={24} className="mr-2" />
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
                            <Image src={tokenInfo.BARK.icon} alt="BARK" width={24} height={24} className="mr-2" />
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
                        <TooltipProvider>
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
                        </TooltipProvider>
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
            <Alert className="bg-gray-50 dark:bg-gray-700 border-yellow-300 dark:border-brown-[#D2BFB4]">
              <InfoIcon className="h-4 w-4 text-brown-[#D0BFB4]" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Ensure you have connected your wallet and have sufficient funds before making a purchase. Always verify transaction details before confirming.
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
                  src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
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
                <li><strong>Total Supply:</strong> 18,640,000,000 BARK</li>
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
                <li>Trade with reduced fees on the BARK DEX</li>
                <li>Potential for value appreciation as the ecosystem grows</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}