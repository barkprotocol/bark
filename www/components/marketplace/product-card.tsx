import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { PaymentModal } from './payment-modal'
import { NFTModal } from './nft-modal'

export interface Product {
  id: string
  name: string
  description: string
  price: {
    usd: number
    sol: number
    usdc: number
    bark: number
  }
  imageUrl: string
  category: string
  isNFT: boolean
}

interface ProductCardProps {
  product: Product
  selectedCurrency: 'usd' | 'sol' | 'usdc' | 'bark'
  onAddToCart: (product: Product) => void
}

const currencyIcons = {
  usd: 'https://ucarecdn.com/4653c9b5-f3b6-4910-b11f-86b0f2c0a8c9/usd.png',
  sol: 'https://ucarecdn.com/f89e50a9-2a82-4326-8037-6a45c2e3c8a1/sol.png',
  usdc: 'https://ucarecdn.com/7a4b8d8c-3c8d-4dc3-a49a-7e0f6b9c0c7c/usdc.png',
  bark: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
}

export function ProductCard({ product, selectedCurrency, onAddToCart }: ProductCardProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false)
  const [isNFTModalOpen, setIsNFTModalOpen] = React.useState(false)

  const handlePurchase = () => {
    if (product.isNFT) {
      setIsPaymentModalOpen(true)
    } else {
      onAddToCart(product)
    }
  }

  const handleViewNFT = () => {
    setIsNFTModalOpen(true)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-2 right-2 bg-white text-gray-900">
            {product.category}
          </Badge>
          {product.isNFT && (
            <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
              NFT
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={currencyIcons[selectedCurrency]}
                alt={selectedCurrency.toUpperCase()}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="font-bold text-2xl text-gray-900">
                {product.price[selectedCurrency].toFixed(2)}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ${product.price.usd.toFixed(2)} USD
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex gap-2 w-full">
            <Button 
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-300"
              onClick={handlePurchase}
            >
              {product.isNFT ? 'Mint NFT' : 'Add to Cart'}
            </Button>
            {product.isNFT && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleViewNFT}
              >
                View NFT
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        product={product}
        selectedCurrency={selectedCurrency}
      />
      {product.isNFT && (
        <NFTModal
          isOpen={isNFTModalOpen}
          onClose={() => setIsNFTModalOpen(false)}
          product={product}
        />
      )}
    </motion.div>
  )
}
