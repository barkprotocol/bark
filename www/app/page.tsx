'use client'

import React, { lazy, Suspense } from 'react'
import { useTheme } from 'next-themes'
import { Loader2 } from 'lucide-react'
import { Hero } from "@/components/ui/layout/hero"

const About = lazy(() => import('@/components/ui/layout/about-us'))
const Features = lazy(() => import('@/components/ui/layout/features'))
const Tokenomics = lazy(() => import('@/components/ui/layout/tokenomics'))
const FAQ = lazy(() => import('@/components/ui/layout/faq'))
const CTA = lazy(() => import('@/components/ui/layout/cta'))
const Newsletter = lazy(() => import('@/components/ui/layout/newsletter'))

const sections = [
  { Component: About, id: 'about', label: 'About' },
  { Component: Features, id: 'features', label: 'Features' },
  { Component: Tokenomics, id: 'tokenomics', label: 'Tokenomics' },
  { Component: FAQ, id: 'faq', label: 'FAQ' },
  { Component: CTA, id: 'cta', label: 'Call to Action' },
  { Component: Newsletter, id: 'newsletter', label: 'Newsletter' },
]

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-32">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function Home() {
  const { resolvedTheme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen ${resolvedTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} text-foreground`}>
      <Hero />
      <main className="flex-1 flex flex-col gap-16 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {sections.map(({ Component, id, label }) => (
          <section key={id} id={id} aria-label={label} className="scroll-mt-16">
            <Suspense fallback={<LoadingFallback />}>
              <Component />
            </Suspense>
          </section>
        ))}
      </main>
    </div>
  )
}

