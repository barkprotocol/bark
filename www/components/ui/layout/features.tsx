'use client'

import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3Icon, HeartHandshakeIcon, ZapIcon, UsersIcon, WalletIcon, GlobeIcon } from 'lucide-react'

const features = [
  {
    name: 'Blinks',
    description: 'Ignite change with instant micro-payments, donations. Create, share, and track your Blinks to make immediate impact.',
    icon: ZapIcon,
  },
  {
    name: 'User Dashboard',
    description: 'Visualize your charitable footprint, swap tokens to support causes in their preferred currency or token. Track contributions, analyze trends, and celebrate your growing impact.',
    icon: BarChart3Icon,
  },
  {
    name: 'Social Finance',
    description: 'Maximize your impact through social finance. Seamlessly interact with DeFi protocols to amplify your charitable contributions.',
    icon: UsersIcon,
  },
  {
    name: 'Charity Incentives',
    description: 'Earn rewards and incentives for your charitable actions and contributions. Boost your impact while receiving recognition.',
    icon: HeartHandshakeIcon,
  },
  {
    name: 'Disaster Relief',
    description: 'Be a beacon of hope in times of crisis. Rapidly mobilize resources and support communities when they need it most through our efficient disaster relief system.',
    icon: GlobeIcon,
  },
  {
    name: 'Frictionless Payments',
    description: 'Remove barriers to giving. Make secure, instant payments and donations with our streamlined payment system, ensuring your contributions reach their destination quickly.',
    icon: WalletIcon,
  },
]

const Features = memo(function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-brown-[#D0BFB4]/5 to-transparent" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Empowering Features for Social Impact
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how BARK Protocol revolutionizes charitable giving and social finance.
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
              <Card className="h-full transition-all duration-300 group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_20px_rgba(208,191,180,0.2),0_6px_6px_rgba(208,191,180,0.1)] hover:translate-y-[-2px]" style={{ transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-brown-[#D0BFB4]/10 mr-3 transition-colors duration-300 group-hover:bg-brown-[#D0BFB4]/20">
                      <feature.icon 
                        className="h-6 w-6 text-brown-[#D0BFB4] transition-colors duration-300 group-hover:text-brown-[#D2BFB4] dark:group-hover:text-brown-[#D0BFB4]" 
                        aria-hidden="true" 
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-brown-[#D2BFB4] dark:group-hover:text-brown-[#D0BFB4]">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground transition-colors duration-300 flex-grow mt-2 group-hover:text-foreground">
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