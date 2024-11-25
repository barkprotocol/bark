'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { getRealm, getTokenOwnerRecordForRealm } from '@solana/spl-governance'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bone, AlertTriangle } from 'lucide-react'

const REALM_ADDRESS = new PublicKey('2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg')
const GOVERNANCE_PROGRAM_ID = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw')

export function SolanaRealms() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [realmInfo, setRealmInfo] = useState<any>(null)
  const [votingPower, setVotingPower] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRealmInfo() {
      if (!publicKey) return

      try {
        const realm = await getRealm(connection, REALM_ADDRESS)
        setRealmInfo(realm)

        const tokenOwnerRecord = await getTokenOwnerRecordForRealm(
          connection,
          GOVERNANCE_PROGRAM_ID,
          REALM_ADDRESS,
          realm.account.communityMint,
          publicKey
        )

        if (tokenOwnerRecord) {
          setVotingPower(tokenOwnerRecord.account.governingTokenDepositAmount.toNumber())
        }
      } catch (err) {
        console.error('Error fetching realm info:', err)
        setError('Failed to fetch realm information. Please try again.')
      }
    }

    fetchRealmInfo()
  }, [connection, publicKey])

  const handleJoinRealm = async () => {
    if (!publicKey) {
      setError('Please connect your wallet to join the realm.')
      return
    }

    // Implement join realm logic here
    // This would typically involve creating a token owner record
    // and depositing governance tokens
    setError('Join realm functionality not yet implemented.')
  }

  return (
    <Card className="w-full shadow-lg bg-white dark:bg-gray-800 border-t-4 border-brown-[#D0BFB4]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bone className="mr-2 h-6 w-6 text-brown-[#D0BFB4]" />
          BARK Governance Realm
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {realmInfo ? (
          <div className="space-y-4">
            <p className="text-lg">Realm Name: {realmInfo.account.name}</p>
            <p className="text-lg">Your Voting Power: {votingPower !== null ? votingPower : 'N/A'}</p>
            <Button 
              onClick={handleJoinRealm}
              className="bg-brown-[#D0BFB4] hover:bg-brown-[#C0AF94] text-white transition-colors duration-200"
            >
              Join Realm
            </Button>
          </div>
        ) : (
          <p className="text-lg">Loading realm information...</p>
        )}
      </CardContent>
    </Card>
  )
}

export default SolanaRealms

