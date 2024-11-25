import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy BARK Tokens | BARK Protocol',
  description: 'Purchase SPL tokens securely using SOL or USDC on the BARK Protocol application.',
}

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}