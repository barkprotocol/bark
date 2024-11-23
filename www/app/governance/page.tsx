'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import {
  getRealm,
  getGovernanceProgramVersion,
  Governance,
  Realm,
  ProgramAccount,
} from '@solana/spl-governance'
import ProposalList from '@/components/governance/proposal-list'
import GovernanceOverview from '@/components/governance/governance-overview'
import VotingPower from '@/components/governance/voting-power'
import StartCreatingProposal from '@/components/governance/start-creating-proposal'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'

type Proposal = {
  id: string
  title: string
  description: string
  status: 'active' | 'passed' | 'rejected'
  votesFor: number
  votesAgainst: number
}

export default function GovernancePage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [realm, setRealm] = useState<ProgramAccount<Realm> | null>(null)
  const [governance, setGovernance] = useState<ProgramAccount<Governance> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
    const fetchGovernanceData = async () => {
      if (!connection) return

      try {
        setLoading(true)
        setError(null)

        const realmPubkey = new PublicKey(process.env.NEXT_PUBLIC_REALM_ADDRESS!)
        const programId = new PublicKey(process.env.NEXT_PUBLIC_GOVERNANCE_PROGRAM_ID!)

        const programVersion = await getGovernanceProgramVersion(connection, programId)
        const fetchedRealm = await getRealm(connection, realmPubkey)
        setRealm(fetchedRealm)

        if (fetchedRealm && fetchedRealm.account.authority) {
          const fetchedGovernance = await Governance.load(connection, fetchedRealm.account.authority)
          setGovernance(fetchedGovernance)
        }

        // Fetch proposals (replace with actual API call when available)
        const fetchedProposals: Proposal[] = [
          {
            id: '1',
            title: 'Increase Staking Rewards',
            description: 'Proposal to increase staking rewards by 2% for all BARK token holders.',
            status: 'active',
            votesFor: 1500000,
            votesAgainst: 500000,
          },
          {
            id: '2',
            title: 'Implement Burning Mechanism',
            description: 'Introduce a token burning mechanism to reduce total supply over time.',
            status: 'active',
            votesFor: 2000000,
            votesAgainst: 1000000,
          },
          {
            id: '3',
            title: 'Launch Community Fund',
            description: 'Create a community-managed fund for supporting ecosystem projects.',
            status: 'passed',
            votesFor: 3000000,
            votesAgainst: 500000,
          },
        ]
        setProposals(fetchedProposals)

      } catch (err) {
        console.error('Error fetching governance data:', err)
        setError('Failed to load governance data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchGovernanceData()
  }, [connection])

  const handleVote = async (proposalId: string, voteFor: boolean) => {
    if (!publicKey) {
      setError('Please connect your wallet to vote.')
      return
    }

    // This is a mock function. Replace with actual blockchain interaction.
    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votesFor: voteFor ? proposal.votesFor + 1 : proposal.votesFor,
              votesAgainst: voteFor ? proposal.votesAgainst : proposal.votesAgainst + 1,
            }
          : proposal
      )
    )
  }

  const handleCreateProposal = async (title: string, description: string) => {
    // This is a mock function. Replace with actual blockchain interaction.
    const newProposal: Proposal = {
      id: (proposals.length + 1).toString(),
      title,
      description,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0,
    }
    setProposals(prevProposals => [...prevProposals, newProposal])
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Governance</h1>
      
      <GovernanceOverview proposals={proposals} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VotingPower />
        <Card>
          <CardHeader>
            <CardTitle>Governance Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Realm: {realm?.pubkey.toBase58()}</p>
            <p>Governance: {governance?.pubkey.toBase58()}</p>
          </CardContent>
        </Card>
      </div>
      
      <StartCreatingProposal onCreateProposal={handleCreateProposal} />
      
      <ProposalList proposals={proposals} onVote={handleVote} />
      
      {!publicKey && (
        <Alert className="mt-8">
          <AlertTitle>Connect Your Wallet</AlertTitle>
          <AlertDescription>
            Please connect your wallet to participate in governance activities.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}