'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CheckoutProps {
  items: CheckoutItem[]
  currency: 'usd' | 'sol' | 'usdc' | 'bark'
}

export default function Checkout({ items, currency }: CheckoutProps) {
  const router = useRouter()
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<string>('')

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    // For this example, we'll just simulate a successful order
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    })
    // Redirect to a thank you page or back to the marketplace
    router.push('/marketplace')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{item.price * item.quantity} {currency.toUpperCase()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 font-bold">
                    <span>Total</span>
                    <span>{totalAmount} {currency.toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                  <Select onValueChange={setPaymentMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
