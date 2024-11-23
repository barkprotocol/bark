import React from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Product } from './product-card'

interface NFTModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function NFTModal({ isOpen, onClose, product }: NFTModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name} NFT Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative aspect-square w-full max-w-[300px] mx-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
          {product.nftDetails && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Token ID</h3>
                <p className="text-sm text-gray-600">{product.nftDetails.tokenId}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contract Address</h3>
                <p className="text-sm text-gray-600">{product.nftDetails.contractAddress}</p>
              </div>
            </>
          )}
          <Button className="w-full" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
