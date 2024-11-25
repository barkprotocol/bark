'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const storyPoints = [
  {
    year: "2023 Q4",
    title: "The Spark",
    description: "BARK Protocol ignites from a visionary idea: harnessing Solana's lightning-fast blockchain to revolutionize charitable giving and social impact.",
    features: ["Concept Development", "Market Research"]
  },
  {
    year: "2024 Q1-Q2",
    title: "Building the Future",
    description: "Our passionate dev team dives in, crafting BARK's ecosystem on Solana. We're not just coding; we're architecting a new era of digital philanthropy.",
    features: ["Solana Integration", "Token Economics", "Charity Incentives"]
  },
  {
    year: "2024 Q3-Q4",
    title: "Unleashing Innovation",
    description: "BARK Protocol's beta roars to life! Early adopters get their paws on our game-changing platform, helping us fine-tune the future of giving.",
    features: ["Blink Micro-Apps", "Jupiter Swap Integration", "Lightning-Fast Payments"]
  },
  {
    year: "2025",
    title: "Global Pawprint",
    description: "BARK Protocol bounds onto the world stage, forging alliances with international charities and disaster relief orgs. Together, we're making waves and wagging tails!",
    features: ["NFT-Based Giving Clubs", "Cross-Border Donations", "AI-Powered Impact Tracking"]
  }
]

export function Story() {
  return (
    <section className="py-16 bg-gray-100 to-white dark:from-gray-950 dark:to-gray-1000">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Tail-Wagging Tale</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From a spark of inspiration to a global pack of change-makers, join us on BARK Protocol&apos;s exhilarating journey!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="BARK Protocol Journey"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Unleashing Good</p>
              <p className="text-gray-600 dark:text-gray-300">One Block at a Time</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            {storyPoints.map((point, index) => (
              <motion.div
                key={point.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-[#D0BFB4] dark:border-[#E5D3C8]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {point.title}
                      </h3>
                      <Badge variant="secondary" className="text-sm font-medium bg-[#D0BFB4] text-gray-900 dark:bg-[#E5D3C8] dark:text-gray-900">
                        {point.year}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{point.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {point.features.map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex} 
                          variant="outline" 
                          className="bg-[#D0BFB4]/20 text-gray-900 dark:bg-[#E5D3C8]/20 dark:text-gray-100 border-[#D0BFB4] dark:border-[#E5D3C8]"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

