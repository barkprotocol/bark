'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudLightningIcon as Lightning, Shield, Zap, Sparkles, Users, Coins } from 'lucide-react'

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  badge: string
}

const Feature = ({ icon, title, description, badge }: FeatureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader>
        <motion.div 
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">{badge}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

export default function FeatureSection() {
  const features = [
    {
      icon: <Lightning className="w-6 h-6 text-primary" />,
      title: "Fast Transactions",
      description: "Experience lightning-fast transactions on the Solana blockchain, ensuring quick and efficient operations.",
      badge: "Speed"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Protocol",
      description: "Our robust security measures protect your assets and data, providing peace of mind for all users.",
      badge: "Security"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Energy Efficient",
      description: "BARK leverages Solana's energy-efficient consensus mechanism, minimizing environmental impact.",
      badge: "Eco-friendly"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Innovative MemeFi",
      description: "Unleash the power of memes in finance with our cutting-edge MemeFi features and integrations.",
      badge: "Innovation"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Driven",
      description: "Join a vibrant community of meme enthusiasts and finance experts shaping the future of MemeFi.",
      badge: "Community"
    },
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "Tokenized Memes",
      description: "Create, trade, and earn from meme-inspired tokens, bridging humor with serious finance.",
      badge: "Tokenization"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Empowering the Future of MemeFi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how BARK Protocol is revolutionizing meme-powered finance with cutting-edge features and unparalleled performance.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

