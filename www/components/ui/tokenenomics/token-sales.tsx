'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Coins, DollarSign, Users, Calendar, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SaleStage {
  name: string
  allocation: string
  price: string
  vesting: string
  minPurchase: string
  maxPurchase: string
  goal: string
  raised: number
  startDate: string
  endDate: string
}

const saleStages: SaleStage[] = [
  {
    name: "Pre-Sale",
    allocation: "8% of total supply (1,491,200,000 BARK)",
    price: "$0.000000001 per BARK",
    vesting: "5% at TGE, then 5% monthly over 19 months",
    minPurchase: "$5",
    maxPurchase: "$50,000",
    goal: "$5,964,800",
    raised: 3500000, // Example: $3.5M raised so far
    startDate: "2024-12-15",
    endDate: "2024-12-29"
  },
  {
    name: "Public Sale",
    allocation: "5% of total supply (932,000,000 BARK)",
    price: "$0.000000014 per BARK",
    vesting: "20% at TGE, then 20% monthly over 4 months",
    minPurchase: "$10",
    maxPurchase: "$100,000",
    goal: "$9,320,000",
    raised: 0, // Not started yet
    startDate: "2025-01-05",
    endDate: "2025-01-19"
  }
]

export default function TokenSale() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateProgress = (raised: number, goal: string) => {
    const goalAmount = parseFloat(goal.replace('$', '').replace(',', ''))
    return Math.min((raised / goalAmount) * 100, 100)
  }

  const isOngoing = (stage: SaleStage) => {
    const now = new Date()
    const start = new Date(stage.startDate)
    const end = new Date(stage.endDate)
    return now >= start && now <= end
  }

  return (
    <TooltipProvider>
      <section className="space-y-8" aria-labelledby="token-sale-title">
        <h2 id="token-sale-title" className="sr-only">Token Sale Information</h2>
        
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4 text-[#D0BFB4]" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            Token sales are subject to eligibility requirements and regulatory compliance. Please ensure you meet all criteria before participating.
          </AlertDescription>
        </Alert>

        {saleStages.map((stage, index) => (
          <Card key={index} className="w-full transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Coins className="mr-2 h-6 w-6 text-[#D0BFB4]" aria-hidden="true" />
                {stage.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Allocation</p>
                  <p className="font-semibold">{stage.allocation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Price</p>
                  <p className="font-semibold">{stage.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Vesting</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="font-semibold cursor-help underline decoration-dotted">{stage.vesting}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>TGE: Token Generation Event - The initial distribution of tokens after the sale concludes.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Purchase Limits</p>
                  <p className="font-semibold">Min: {stage.minPurchase} / Max: {stage.maxPurchase}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{`$${stage.raised.toLocaleString()} / ${stage.goal}`}</span>
                </div>
                <Progress 
                  value={calculateProgress(stage.raised, stage.goal)} 
                  className="h-2" 
                  aria-label={`${stage.name} progress`}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-[#D0BFB4]" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(stage.startDate)} - {formatDate(stage.endDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-[#D0BFB4]" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    {stage.raised > 0 ? '2,500+ participants' : 'Not started'}
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4] text-black transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/token-sale">
                    {isOngoing(stage) ? 'Join Sale' : (stage.raised > 0 ? 'Sale Ended' : 'Get Notified')}
                    <DollarSign className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="mr-2 h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />
            Additional Information
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>All unsold tokens from each stage will be burned or added to the community treasury.</li>
            <li>Participation in the token sale may be subject to KYC/AML procedures.</li>
            <li>The BARK team reserves the right to adjust sale parameters if necessary for regulatory compliance.</li>
            <li>Detailed information about token utility and project roadmap can be found in our whitepaper.</li>
          </ul>
        </div>
      </section>
    </TooltipProvider>
  )
}