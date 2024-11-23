import { Metadata } from 'next'
import BuyContent from './content'

export const metadata: Metadata = {
  title: 'Buy BARK Tokens | BARK Protocol',
  description: 'Purchase BARK tokens securely using SOL or USDC on the BARK Protocol platform.',
}

export default function BuyPage() {
  return <BuyContent />
}