'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Users, Zap, Shield, BarChart2, ArrowRight, Heart, Lock, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const features = [
  {
    icon: Coins,
    title: "Governance",
    description: "BARK token holders can participate in governance decisions, shaping the future of the protocol.",
  },
  {
    icon: Users,
    title: "Community Rewards",
    description: "Earn BARK tokens by contributing to the ecosystem through various community-driven initiatives.",
  },
  {
    icon: Zap,
    title: "DeFi Integration",
    description: "Use BARK tokens in various DeFi protocols for lending, borrowing, and yield farming.",
  },
  {
    icon: Shield,
    title: "Staking",
    description: "Stake your BARK tokens to earn rewards and secure the network.",
  },
  {
    icon: BarChart2,
    title: "Liquidity Provision",
    description: "Provide liquidity to BARK pools and earn a share of transaction fees.",
  },
  {
    icon: Heart,
    title: "Donations and Charity",
    description: "Facilitate transparent and efficient charitable donations using BARK tokens and escrow programs.",
  },
]

const HowItWorks: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">How BARK Token Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BARK token is the backbone of our ecosystem, powering governance, rewards, charitable donations, and various DeFi functionalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-[#D0BFB4] mb-2" />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="w-full transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Token Flow in the Ecosystem</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li>Users acquire BARK tokens through exchanges or by participating in community activities.</li>
              <li>Token holders can stake their BARK to earn rewards and gain voting power in governance decisions.</li>
              <li>BARK can be used as collateral in DeFi protocols or to provide liquidity in decentralized exchanges.</li>
              <li>Transaction fees (Token-2022) from various protocol activities are partially used to buy back and burn BARKs, reducing supply over time.</li>
              <li>Community members can earn additional BARK by contributing to the ecosystem's growth and development.</li>
              <li>BARK tokens can be used for charitable donations, with programs ensuring transparency and efficiency.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="w-full transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Advanced Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Lock className="h-6 w-6 text-[#D0BFB4] mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Escrow Services</h3>
                  <p className="text-muted-foreground">BARK utilizes smart contract-based escrow services for secure and trustless transactions, especially useful for large donations or cross-border charitable contributions.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CreditCard className="h-6 w-6 text-[#D0BFB4] mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Payment Solutions</h3>
                  <p className="text-muted-foreground">Integrated payment gateways allow for seamless conversion between BARKs and fiat currencies, facilitating easy donations and payouts to charitable organizations.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" className="bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4] text-black transition-all duration-300 transform hover:scale-105">
                <Link href="/pages/token-utility">
                  Explore Token Utility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more about BARK token's use cases and benefits</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default HowItWorks