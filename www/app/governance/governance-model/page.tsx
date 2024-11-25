'use client'

import React from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/components/governance/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VoteIcon, Users, Clock, Shield, Zap, AlertTriangle, Bone } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function GovernanceModel() {
  return (
    <DashboardLayout>
      <TooltipProvider>
        <section className="space-y-8" aria-labelledby="governance-title">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 id="governance-title" className="text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              <Bone className="mr-2 h-8 w-8 text-brown-[#D0BFB4]" />
              Governance Model
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              BARK utilizes a decentralized governance model, empowering token holders to participate in key decisions that shape the future of the ecosystem.
            </p>
          </motion.div>

          <Alert variant="warning" className="mb-6 border-brown-[#D0BFB4]">
            <AlertTriangle className="h-4 w-4 text-brown-[#D0BFB4]" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Governance participation requires holding BARK tokens. Ensure you have BARK tokens in your wallet before attempting to vote or create proposals.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-brown-[#D0BFB4]">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <VoteIcon className="w-6 h-6 mr-2 text-brown-[#D0BFB4]" aria-hidden="true" />
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

            <Card className="border-t-4 border-brown-[#D0BFB4]">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Users className="w-6 h-6 mr-2 text-brown-[#D0BFB4]" aria-hidden="true" />
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

            <Card className="border-t-4 border-brown-[#D0BFB4]">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Clock className="w-6 h-6 mr-2 text-brown-[#D0BFB4]" aria-hidden="true" />
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

            <Card className="border-t-4 border-brown-[#D0BFB4]">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Shield className="w-6 h-6 mr-2 text-brown-[#D0BFB4]" aria-hidden="true" />
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

          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Zap className="w-6 h-6 mr-2 text-brown-[#D0BFB4]" aria-hidden="true" />
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
                <Button asChild size="lg" className="bg-brown-[#D0BFB4] hover:bg-brown-[#C0AF94] text-white">
                  <Link href="/governance">
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
                <Button asChild size="lg" variant="outline" className="border-brown-[#D0BFB4] text-brown-[#D0BFB4] hover:bg-brown-[#D0BFB4] hover:text-white">
                  <Link href="/governance/proposals">
                    View Proposals
                    <Zap className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View and participate in active BARK governance proposals</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>
      </TooltipProvider>
    </DashboardLayout>
  )
}
