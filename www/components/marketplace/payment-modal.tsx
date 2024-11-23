import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Product } from './product-card'
import QRCode from 'qrcode.react'
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  selectedCurrency: 'usd' | 'sol' | 'usdc' | 'bark'
}

const currencyIcons = {
  usd: 'https://ucarecdn.com/4653c9b5-f3b6-4910-b11f-86b0f2c0a8c9/usd.png',
  sol: 'https://ucarecdn.com/f89e50a9-2a82-4326-8037-6a45c2e3c8a1/sol.png',
  usdc: 'https://ucarecdn.com/7a4b8d8c-3c8d-4dc3-a49a-7e0f6b9c0c7c/usdc.png',
  bark: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
}

const MERCHANT_WALLET = '4DsZctdxSVNLGYB5YtY8A8JDg6tUoSZnQHSamXecKWWf'

export function PaymentModal({ isOpen, onClose, product, selectedCurrency }: PaymentModalProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      generatePaymentRequest()
    }
  }, [isOpen, product, selectedCurrency])

  const generatePaymentRequest = async () => {
    try {
      const amount = product.price[selectedCurrency]
      const label = 'Peaky Barkers'
      const message = `Payment for ${product.name}`
      const memo = `Order ID: ${Date.now()}`

      const url = encodeURL({
        recipient: MERCHANT_WALLET,
        amount,
        splToken: selectedCurrency === 'sol' ? undefined : selectedCurrency.toUpperCase(),
        reference: undefined,
        label,
        message,
        memo,
      } as TransactionRequestURLFields)

      const qr = createQR(url)
      const qrCodeSvg = await qr.getRawData('svg')
      setQrCode(qrCodeSvg)
      setError(null)
    } catch (err) {
      console.error('Error generating payment request:', err)
      setError('Failed to generate payment request. Please try again.')
      setQrCode(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase {product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Image src={product.imageUrl} alt={product.name} width={100} height={100} className="rounded-lg" />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          </div>
          <div className="text-center">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : qrCode ? (
              <>
                <p className="mb-2">Scan QR code to pay:</p>
                <div dangerouslySetInnerHTML={{ __html: qrCode }} className="mx-auto w-48 h-48" />
              </>
            ) : (
              <p>Generating QR code...</p>
            )}
            <div className="mt-4 flex items-center justify-center">
              <Image
                src={currencyIcons[selectedCurrency]}
                alt={selectedCurrency.toUpperCase()}
                width={24}
                height={24}
                className="mr-2"
              />
              <p className="font-semibold text-xl">
                {product.price[selectedCurrency]} {selectedCurrency.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
