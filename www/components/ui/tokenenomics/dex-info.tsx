'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Droplet, ExternalLink, TrendingUp } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'

interface DexInfo {
  name: string
  link: string
  description: string
  icon: string
}

const dexList: DexInfo[] = [
  { name: "Raydium", link: "https://raydium.io/", description: "AMM and order book hybrid DEX", icon: "https://ucarecdn.com/7aeec5fd-1178-4117-8e80-fcc244513186/raydium.png" },
  { name: "Meteora", link: "https://meteora.ag/", description: "Concentrated liquidity AMM", icon: "https://ucarecdn.com/12bdbebb-dc65-4377-a5d5-4561075a528d/logometeorasymbol.svg" },
  { name: "Orca", link: "https://www.orca.so/", description: "User-friendly AMM with concentrated liquidity", icon: "https://ucarecdn.com/f8da8728-a99f-478a-b0d9-9ce0bd80a103/orcaorcalogo.svg?v=035" },
  { name: "Jupiter", link: "https://jup.ag/", description: "DEX aggregator for best prices", icon: "https://ucarecdn.com/8b080795-c7e1-4b77-9899-97335febed24/jupiteragjuplogo.svg?v=035" },
  { name: "Pump.fun", link: "https://pump.fun/", description: "Fair-launch platform with bonding curve mechanics", icon: "https://ucarecdn.com/e2f52364-b75b-4588-b3aa-c9c97989124f/pumpfun.jpeg?height=32&width=32" },
  { name: "OpenBook", link: "https://openbookdex.com/", description: "Order book-based DEX for Solana", icon: "https://ucarecdn.com/eafc9123-e16b-4ff3-9e3c-4865eb026b30/openbook.ico?height=32&width=32" }
]

const DexCard: React.FC<DexInfo> = ({ name, link, description, icon }) => {
    return (
      <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
        <CardContent className="p-6">
          <div className="flex items-center mb-2">
            <img src={icon} alt={`${name} logo`} className="w-6 h-6 mr-2" />
            <h4 className="text-xl font-semibold text-foreground dark:text-white">{name}</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button asChild variant="outline" size="sm">
            <Link href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              Visit {name}
              <ExternalLink className="ml-2 h-4 w-4 text-[#D0BFB4]" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  export default function DexInfo() {
    return (
      <>
        <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Decentralized Exchanges</h3>
        <Alert className="mb-6 text-sm">
          <AlertTriangle className="h-4 w-4 text-[#D0BFB4]" aria-hidden="true" />
          <AlertTitle className="text-base font-semibold text-foreground dark:text-white">Initial Liquidity Notice</AlertTitle>
          <AlertDescription>
            Initial liquidity will be provided to ensure a smooth trading experience. The BARK Protocol is committed to maintaining healthy liquidity across multiple DEXes to support token utility and accessibility.
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dexList.map((dex, index) => (
            <DexCard key={index} {...dex} />
          ))}
        </div>
        <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 flex items-center text-foreground dark:text-white">
              <Droplet className="w-6 h-6 mr-2 text-[#D0BFB4]" aria-hidden="true" />
              Liquidity Management Strategy
            </h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Initial liquidity provision across multiple DEXes</li>
              <li>Regular monitoring and rebalancing of liquidity pools</li>
              <li>Incentive programs for liquidity providers</li>
              <li>Gradual increase in liquidity depth over time</li>
            </ul>
          </CardContent>
        </Card>
      </>
    )
  }