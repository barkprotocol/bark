'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentPrice, get24HourChange, get7DayChange, getTotalVolume, getMarketCap } from "@/utils/market-data/bark-price-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

const analyticsLinks = [
  {
    name: "DexScreener",
    description: "Real-time price charts and trading analytics for BARK token",
    link: "https://dexscreener.com",
    iconUrl: "https://ucarecdn.com/43a0c33f-bb25-46a1-a2a1-e81b3ac91f54/dexscreener.png?height=32&width=32",
    features: [
      "Live price tracking",
      "Trading volume analysis",
      "Liquidity monitoring",
      "Multi-DEX overview"
    ]
  },
  {
    name: "CoinMarketCap",
    description: "Comprehensive market data, rankings, and analytics for BARK",
    link: "https://coinmarketcap.com",
    iconUrl: "https://ucarecdn.com/ab6e1d0a-0a17-4a33-971a-0ea6564ea72e/CoinMarketCap.png?height=32&width=32",
    features: [
      "Global market cap rankings",
      "Price, volume, and market cap data",
      "Historical data charts",
      "Cryptocurrency details and metrics"
    ]
  },
  {
    name: "Birdeye",
    description: "Advanced analytics and trading tools for Solana tokens",
    link: "https://birdeye.so",
    iconUrl: "https://ucarecdn.com/7012a8a5-cded-4837-9057-6cbcdf4cb350/birdeye.png?height=32&width=32",
    features: [
      "Real-time token analytics",
      "Advanced charting tools",
      "Wallet tracking and analysis",
      "DeFi ecosystem insights"
    ]
  },
  {
    name: "CoinGecko",
    description: "Comprehensive cryptocurrency data and market insights",
    link: "https://www.coingecko.com",
    iconUrl: "https://ucarecdn.com/a2f82922-0402-4ec9-8bc8-6e5f86820289/CoinGecko.png?height=32&width=32",
    features: [
      "Price charts and market data",
      "Historical data and analysis",
      "Community trust scores",
      "Developer and social metrics"
    ]
  },
  {
    name: "Solscan",
    description: "Solana blockchain explorer and analytics platform",
    link: "https://solscan.io",
    iconUrl: "https://ucarecdn.com/34411977-b14d-4daa-b825-16f02711cb20/solscan.png?height=32&width=32",
    features: [
      "Transaction history and details",
      "Token transfers and holdings",
      "Smart contract interactions",
      "Network statistics and metrics"
    ]
  },
]

interface PriceCardProps {
  title: string
  value: string
  change?: number
  isLoading: boolean
}

const PriceCard: React.FC<PriceCardProps> = ({ title, value, change, isLoading }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {!isLoading && change !== undefined && (
        <span className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </span>
      )}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-full" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
)

export default function AnalyticsSection() {
  const [marketData, setMarketData] = useState({
    currentPrice: 0,
    change24h: 0,
    change7d: 0,
    totalVolume: 0,
    marketCap: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [price, change24h, change7d, volume, cap] = await Promise.all([
          getCurrentPrice(),
          get24HourChange(),
          get7DayChange(),
          getTotalVolume(),
          getMarketCap()
        ])
        setMarketData({
          currentPrice: price,
          change24h,
          change7d,
          totalVolume: volume,
          marketCap: cap,
        })
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch market data:', err)
        setError('Failed to load market data. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PriceCard 
          title="Current Price" 
          value={`$${marketData.currentPrice.toFixed(4)}`} 
          change={marketData.change24h} 
          isLoading={isLoading}
        />
        <PriceCard 
          title="24h Change" 
          value={`${marketData.change24h.toFixed(2)}%`} 
          isLoading={isLoading}
        />
        <PriceCard 
          title="7d Change" 
          value={`${marketData.change7d.toFixed(2)}%`} 
          isLoading={isLoading}
        />
        <PriceCard 
          title="Total Volume" 
          value={`$${marketData.totalVolume.toLocaleString()}`} 
          isLoading={isLoading}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <div className="text-2xl font-bold">${marketData.marketCap.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsLinks.map((platform) => (
          <Card key={platform.name} className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brown-[#D0BFB4]/10 flex items-center justify-center mr-3">
                    <Image
                      src={platform.iconUrl}
                      alt={`${platform.name} icon`}
                      width={20}
                      height={20}
                      className="text-[#D0BFB4]"
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground dark:text-white">
                    {platform.name}
                  </CardTitle>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {platform.description}
              </p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="mb-4">
                <ul className="space-y-2">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brown-[#D0BFB4] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="w-full bg-transparent hover:bg-brown-[#D0BFB4]/10 border-brown-[#D0BFB4] text-[#D0BFB4] hover:text-[#D0BFB4] transition-colors duration-300"
              >
                <Link 
                  href={platform.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Visit Platform
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

