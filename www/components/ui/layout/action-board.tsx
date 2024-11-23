'use client'

import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BarChart3, Users, HeartHandshake, Globe, Wallet, CreditCard, Repeat, Coins } from 'lucide-react'

const features = [
  {
    name: 'Lightning Blinks',
    description: 'Ignite change with instant micro-donations. Create, share, and track your Blinks to make immediate impact.',
    icon: Zap,
  },
  {
    name: 'Impact Dashboard',
    description: 'Visualize your charitable footprint. Track contributions, analyze trends, and celebrate your growing impact.',
    icon: BarChart3,
  },
  {
    name: 'Community-Driven Finance',
    description: 'Join forces with like-minded changemakers. Engage in social-driven financial activities that amplify collective impact.',
    icon: Users,
  },
  {
    name: 'Rewarding Generosity',
    description: 'Turn compassion into opportunity. Earn exclusive rewards and incentives for your charitable actions.',
    icon: HeartHandshake,
  },
  {
    name: 'Swift Disaster Response',
    description: 'Be a beacon of hope in times of crisis. Rapidly mobilize resources and support communities when they need it most.',
    icon: Globe,
  },
  {
    name: 'DeFi Empowerment',
    description: 'Maximize your impact through decentralized finance. Seamlessly interact with DeFi protocols to amplify your charitable contributions.',
    icon: Wallet,
  },
  {
    name: 'Frictionless Payments',
    description: 'Remove barriers to giving. Make secure, instant payments and donations with our streamlined payment system.',
    icon: CreditCard,
  },
  {
    name: 'Dynamic Token Swap',
    description: 'Flexibility at your fingertips. Easily swap tokens to support causes in their preferred currency or token.',
    icon: Repeat,
  },
  {
    name: 'Impactful Staking',
    description: 'Grow your impact while you wait. Stake your tokens to earn rewards and fuel ongoing charitable initiatives.',
    icon: Coins,
  },
]

const Features = memo(function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Your Action Board: Empowering Change
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Unleash the power of BARK Protocol's innovative features to revolutionize charitable giving and social finance. Your journey to making a lasting impact starts here.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg group bg-card hover:bg-card/80">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <feature.icon 
                      className="h-8 w-8 text-primary mr-3 transition-colors duration-300 group-hover:text-primary/80" 
                      aria-hidden="true" 
                    />
                    <h3 className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Features