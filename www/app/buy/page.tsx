import { Metadata } from 'next'
import { BuyContent } from '@/components/payments/buy-content'

export const metadata: Metadata = {
  title: 'Buy BARK Tokens | BARK Protocol',
  description: 'Purchase SPL tokens securely using SOL or USDC on the BARK Protocol platform.',
}

export default function BuyPage() {
  return <BuyContent />
}

