'use client'

import { useSearchParams } from 'next/navigation'
import Checkout from '../../../components/payments/checkout'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const items = JSON.parse(searchParams.get('items') || '[]')
  const currency = searchParams.get('currency') as 'usd' | 'sol' | 'usdc' | 'bark'

  return <Checkout items={items} currency={currency} />
}
