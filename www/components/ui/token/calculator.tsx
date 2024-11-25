'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentPrice } from "@/utils/market-data/bark-price-data"
import { AlertCircle } from 'lucide-react'

const Calculator: React.FC = () => {
  const [barkAmount, setBarkAmount] = useState<string>('')
  const [usdAmount, setUsdAmount] = useState<string>('')
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getCurrentPrice()
        setCurrentPrice(price)
      } catch (err) {
        console.error('Failed to fetch current price:', err)
        setError('Failed to fetch current price. Please try again later.')
      }
    }
    fetchPrice()
  }, [])

  const handleBarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBarkAmount(value)
    if (value && !isNaN(parseFloat(value)) && currentPrice) {
      setUsdAmount((parseFloat(value) * currentPrice).toFixed(2))
    } else {
      setUsdAmount('')
    }
  }

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsdAmount(value)
    if (value && !isNaN(parseFloat(value)) && currentPrice) {
      setBarkAmount((parseFloat(value) / currentPrice).toFixed(4))
    } else {
      setBarkAmount('')
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">BARK Token Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bark-amount">BARK Amount</Label>
            <Input
              id="bark-amount"
              type="number"
              placeholder="Enter BARK amount"
              value={barkAmount}
              onChange={handleBarkChange}
              min="0"
              step="0.0001"
            />
          </div>
          <div>
            <Label htmlFor="usd-amount">USD Amount</Label>
            <Input
              id="usd-amount"
              type="number"
              placeholder="Enter USD amount"
              value={usdAmount}
              onChange={handleUsdChange}
              min="0"
              step="0.01"
            />
          </div>
          {currentPrice === null ? (
            <Skeleton className="h-6 w-full" />
          ) : (
            <div className="text-sm text-muted-foreground text-center">
              Current Price: ${currentPrice.toFixed(4)} USD per BARK
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Calculator

