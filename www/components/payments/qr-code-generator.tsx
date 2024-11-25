'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { generateQRCode } from '@/lib/payments/solana-pay'
import { QR_CODE_EXPIRATION_TIME } from '@/lib/payments/constants'
import { Copy, Send } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from "@/components/ui/use-toast"

interface QRCodeGeneratorProps {
  signature: string
  transactionId: string
  amount: string
  fromToken: string
}

export default function QRCodeGenerator({ signature, transactionId, amount, fromToken }: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(QR_CODE_EXPIRATION_TIME)
  const { toast } = useToast()

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrCodeUrl = await generateQRCode({
          signature,
          transactionId,
          amount,
          fromToken,
        })
        setQrCode(qrCodeUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQR()
  }, [signature, transactionId, amount, fromToken])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCopyReference = () => {
    navigator.clipboard.writeText(transactionId)
    toast({
      title: "Copied",
      description: "Transaction ID copied to clipboard",
    })
  }

  const handleSendPaymentDetails = () => {
    const subject = 'BARK Token Purchase Details'
    const body = `
    Transaction Reference: ${transactionId}
    Transaction Signature: ${signature}
    Amount: ${amount} ${fromToken}
    Token: BARK
    Solscan Link: https://solscan.io/tx/${signature}
  `
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (!qrCode) {
    return <div>Generating QR Code...</div>
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image src={qrCode} alt="Payment QR Code" width={200} height={200} className="rounded-lg shadow-md" />
      <Progress value={(timeLeft / QR_CODE_EXPIRATION_TIME) * 100} className="w-full" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </p>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">Transaction ID: {transactionId.slice(0, 8)}...{transactionId.slice(-8)}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline" onClick={handleCopyReference}>
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy transaction ID</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center space-x-2">
        <a
          href={`https://solscan.io/tx/${signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-yellow-500 hover:underline"
        >
          View on Solscan
        </a>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline" onClick={handleSendPaymentDetails}>
              <Send className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open email client with payment details</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

