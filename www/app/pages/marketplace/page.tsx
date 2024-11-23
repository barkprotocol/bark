'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProductGrid } from '@/components/marketplace/product-grid'
import { CategoryFilter } from '@/components/marketplace/category-filter'
import { CurrencySelector } from '@/components/marketplace/currency-selector'
import { Product } from '@/components/marketplace/product-card'
import { ShoppingCart } from '@/components/ui/shopping-cart'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const products: Product[] = [
  {
    id: '1',
    name: 'Peaky Cap',
    description: 'The iconic flat cap worn by the Peaky Barkers.',
    price: {
      usd: 29.99,
      sol: 0.1,
      usdc: 30,
      bark: 300
    },
    imageUrl: 'https://ucarecdn.com/4a8c4c3f-3a10-425a-b2a6-7b7b8c1e2e3f/peaky_cap.png',
    category: 'Accessories',
    isNFT: false
  },
  {
    id: '2',
    name: 'BARK\'s NFT Medallion',
    description: 'A digital golden medallion symbolizing leadership. Exclusive NFT!',
    price: {
      usd: 149.99,
      sol: 0.5,
      usdc: 150,
      bark: 1500
    },
    imageUrl: 'https://ucarecdn.com/5b6c7d8e-9f10-4a5b-8c6d-7e8f9a0e1b2c/bark_medallion_nft.png',
    category: 'NFT',
    isNFT: true
  },
  {
    id: '3',
    name: 'Trixie\'s Paintbrush Set',
    description: 'Magical paintbrushes for creative inspiration.',
    price: {
      usd: 39.99,
      sol: 0.13,
      usdc: 40,
      bark: 400
    },
    imageUrl: 'https://ucarecdn.com/6c7d8e9f-0a1b-4c5d-8e9f-0a1b2c3d4e5f/trixie_paintbrush.png',
    category: 'Art Supplies',
    isNFT: false
  },
  {
    id: '4',
    name: 'Sparky\'s Vest',
    description: 'Energizing pinstriped vest for the dapper dog.',
    price: {
      usd: 34.99,
      sol: 0.12,
      usdc: 35,
      bark: 350
    },
    imageUrl: 'https://ucarecdn.com/7d8e9f0a-1b2c-4d5e-6f7g-8h9i0j1k2l3m/sparky_vest.png',
    category: 'Clothing',
    isNFT: false
  },
  {
    id: '5',
    name: 'Max\'s Smart Glasses NFT',
    description: 'Digital high-tech glasses for the tech-savvy pup. Exclusive NFT!',
    price: {
      usd: 89.99,
      sol: 0.3,
      usdc: 90,
      bark: 900
    },
    imageUrl: 'https://ucarecdn.com/8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n/max_glasses_nft.png',
    category: 'NFT',
    isNFT: true
  },
  {
    id: '6',
    name: 'Tuffy\'s Bandana',
    description: 'Sturdy bandana representing unwavering spirit.',
    price: {
      usd: 19.99,
      sol: 0.07,
      usdc: 20,
      bark: 200
    },
    imageUrl: 'https://ucarecdn.com/9f0a1b2c-3d4e-5f6g-7h8i-9j0k1l2m3n4o/tuffy_bandana.png',
    category: 'Accessories',
    isNFT: false
  },
  {
    id: '7',
    name: 'Buster\'s Energy Treats',
    description: 'Tasty treats to boost your pup\'s energy.',
    price: {
      usd: 14.99,
      sol: 0.05,
      usdc: 15,
      bark: 150
    },
    imageUrl: 'https://ucarecdn.com/0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p/buster_treats.png',
    category: 'Food',
    isNFT: false
  },
  {
    id: '8',
    name: 'Bruno\'s First Aid Kit',
    description: 'Essential first aid supplies for your furry friend.',
    price: {
      usd: 24.99,
      sol: 0.08,
      usdc: 25,
      bark: 250
    },
    imageUrl: 'https://ucarecdn.com/1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q/bruno_first_aid.png',
    category: 'Health',
    isNFT: false
  },
  {
    id: '9',
    name: 'Peaky Barkers Team NFT',
    description: 'Exclusive NFT featuring the entire Peaky Barkers team!',
    price: {
      usd: 299.99,
      sol: 1.0,
      usdc: 300,
      bark: 3000
    },
    imageUrl: 'https://ucarecdn.com/2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r/peaky_barkers_team_nft.png',
    category: 'NFT',
    isNFT: true
  }
]

const categories = Array.from(new Set(products.map(product => product.category)))

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function Marketplace() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<'usd' | 'sol' | 'usdc' | 'bark'>('usd')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price[selectedCurrency],
          quantity: 1,
          image: product.imageUrl
        }]
      }
    })
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeCartItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    router.push({
      pathname: '/payments/checkout',
      query: { 
        items: JSON.stringify(cartItems),
        currency: selectedCurrency
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Peaky Barkers Marketplace
          </motion.h1>
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeCartItem}
            onCheckout={handleCheckout}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="w-full md:w-auto">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={(currency) => setSelectedCurrency(currency as 'usd' | 'sol' | 'usdc' | 'bark')}
            />
          </div>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.length > 0 ? (
              <ProductGrid 
                products={filteredProducts} 
                selectedCurrency={selectedCurrency} 
                onAddToCart={addToCart}
              />
            ) : (
              <p className="text-center text-gray-600 text-xl mt-8">No products found. Try adjusting your search or filters.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
