'use client'

import React, { useState, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Coins, Users, Code, Droplet, Megaphone, ShieldCheck, PieChartIcon, BarChartIcon, Lock, Zap, DollarSign, ExternalLink, VoteIcon, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ErrorBoundary from '@/components/ui/error-boundary'
import { TokenDetailsCard, TokenDetail } from '@/components/ui/layout/token-details-card'

// Lazy-loaded components
const EmissionChart = lazy(() => import('@/components/ui/tokenenomics/emission-chart'))
const DistributionPieChart = lazy(() => import('@/components/ui/tokenenomics/distribution-pie-chart'))
const VestingSchedule = lazy(() => import('@/components/ui/tokenenomics/vesting-schedule'))
const Governance = lazy(() => import('@/components/ui/tokenenomics/governance'))
const TokenSales = lazy(() => import('@/components/ui/tokenenomics/token-sales'))
const AnalyticsSection = lazy(() => import('@/components/ui/token/analytics'))
const DexInfo = lazy(() => import('@/components/ui/tokenenomics/dex-info'))

// Types
type TabContentKey = 'overview' | 'distribution' | 'vesting' | 'emission' | 'tokensales' | 'dex' | 'governance' | 'analytics'

interface TokenDistribution {
  name: string
  value: number
  color: string
  icon: React.ElementType
}

interface EmissionSchedule {
  year: number
  emission: number
  totalSupply: number
}

// Data
const tokenDistribution: TokenDistribution[] = [
  { name: 'Community', value: 30, color: '#FFECB1', icon: Users },
  { name: 'Development', value: 20, color: '#FFD466', icon: Code },
  { name: 'Team', value: 15, color: '#FFBD1B', icon: Users },
  { name: 'Liquidity', value: 20, color: '#E6A600', icon: Droplet },
  { name: 'Ecosystem & Marketing', value: 10, color: '#B38300', icon: Megaphone },
  { name: 'Reserve', value: 5, color: '#805D00', icon: ShieldCheck },
]

const emissionSchedule: EmissionSchedule[] = [
  { year: 2024, emission: 372800000, totalSupply: 19012800000 },
  { year: 2025, emission: 365344000, totalSupply: 19378144000 },
  { year: 2026, emission: 358036920, totalSupply: 19736180920 },
  { year: 2027, emission: 350876182, totalSupply: 20087057102 },
  { year: 2028, emission: 343858658, totalSupply: 20430915760 },
]

const TokenomicsCard: React.FC<{ title: string; value: string; description: string; icon: React.ElementType }> = ({ title, value, description, icon: Icon }) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold flex items-center text-foreground dark:text-white">
          <Icon className="w-6 h-6 mr-2 text-brown-500" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

const VestingScheduleCard: React.FC<{ title: string; schedule: string; icon: React.ElementType }> = ({ title, schedule, icon: Icon }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <Icon className="w-6 h-6 mr-2 text-brown-500" aria-hidden="true" />
          <h4 className="text-lg font-semibold text-foreground dark:text-white">{title}</h4>
        </div>
        <p className="text-sm">{schedule}</p>
      </CardContent>
    </Card>
  )
}

const Overview: React.FC = () => {
  const tokenDetails: TokenDetail[] = [
    { label: 'Name', value: 'BARK' },
    { label: 'Symbol', value: 'BARK' },
    { label: 'Decimals', value: '9' },
    { label: 'Blockchain', value: 'Solana' },
    { label: 'Token Type(s)', value: 'SPL & Token-2022' },
  ]

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Overview</h3>
      <div className="mb-6 text-muted-foreground">
        <p>
          BARK is designed to be the backbone of our ecosystem, facilitating charitable giving, disaster relief, and community-driven initiatives. With built-in mechanisms for{' '}
          <Tooltip>
            <TooltipTrigger className="underline cursor-help">staking</TooltipTrigger>
            <TooltipContent>
              Staking involves locking up BARK tokens (BARK) to support network operations and earn rewards.
            </TooltipContent>
          </Tooltip>
          ,{' '}
          <Tooltip>
            <TooltipTrigger className="underline cursor-help">governance</TooltipTrigger>
            <TooltipContent>
              Token holders can participate in decision-making processes that shape the future of the project.
            </TooltipContent>
          </Tooltip>
          , and sustainable growth, BARK Protocol aims to create long-term value for holders while making a positive impact on the world.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TokenDetailsCard title="Token Details" details={tokenDetails} />
        <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 text-foreground dark:text-white">Key Features</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Zap className="w-5 h-5 mr-2 text-brown-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span><strong>Staking Rewards:</strong> <span className="font-normal">Up to 8% APY for token stakers</span></span>
              </li>
              <li className="flex items-start">
                <Coins className="w-5 h-5 mr-2 text-brown-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span><strong>Burn Mechanism:</strong> <span className="font-normal">1% of all transaction fees are burned</span></span>
              </li>
              <li className="flex items-start">
                <VoteIcon className="w-5 h-5 mr-2 text-brown-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span><strong>Governance:</strong> <span className="font-normal">Token holders can participate in DAO voting</span></span>
              </li>
              <li className="flex items-start">
                <Droplet className="w-5 h-5 mr-2 text-brown-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span><strong>Use Cases:</strong> <span className="font-normal">Governance, staking, DeFi integrations, charity</span></span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

const Distribution: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Distribution</h3>
      <DistributionPieChart data={tokenDistribution} title="Allocation" />
    </>
  )
}

const Vesting: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Vesting Schedule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Community", schedule: "25% unlocked at TGE, remaining vested over 24 months", icon: Users },
          { title: "Development", schedule: "10% unlocked at TGE, remaining vested over 36 months", icon: Code },
          { title: "Team", schedule: "12-month cliff, then vested over 36 months", icon: Users },
          { title: "Liquidity", schedule: "50% unlocked at TGE, remaining vested over 12 months", icon: Droplet },
          { title: "Ecosystem & Marketing", schedule: "20% unlocked at TGE, remaining vested over 24 months", icon: Megaphone },
          { title: "Reserve", schedule: "Locked for 6 months, then vested over 24 months", icon: ShieldCheck }
        ].map((item, index) => (
          <VestingScheduleCard key={index} title={item.title} schedule={item.schedule} icon={item.icon} />
        ))}
      </div>
      <VestingSchedule />
    </>
  )
}

const Emission: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Emission Rates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-2 flex items-center text-foreground dark:text-white">
              <Coins className="w-5 h-5 mr-2 text-brown-500" aria-hidden="true" />
              Initial Supply
            </h4>
            <p className="text-md">18,271,889,396.27 BARK</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-2 flex items-center text-foreground dark:text-white">
              <Zap className="w-5 h-5 mr-2 text-brown-500" aria-hidden="true" />
              Annual Inflation Rate
            </h4>
            <p className="text-md">Starting at 2%, decreasing by 0.25% each year</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold  mb-2 flex items-center text-foreground dark:text-white">
              <PieChartIcon className="w-5 h-5 mr-2 text-brown-500" aria-hidden="true" />
              Emission Distribution
            </h4>
            <p className="text-md">50% staking rewards, 30% ecosystem, 20% community</p>
          </CardContent>
        </Card>
      </div>
      <EmissionChart data={emissionSchedule} title="Emission Schedule" />
    </>
  )
}

const TokenSalesInfo: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Token Sales Information</h3>
      <TokenSales />
    </>
  )
}

const GovernanceInfo: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-foreground dark:text-white">Autonomous Organization (DAO)</h3>
      <Governance />
    </>
  )
}

export default function Tokenomics() {
  const [activeTab, setActiveTab] = useState<TabContentKey>('overview')

  const handleTabChange = (value: TabContentKey) => {
    setActiveTab(value)
  }

  const tabContent = useMemo(() => ({
    overview: <Overview />,
    distribution: <Distribution />,
    vesting: <Vesting />,
    emission: <Emission />,
    tokensales: <TokenSalesInfo />,
    dex: <Suspense fallback={<div>Loading DEX information...</div>}><DexInfo /></Suspense>,
    governance: <GovernanceInfo />,
    analytics: <Suspense fallback={<div>Loading Analytics...</div>}><AnalyticsSection /></Suspense>,
  }), [])

  const tabConfig = [
    { value: 'overview', icon: BarChartIcon, label: 'Overview' },
    { value: 'distribution', icon: PieChartIcon, label: 'Distribution' },
    { value: 'vesting', icon: Lock, label: 'Vesting' },
    { value: 'emission', icon: Zap, label: 'Emission' },
    { value: 'tokensales', icon: DollarSign, label: 'Token Sales' },
    { value: 'dex', icon: ExternalLink, label: 'DEX' },
    { value: 'governance', icon: VoteIcon, label: 'Governance' },
    { value: 'analytics', icon: TrendingUp, label: 'Analytics' },
  ]

  return (
    <TooltipProvider>
      <section className="py-16" id="tokenomics" aria-label="Tokenomics">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-foreground dark:text-white sm:text-4xl lg:text-5xl mb-4">
              Tokenomics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the economic model powering BARK's ecosystem and learn how it drives value for token holders and the community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <TokenomicsCard
              title="Total Supply"
              value="18,640,000,000"
              description="The maximum number of BARK tokens at launch"
              icon={Coins}
            />
            <TokenomicsCard
              title="Initial Circulating Supply"
              value="11,500,000,000"
              description="BARK tokens available in the market at TGE"
              icon={Coins}
            />
            <TokenomicsCard
              title="Token Standard"
              value="SPL"
              description="Built on Solana for fast, efficient transactions"
              icon={Coins}
            />
          </div>

          <ErrorBoundary fallback={<div>An error occurred while loading the tokenomics information.</div>}>
            <Card className="mb-12 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-950">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" onValueChange={(value) => handleTabChange(value as TabContentKey)}>
                  <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full mb-8">
                    {tabConfig.map(({ value, icon: Icon, label }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-1`}
                      >
                        <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                        <span>{label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TabsContent value={activeTab}>
                        <Suspense fallback={<div className="text-center">Loading...</div>}>
                          {tabContent[activeTab]}
                        </Suspense>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </ErrorBoundary>
        </div>
      </section>
    </TooltipProvider>
  )
}