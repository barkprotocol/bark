'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, ArrowRight } from 'lucide-react'

const Calculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)

  const calculateTokens = () => {
    const inputAmount = parseFloat(amount)
    if (!isNaN(inputAmount) && inputAmount > 0) {
      // Assuming 1 USD = 10000 BARK tokens (replace with actual rate)
      const tokens = inputAmount * 10000
      setResult(tokens)
    } else {
      setResult(null)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">BARK Token Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Enter USD amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={calculateTokens} className="bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4] text-white">
              Calculate
            </Button>
          </div>
          {result !== null && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg font-semibold flex items-center justify-center">
                <Coins className="w-5 h-5 mr-2 text-brown-[#D0BFB4]" />
                {amount} USD
                <ArrowRight className="mx-2" />
                {result.toLocaleString()} BARK
              </p>
            </div>
          )}
          <p className="text-sm text-gray-1000 text-center mt-4">
            Note: This calculation is based on an estimated rate. Actual rates may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Calculator