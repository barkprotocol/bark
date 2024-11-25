'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Checkout from '@/components/payments/checkout'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type Currency = 'usd' | 'sol' | 'usdc' | 'bark'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<CheckoutItem[]>([])
  const [currency, setCurrency] = useState<Currency | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const parseParams = () => {
      setIsLoading(true)
      setError(null)

      try {
        const itemsParam = searchParams.get('items')
        if (!itemsParam) {
          throw new Error('No items provided')
        }

        const parsedItems: CheckoutItem[] = JSON.parse(itemsParam)
        if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
          throw new Error('Invalid items data')
        }

        setItems(parsedItems)

        const currencyParam = searchParams.get('currency') as Currency
        const validCurrencies: Currency[] = ['usd', 'sol', 'usdc', 'bark']
        if (!currencyParam || !validCurrencies.includes(currencyParam)) {
          throw new Error('Invalid or missing currency')
        }

        setCurrency(currencyParam)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    parseParams()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!currency || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="warning">
          <AlertTitle>No items to checkout</AlertTitle>
          <AlertDescription>Your cart is empty or the checkout information is invalid.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Checkout items={items} currency={currency} />
    </div>
  )
}