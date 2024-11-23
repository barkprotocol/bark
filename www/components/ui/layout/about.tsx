'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Coins } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export const About: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      description: "Experience blazing-fast transactions on the Solana blockchain." 
    },
    { 
      icon: Shield, 
      title: "Secure", 
      description: "Built with top-tier security measures to protect your digital assets." 
    },
    { 
      icon: Globe, 
      title: "Decentralized", 
      description: "Enjoy the benefits of a truly decentralized ecosystem." 
    },
    { 
      icon: Coins, 
      title: "Tokenomics", 
      description: "Innovative tokenomics designed for sustainable growth and value." 
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About BARK
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
        >
          <p className="text-xl text-muted-foreground">
            BARK is a revolutionary protocol on the Solana blockchain, designed to empower creators, 
            developers, and businesses. We're building the future of digital interactions, one block at a time.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.6 }}
        >
          <Button 
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Link href="/about">
              Discover More About BARK
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

