'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import DashboardLayout from '@/components/governance/dashboard'
import GovernanceOverview from '@/components/governance/overview'
import ProposalList from '@/components/governance/proposal-list'
import VotingPower from '@/components/governance/voting-power'
import DelegationManager from '@/components/governance/delegation-manager'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bone } from 'lucide-react'

const SolanaRealms = dynamic(() => import('@/components/governance/solana-realms'), { ssr: false })

const initialProposals = [
  {
    id: "BARK-001",
    title: "Increase BARK token burn rate",
    description: "Proposal to increase the BARK token burn rate from 1% to 2% per transaction to reduce overall supply.",
    status: 'active',
    votesFor: 15000000,
    votesAgainst: 5000000
  },
  {
    id: "BARK-002",
    title: "Launch BARK NFT collection",
    description: "Introduce a limited edition BARK NFT collection with proceeds going to animal shelters.",
    status: 'passed',
    votesFor: 25000000,
    votesAgainst: 3000000
  },
  {
    id: "BARK-003",
    title: "Reduce staking rewards",
    description: "Proposal to reduce BARK staking rewards from 5% to 3% APY to ensure long-term sustainability.",
    status: 'rejected',
    votesFor: 8000000,
    votesAgainst: 22000000
  }
] as const;

export default function GovernanceDashboard() {
  const [proposals] = useState(initialProposals)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bone className="mr-2 h-8 w-8 text-brown-[#D0BFB4]" />
          Governance Portal
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Governance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GovernanceOverview proposals={proposals} />
            </CardContent>
          </Card>
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Solana Realms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SolanaRealms />
            </CardContent>
          </Card>
        </div>
        <Card className="border-t-4 border-brown-[#D0BFB4]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
              Active Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProposalList proposals={proposals} />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Voting Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VotingPower />
            </CardContent>
          </Card>
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Delegation Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DelegationManager />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}