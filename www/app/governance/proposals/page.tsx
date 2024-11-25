'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/governance/dashboard'
import ProposalList from '@/components/governance/proposal-list'
import StartCreatingProposal from '@/components/governance/start-creating-proposal'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bone } from 'lucide-react'

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

export default function ProposalsPage() {
  const [proposals, setProposals] = useState(initialProposals)
  const [activeTab, setActiveTab] = useState('list')

  const handleCreateProposal = async (title: string, description: string) => {
    const newProposal = {
      id: `BARK-${proposals.length + 1}`.padStart(7, '0'),
      title,
      description,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0
    }
    setProposals([...proposals, newProposal])
    setActiveTab('list')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bone className="mr-2 h-8 w-8 text-brown-[#D0BFB4]" />
          Proposals
        </h1>
        <Card className="border-t-4 border-brown-[#D0BFB4]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
              Manage Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="list">View Proposals</TabsTrigger>
                <TabsTrigger value="create">Create Proposal</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <ProposalList proposals={proposals} />
              </TabsContent>
              <TabsContent value="create">
                <StartCreatingProposal onCreateProposal={handleCreateProposal} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
