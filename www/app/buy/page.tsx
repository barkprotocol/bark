import { Metadata } from 'next'
import { Suspense } from 'react'
import { BuyContent } from '@/components/payments/buy-content'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { LoadingSpinner } from '@/components/ui/spinner'

export const metadata: Metadata = {
  title: 'Buy BARK Tokens | BARK Protocol',
  description: 'Purchase SPL tokens securely using SOL or USDC on the BARK Protocol platform.',
}

export default function BuyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Buy BARK Tokens</h1>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <BuyContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}