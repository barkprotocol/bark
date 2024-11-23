'use client'

import React, { useState } from 'react'
import { QrCode } from 'qr-code-generator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface SolanaQRParams {
  to: string
  amount: number
  label: string
  memo: string
  feePayer: string
}

export default function GenerateSolanaQRCode() {
  const [params, setParams] = useState<SolanaQRParams>({
    to: '',
    amount: 0,
    label: '',
    memo: '',
    feePayer: '',
  })
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }))
  }

  const generateSOLqrCode = async (params: SolanaQRParams): Promise<string> => {
    const qrCode = new QrCode()
    qrCode.setTypeNumber(4)
    qrCode.setErrorCorrectLevel('L')

    const solanaPayUrl = `solana:${params.to}?amount=${params.amount}&label=${encodeURIComponent(params.label)}&memo=${encodeURIComponent(params.memo)}&fee-payer=${params.feePayer}`
    qrCode.addData(solanaPayUrl)
    qrCode.make()

    const qrCodeSvg = qrCode.createSvgTag({
      cellSize: 4,
      margin: 4,
    })

    return `data:image/svg+xml;base64,${btoa(qrCodeSvg)}`
  }

  const handleGenerateQRCode = async () => {
    try {
      const qrCodeDataURL = await generateSOLqrCode(params)
      setQrCodeData(qrCodeDataURL)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Generate Solana QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="to">Recipient Address</Label>
          <Input
            id="to"
            name="to"
            type="text"
            placeholder="Solana address"
            value={params.to}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (SOL)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.000000001"
            min="0"
            placeholder="1.234"
            value={params.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            name="label"
            type="text"
            placeholder="Payment for services"
            value={params.label}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="memo">Memo (Optional)</Label>
          <Input
            id="memo"
            name="memo"
            type="text"
            placeholder="Optional memo"
            value={params.memo}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feePayer">Fee Payer Address</Label>
          <Input
            id="feePayer"
            name="feePayer"
            type="text"
            placeholder="Fee payer address"
            value={params.feePayer}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleGenerateQRCode} className="w-full">
          Generate Solana QR Code
        </Button>
        {qrCodeData && (
          <div className="mt-4 flex justify-center">
            <img
              src={qrCodeData}
              alt="Generated Solana QR Code"
              className="w-64 h-64"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}