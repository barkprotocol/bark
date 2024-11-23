import React from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  qrCodeUrl: string
  paymentMethod: string
}

export function QRCodeModal({ isOpen, onClose, qrCodeUrl, paymentMethod }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan to Pay</DialogTitle>
          <DialogDescription>
            Use a Solana compatible wallet to scan this QR code and complete your payment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={qrCodeUrl} alt="Payment QR Code" width={250} height={250} />
          <p className="mt-4 text-sm text-gray-500">
            Payment method: {paymentMethod.toUpperCase()}
          </p>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

