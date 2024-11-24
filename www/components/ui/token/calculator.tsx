'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentPrice } from "@/utils/bark-price-data"

const Calculator: React.FC = () => {
  const [barkAmount, setBarkAmount] = useState<string>('')
  const [usdAmount, setUsdAmount] = useState<string>('')
  const [currentPrice, setCurrentPrice] = useState<number>(0)

  useEffect(() => {
    setCurrentPrice(getCurrentPrice())
  }, [])

  const handleBarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBarkAmount(value)
    if (value && !isNaN(parseFloat(value))) {
      setUsdAmount((parseFloat(value) * currentPrice).toFixed(2))
    } else {
      setUsdAmount('')
    }
  }

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsdAmount(value)
    if (value && !isNaN(parseFloat(value))) {
      setBarkAmount((parseFloat(value) / currentPrice).toFixed(4))
    } else {
      setBarkAmount('')
    }
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
            />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Current Price: ${currentPrice.toFixed(4)} USD per BARK
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Calculator