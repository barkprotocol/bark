'use client'

import React, { useState, useEffect } from 'react'
import { Metadata } from 'next'
import AnalyticsSection from '@/components/ui/token/analytics'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, ExternalLink } from 'lucide-react'
import PriceChart from '@/components/ui/token/price-chart'
import PriceCard from '@/components/ui/token/price-card'
import Calculator from '@/components/ui/token/calculator'
import MarketOverview from '@/components/ui/tokenenomics/market-overview'
import TokenSelector, { TokenOption } from '@/components/ui/token/token-selector'
import Link from 'next/link'
import Image from 'next/image'
import { fetchCoinMarketCapData, fetchCoinGeckoData } from '@/utils/api'

export const metadata: Metadata = {
  title: 'BARK Analytics',
  description: 'View real-time analytics and market data for the BARK tokens.',
}

export interface TokenDetail {
  label: string
  value: string
  link?: string
}

interface TokenDetailsCardProps {
  title: string
  details: TokenDetail[]
  iconUrl: string
}

export const TokenDetailsCard: React.FC<TokenDetailsCardProps> = ({ title, details, iconUrl }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground dark:text-white flex items-center">
          <Image
            src={iconUrl}
            alt={`${title} icon`}
            width={24}
            height={24}
            className="mr-2"
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="font-medium mr-2">{detail.label}:</span>
              {detail.link ? (
                <Link 
                  href={detail.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brown-[#D0BFB4] hover:underline flex items-center"
                >
                  {detail.value}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
              ) : (
                <span className="text-muted-foreground">{detail.value}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [selectedToken, setSelectedToken] = useState<TokenOption>({
    id: 'bark-spl',
    name: 'BARK SPL',
    symbol: 'BARK',
    standard: 'SPL',
    contractAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    explorerLink: 'https://explorer.solana.com/address/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    iconUrl: '/placeholder.svg?height=32&width=32'
  })

  const [tokenData, setTokenData] = useState({
    currentPrice: 0,
    change24h: 0,
    change7d: 0,
    totalVolume: 0,
    marketCap: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cmcData, cgData] = await Promise.all([
          fetchCoinMarketCapData(selectedToken.symbol),
          fetchCoinGeckoData('bark')  // Assuming 'bark' is the CoinGecko ID for BARK token
        ]);

        setTokenData({
          currentPrice: cmcData.price,
          change24h: cmcData.percent_change_24h,
          change7d: cmcData.percent_change_7d,
          totalVolume: cgData.total_volume,
          marketCap: cmcData.market_cap,
        });
      } catch (error) {
        console.error('Error fetching token data:', error);
        // Handle error state here
      }
    };

    fetchData();
  }, [selectedToken]);

  const tokenDetails: TokenDetail[] = [
    { label: 'Name', value: selectedToken.name },
    { label: 'Symbol', value: selectedToken.symbol },
    { label: 'Standard', value: selectedToken.standard },
    { label: 'Contract Address', value: selectedToken.contractAddress, link: selectedToken.explorerLink },
    { label: 'Current Price', value: `$${tokenData.currentPrice.toFixed(4)}` },
    { label: '24h Change', value: `${tokenData.change24h.toFixed(2)}%` },
    { label: '7d Change', value: `${tokenData.change7d.toFixed(2)}%` },
    { label: 'Total Volume', value: `$${tokenData.totalVolume.toLocaleString()}` },
    { label: 'Market Cap', value: `$${tokenData.marketCap.toLocaleString()}` },
  ]

  const handleTokenChange = (token: TokenOption) => {
    setSelectedToken(token)
    // The useEffect hook will trigger a new data fetch when selectedToken changes
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">BARK Token Analytics</h1>
      <div className="mb-8">
        <TokenSelector onTokenChange={handleTokenChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PriceCard title="Current Price" value={`$${tokenData.currentPrice.toFixed(4)}`} change={tokenData.change24h} />
        <PriceCard title="24h Change" value={`${tokenData.change24h.toFixed(2)}%`} change={tokenData.change24h} />
        <PriceCard title="7d Change" value={`${tokenData.change7d.toFixed(2)}%`} change={tokenData.change7d} />
        <PriceCard title="Total Volume" value={`$${tokenData.totalVolume.toLocaleString()}`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TokenDetailsCard title={`${selectedToken.name} Overview`} details={tokenDetails} iconUrl={selectedToken.iconUrl} />
        <PriceChart />
      </div>
      <div className="mb-8">
        <MarketOverview />
      </div>
      <div className="mb-8">
        <Calculator />
      </div>
      <AnalyticsSection />
    </div>
  )
}

