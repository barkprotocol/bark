import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'

interface CurrencySelectorProps {
  selectedCurrency: string
  onCurrencyChange: (currency: string) => void
}

const currencyOptions = [
  { value: 'usd', label: 'USD', icon: 'https://ucarecdn.com/4653c9b5-f3b6-4910-b11f-86b0f2c0a8c9/usd.png' },
  { value: 'sol', label: 'SOL', icon: 'https://ucarecdn.com/f89e50a9-2a82-4326-8037-6a45c2e3c8a1/sol.png' },
  { value: 'usdc', label: 'USDC', icon: 'https://ucarecdn.com/7a4b8d8c-3c8d-4dc3-a49a-7e0f6b9c0c7c/usdc.png' },
  { value: 'bark', label: 'BARK', icon: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp' },
]

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center">
              <Image src={option.icon} alt={option.label} width={24} height={24} className="mr-2" />
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
