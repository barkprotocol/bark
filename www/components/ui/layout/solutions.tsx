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
    <section className="py-16 bg-muted relative" id="solutions" aria-labelledby="solutions-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-brown/5 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <Card className="h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl bg-card dark:bg-card shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(208,191,180,0.4)] dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 hover:transform hover:scale-105 group">
                <CardHeader className="p-4 flex items-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mr-3 bg-brown/10 p-2 rounded-full group-hover:bg-brown/20 transition-colors duration-300"
                  >
                    <solution.icon className="w-6 h-6 text-brown" aria-hidden="true" />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-primary">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-2 flex flex-col justify-between flex-grow">
                  <p className="text-muted-foreground mb-4">{solution.description}</p>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full bg-brown text-brown-foreground hover:bg-brown-light transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    <Link href={solution.link} className="inline-flex items-center justify-center">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

