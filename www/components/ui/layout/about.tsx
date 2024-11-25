'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Zap, Shield, Globe } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from 'next-themes'

const features = [
  {
    icon: Heart,
    title: "Charitable Giving",
    description: "Blockchain-enabled donations with transparent fund allocation for global causes."
  },
  {
    icon: Zap,
    title: "Disaster Relief",
    description: "Swift emergency response through efficient blockchain-based resource distribution."
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Leveraging Solana's blockchain for robust, transparent charitable transactions."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Bridging donors and causes worldwide, transcending geographical limitations."
  }
]

export default function AboutUs() {
  const { resolvedTheme } = useTheme()

  return (
    <section className="py-16 sm:py-20" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Solutions
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming charitable giving and disaster relief through innovative blockchain technology, 
            establishing a transparent, efficient, and global ecosystem for maximized social impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <CardContent className="p-5">
                  <feature.icon className="h-6 w-6 text-[#D0BFB4] mb-3" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}