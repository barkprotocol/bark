'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PlusCircle, AlertTriangle, Info, Bone } from 'lucide-react'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

interface StartCreatingProposalProps {
  onCreateProposal: (title: string, description: string) => Promise<void>
}

const BARK_TOKEN_MINT = new PublicKey('2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg')
const REQUIRED_TOKENS = 1500000 // 1,500,000 tokens required
const AUTHORITY_ADDRESS = new PublicKey('BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo')

export function StartCreatingProposal({ onCreateProposal }: StartCreatingProposalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [canCreateProposal, setCanCreateProposal] = useState(false)
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    async function checkEligibility() {
      if (!publicKey) {
        setCanCreateProposal(false)
        return
      }

      try {
        // Check if the user is the authority
        if (publicKey.equals(AUTHORITY_ADDRESS)) {
          setCanCreateProposal(true)
          return
        }

        // Check token balance
        const tokenAccount = await getAssociatedTokenAddress(BARK_TOKEN_MINT, publicKey)
        const account = await getAccount(connection, tokenAccount)
        const balance = Number(account.amount)

        setCanCreateProposal(balance >= REQUIRED_TOKENS)
      } catch (err) {
        console.error('Error checking eligibility:', err)
        setCanCreateProposal(false)
      }
    }

    checkEligibility()
  }, [publicKey, connection])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      setError('Please connect your wallet to create a proposal.')
      return
    }
    if (!canCreateProposal) {
      setError('You do not have enough BARK tokens or authority to create a proposal.')
      return
    }
    if (!title || !description) {
      setError('Please fill in both title and description.')
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await onCreateProposal(title, description)
      setTitle('')
      setDescription('')
    } catch (err) {
      setError('Failed to create proposal. Please try again.')
      console.error('Error creating proposal:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-t-4 border-brown-[#D0BFB4]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Bone className="mr-2 h-6 w-6 text-brown-[#D0BFB4]" />
          Create New Proposal
        </CardTitle>
        <CardDescription>
          Submit a new proposal for the BARK community to vote on.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-brown-100 dark:bg-brown-900 border-brown-200 dark:border-brown-800">
          <Info className="h-4 w-4 text-brown-500 dark:text-brown-400" />
          <AlertTitle>Eligibility Requirement</AlertTitle>
          <AlertDescription>
            To create a proposal, you must either be the designated authority or hold at least 500,000 BARK tokens.
          </AlertDescription>
        </Alert>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Proposal Title
            </label>
            <Input
              id="title"
              placeholder="Enter proposal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={!canCreateProposal}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Proposal Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your proposal in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              disabled={!canCreateProposal}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || !canCreateProposal}
          className="w-full bg-brown-[#D0BFB4] hover:bg-brown-[#C0AF94] text-white transition-colors duration-200"
        >
          {isSubmitting ? (
            <>
              <PlusCircle className="mr-2 h-4 w-4 animate-spin" />
              Creating Proposal...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Proposal
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StartCreatingProposal