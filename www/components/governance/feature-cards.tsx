'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Coins, BarChart2 } from 'lucide-react'
import { motion } from "framer-motion"

const features = [
  {
    icon: ShieldCheck,
    title: "Decentralized Decision-Making",
    description: "Participate in shaping the future of BARK Protocol through community-driven governance."
  },
  {
    icon: Coins,
    title: "Stake and Earn",
    description: "Stake your BARK tokens to earn rewards and increase your voting power in the ecosystem."
  },
  {
    icon: BarChart2,
    title: "Transparent Governance",
    description: "Access real-time data on proposals, voting, and governance activities within the BARK Protocol."
  }
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-900">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <feature.icon className="w-12 h-12 text-brown-[#D0BFB4]" aria-hidden="true" />
              </div>
              <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}