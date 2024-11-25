'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VoteIcon, Users, Clock, Shield, Zap, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Governance() {
  return (
    <TooltipProvider>
      <section className="space-y-8" aria-labelledby="governance-title">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="governance-title" className="text-3xl font-bold mb-4 text-foreground dark:text-white">Governance</h2>
          <p className="text-lg text-muted-foreground mb-6">
            BARK utilizes a decentralized governance model, empowering token holders to participate in key decisions that shape the future of the ecosystem.
          </p>
        </motion.div>

        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Governance participation requires holding BARK tokens. Ensure you have BARK tokens in your wallet before attempting to vote or create proposals.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <VoteIcon className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
                Voting Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>1 BARK token = 1 vote</li>
                <li>Staked tokens receive 1.5x voting power</li>
                <li>Maximum voting power cap: 4% of total supply per address</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Users className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
                Proposal Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Minimum 100,000 BARK tokens required to create a proposal</li>
                <li>Proposal fee: 1,000 BARK tokens (burned upon creation)</li>
                <li>7-day discussion period before voting begins</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Clock className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
                Voting Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Voting period: 5 days</li>
                <li>Quorum: 10% of circulating supply must participate</li>
                <li>Passing threshold: 66% majority required</li>
                <li>24-hour timelock before implementation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Shield className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
                Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Multi-sig wallet for critical parameter changes</li>
                <li>Emergency pause function for critical vulnerabilities</li>
                <li>Governance Guard: 30-day lock on re-voting on failed proposals</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-100 dark:bg-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <Zap className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
              Governance Incentives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To encourage active participation in governance, BARK implements the following incentives:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Voting Rewards: 0.01% of the vote weight in BARK tokens for participating in votes</li>
              <li>Proposal Bonus: 5,000 BARK tokens for successfully passed proposals</li>
              <li>Governance Staking: Additional 2% APY for tokens staked in governance</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">
                <Link href="./pages/governance">
                  Governance Portal
                  <VoteIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Access the BARK governance portal to view and participate in proposals</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" variant="outline" className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 w-full sm:w-auto">
                <Link href="./governance/governance-model">
                  Learn More
                  <Zap className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Discover more about BARK's governance model and how to participate</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </TooltipProvider>
  )
}