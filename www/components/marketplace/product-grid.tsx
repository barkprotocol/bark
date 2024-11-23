import React from 'react'
import { ProductCard, Product } from './product-card'

interface ProductGridProps {
  products: Product[]
  selectedCurrency: 'usd' | 'sol' | 'usdc' | 'bark'
}

export function ProductGrid({ products, selectedCurrency }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} selectedCurrency={selectedCurrency} />
      ))}
    </div>
  )
}
