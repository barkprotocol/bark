'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Coins, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export interface TokenOption {
  id: string
  name: string
  symbol: string
  standard: 'SPL' | 'Token-2022'
  contractAddress: string
  explorerLink: string
  iconUrl: string
}

const tokenOptions: TokenOption[] = [
  { 
    id: 'bark-spl', 
    name: 'BARK', 
    symbol: 'BARK', 
    standard: 'SPL',
    contractAddress: '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg',
    explorerLink: 'https://solscan.io/token/2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg',
    iconUrl: 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png?height=32&width=32'
  },
  { 
    id: 'bark-2022', 
    name: 'BARK', 
    symbol: 'BARK', 
    standard: 'Token-2022',
    contractAddress: '',
    explorerLink: 'https://explorer.solana.com/address/',
    iconUrl: 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png?height=32&width=32'
  },
  { 
    id: 'bark-liquidity-pool-token', 
    name: 'BARK Liquidity Token', 
    symbol: 'bSOL', 
    standard: 'SPL',
    contractAddress: '',
    explorerLink: 'https://explorer.solana.com/address/',
    iconUrl: 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png?height=32&width=32'
  },
  { 
    id: 'bark-pump-fun', 
    name: 'BARK Community Token',
    symbol: 'BARK', 
    standard: 'SPL',
    contractAddress: '',
    explorerLink: 'https://explorer.solana.com/address/',
    iconUrl: 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png?height=32&width=32'
  },
]

interface TokenSelectorProps {
  onTokenChange: (token: TokenOption) => void
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ onTokenChange }) => {
  const [selectedToken, setSelectedToken] = useState<TokenOption>(tokenOptions[0])

  const handleTokenChange = (tokenId: string) => {
    const newToken = tokenOptions.find(token => token.id === tokenId) || tokenOptions[0]
    setSelectedToken(newToken)
    onTokenChange(newToken)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Coins className="w-5 h-5 mr-2 text-[#D0BFB4]" aria-hidden="true" />
          Select BARK Token
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="token-select">Token</Label>
            <Select onValueChange={handleTokenChange} defaultValue={selectedToken.id}>
              <SelectTrigger id="token-select">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent position="popper">
                {tokenOptions.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    <div className="flex items-center">
                      <Image
                        src={token.iconUrl}
                        alt={`${token.name} icon`}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      {token.name} ({token.symbol}) - {token.standard}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm space-y-2">
            <div className="flex items-center">
              <Image
                src={selectedToken.iconUrl}
                alt={`${selectedToken.name} icon`}
                width={32}
                height={32}
                className="mr-2"
              />
              <p><strong>Selected Token:</strong> {selectedToken.name}</p>
            </div>
            <p><strong>Symbol:</strong> {selectedToken.symbol}</p>
            <p><strong>Standard:</strong> {selectedToken.standard}</p>
            <p><strong>Contract Address:</strong> {selectedToken.contractAddress}</p>
            <p>
              <Link 
                href={selectedToken.explorerLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D0BFB4] hover:underline flex items-center"
              >
                View on Explorer
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TokenSelector