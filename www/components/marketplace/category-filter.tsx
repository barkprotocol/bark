'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { ShoppingCart } from "@/components/ui/shopping-cart"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    address: ''
  })

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
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
    setIsCheckoutOpen(true)
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Checkout Successful",
        description: "Thank you for your purchase!",
      })
      setCartItems([])
      setIsCheckoutOpen(false)
      setCheckoutDetails({ name: '', email: '', address: '' })
    }, 2000)
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => onSelectCategory(null)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            All
          </Button>
        </motion.div>
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
              className={selectedCategory === category ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-primary hover:bg-primary/10"}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="mt-4">
        <ShoppingCart
          items={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
          onCheckout={handleCheckout}
        />
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your purchase by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCheckoutSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={checkoutDetails.name}
                  onChange={(e) => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={checkoutDetails.email}
                  onChange={(e) => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={checkoutDetails.address}
                  onChange={(e) => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Complete Purchase (${totalAmount.toFixed(2)})</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}