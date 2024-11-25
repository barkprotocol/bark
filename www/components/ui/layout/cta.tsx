'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Coins } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function CTA() {
  const { theme } = useTheme()

  return (
    <section 
      className="w-full py-16"
      id="cta"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-950 p-8 sm:p-12 shadow-lg border border-border">
          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6 text-center text-foreground">
              Join the BARK Community Today
            </h2>
            <p className="text-center mb-10 text-muted-foreground max-w-2xl mx-auto">
              Be part of a revolutionary platform that combines Solana blockchain technology with real-world impact. Start your journey with BARK now!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Link href="/buy" className="flex items-center justify-center">
                  <span className="text-base">Buy BARK</span>
                  <Coins className="ml-2 h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/about" className="flex items-center justify-center">
                  <span className="text-base">Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 h-40 w-40 opacity-60">
            <Image
              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
              alt="BARK Logo"
              width={160}
              height={160}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}