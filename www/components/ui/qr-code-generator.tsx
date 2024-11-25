'use client'

import React, { useState, useCallback } from 'react'
import { QrCode } from 'qr-code-generator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BARK_TOKEN_MINT } from '@/lib/payments/constants'

interface SolanaQRParams {
  to: string
  amount: number
  token: 'SOL' | 'BARK'
  label: string
  memo: string
  feePayer: string
}

export function QRCodeGenerator() {
  const { toast } = useToast()
  const [params, setParams] = useState<SolanaQRParams>({
    to: '',
    amount: 0,
    token: 'SOL',
    label: '',
    memo: '',
    feePayer: '',
  })
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }))
  }, [])

  const handleTokenChange = useCallback((value: 'SOL' | 'BARK') => {
    setParams(prev => ({ ...prev, token: value }))
  }, [])

  const generateQRCode = useCallback(async (params: SolanaQRParams): Promise<string> => {
    const qrCode = new QrCode()
    qrCode.setTypeNumber(4)
    qrCode.setErrorCorrectLevel('L')

    let solanaPayUrl = `solana:${params.to}?amount=${params.amount}`
    
    if (params.token === 'BARK') {
      solanaPayUrl += `&spl-token=${BARK_TOKEN_MINT}`
    }
    
    if (params.label) solanaPayUrl += `&label=${encodeURIComponent(params.label)}`
    if (params.memo) solanaPayUrl += `&memo=${encodeURIComponent(params.memo)}`
    if (params.feePayer) solanaPayUrl += `&fee-payer=${params.feePayer}`

    qrCode.addData(solanaPayUrl)
    qrCode.make()

    const qrCodeSvg = qrCode.createSvgTag({
      cellSize: 4,
      margin: 4,
    })

    return `data:image/svg+xml;base64,${btoa(qrCodeSvg)}`
  }, [])

  const handleGenerateQRCode = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    if (!params.to || !params.amount) {
      setError('Recipient address and amount are required.')
      setIsLoading(false)
      return
    }

    try {
      const qrCodeDataURL = await generateQRCode(params)
      setQrCodeData(qrCodeDataURL)
      toast({
        title: "QR Code Generated",
        description: `Your ${params.token} QR code has been successfully generated.`,
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
  }, [params, generateQRCode, toast])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Generate QR Code</CardTitle>
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.000000001"
            min="0"
            placeholder="1.234"
            value={params.amount || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Select onValueChange={handleTokenChange} value={params.token}>
            <SelectTrigger>
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOL">SOL</SelectItem>
              <SelectItem value="BARK">BARK</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="label">Label (Optional)</Label>
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
          <Label htmlFor="feePayer">Fee Payer Address (Optional)</Label>
          <Input
            id="feePayer"
            name="feePayer"
            type="text"
            placeholder="Fee payer address"
            value={params.feePayer}
            onChange={handleInputChange}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button onClick={handleGenerateQRCode} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate QR Code'
          )}
        </Button>
        {qrCodeData && (
          <div className="mt-4 flex justify-center">
            <img
              src={qrCodeData}
              alt="Generated QR Code"
              className="w-64 h-64"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
