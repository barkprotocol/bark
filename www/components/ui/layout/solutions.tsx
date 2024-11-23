'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Globe, Heart, Users, Coins } from 'lucide-react'
import Link from 'next/link'

const solutions = [
  {
    title: "Micro-Payments",
    description: "Empower users to make quick, small contributions through our innovative Blink system.",
    icon: Zap,
    link: "/payments"
  },
  {
    title: "Secure Charitable Transactions",
    description: "Ensure transparency and security in donation processes with cutting-edge Solana blockchain technology.",
    icon: Shield,
    link: "/transactions"
  },
  {
    title: "Global Disaster Relief",
    description: "Swiftly mobilize resources to support communities worldwide during crises.",
    icon: Globe,
    link: "/disaster-relief"
  },
  {
    title: "Community-Driven Initiatives",
    description: "Foster local empowerment by enabling communities to create and fund their own charitable projects.",
    icon: Users,
    link: "/community"
  },
  {
    title: "Tokenized Impact Investing",
    description: "Drive measurable social and environmental change through BARK token-based investments.",
    icon: Coins,
    link: "/investing"
  },
  {
    title: "Charitable DeFi Integration",
    description: "Maximize social impact by seamlessly blending decentralized finance with charitable giving.",
    icon: Heart,
    link: "/defi"
  }
]

export default function Solutions() {
  return (
    <section className="py-16 bg-muted" id="solutions" aria-labelledby="solutions-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="solutions-heading" className="text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl mb-4">
            Innovative Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore how BARK Protocol is transforming charitable giving and social impact through groundbreaking blockchain solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl bg-card dark:bg-card shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 hover:transform hover:scale-105">
                <CardHeader className="p-6">
                  <solution.icon className="w-8 h-8 text-brown-[#D0BFB4] mb-4" aria-hidden="true" />
                  <CardTitle className="text-xl font-semibold text-primary mb-2">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground mb-4">{solution.description}</p>
                  <Button asChild variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={solution.link} className="inline-flex items-center justify-center">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}