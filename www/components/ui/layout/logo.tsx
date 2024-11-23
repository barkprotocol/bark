'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function Logo() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <Link href="/" className="flex items-center" aria-label="BARK Protocol - Return to homepage">
      <div className="relative w-14 h-14">
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Loading logo</span>
          </div>
        )}

        {error ? (
          <div
            className="w-full h-full rounded-full bg-muted flex items-center justify-center"
            role="img"
            aria-label="BARK Protocol logo placeholder"
          >
            <span className="text-lg font-bold text-muted-foreground">S</span>
          </div>
        ) : (
          <Image
            src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
            alt="BARK Protocol Logo"
            width={62}
            height={62}
            className="rounded-full"
            priority
            unoptimized
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true)
              setIsLoading(false)
            }}
          />
        )}
      </div>
      <div className="ml-1 flex flex-col items-start">
        <span className="text-2xl font-bold text-foreground transition-colors duration-200 leading-none">
          BARK
        </span>
        <span className="text-[0.7rem] font-light text-muted-foreground uppercase tracking-[0.3em] leading-none mt-1">
          Protocol
        </span>
      </div>
    </Link>
  )
}