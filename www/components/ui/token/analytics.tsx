'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, ExternalLink, LineChart, TrendingUp, DollarSign, Eye, Search, Activity } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentPrice, get24HourChange, get7DayChange, getTotalVolume, getMarketCap } from "@/utils/bark-price-data"

const analyticsLinks = [
  {
    name: "DexScreener",
    description: "Real-time price charts and trading analytics for BARK token",
    link: "https://dexscreener.com",
    icon: LineChart,
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
    icon: DollarSign,
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
    icon: Eye,
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
    icon: TrendingUp,
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
    icon: Search,
    iconUrl: "https://ucarecdn.com/34411977-b14d-4daa-b825-16f02711cb20/solscan.png?height=32&width=32",
    features: [
      "Transaction history and details",
      "Token transfers and holdings",
      "Smart contract interactions",
      "Network statistics and metrics"
    ]
  },
]

const PriceCard = ({ title, value, change }: { title: string; value: string; change?: number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {change !== undefined && (
        <span className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </span>
      )}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export default function AnalyticsSection() {
  const currentPrice = getCurrentPrice();
  const change24h = get24HourChange();
  const change7d = get7DayChange();
  const totalVolume = getTotalVolume();
  const marketCap = getMarketCap();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PriceCard title="Current Price" value={`$${currentPrice.toFixed(4)}`} change={change24h} />
        <PriceCard title="24h Change" value={`${change24h.toFixed(2)}%`} />
        <PriceCard title="7d Change" value={`${change7d.toFixed(2)}%`} />
        <PriceCard title="Total Volume" value={`$${totalVolume.toLocaleString()}`} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${marketCap.toLocaleString()}</div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsLinks.map((platform) => {
          const Icon = platform.icon
          return (
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
                        className="text-brown-[#D0BFB4]"
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
                  className="w-full bg-transparent hover:bg-brown-[#D0BFB4]/10 border-brown-[#D0BFB4] text-brown-[#D0BFB4] hover:text-brown-[#D0BFB4] transition-colors duration-300"
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
          )
        })}
      </div>
    </div>
  )
}

