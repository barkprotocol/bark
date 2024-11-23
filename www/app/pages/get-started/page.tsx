'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wallet, Coins, ArrowRight, CheckCircle, AlertCircle, Zap, Users, FileText, AlertTriangle, Rocket, Repeat, LightbulbIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const BARK_LOGO_URL = 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
const PHANTOM_LOGO_URL = 'https://ucarecdn.com/94ea7031-b2ea-4851-aa1d-553ff5405ea5/phantom.png'
const SOLFLARE_LOGO_URL = 'https://ucarecdn.com/5220efce-b81a-416b-b3d7-f5dfd95e6635/solflare.png'

const steps = [
  { id: 'wallet', title: 'Set Up Wallet', icon: Wallet },
  { id: 'acquire', title: 'Acquire BARK', icon: Coins },
  { id: 'stake', title: 'Stake Tokens', icon: Zap },
  { id: 'participate', title: 'Participate', icon: Users },
  { id: 'actionboard', title: 'Use Action Board', icon: LightbulbIcon },
]

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState('wallet')
  const [isActionBoardActive, setIsActionBoardActive] = useState(false)

  const updateProgress = (tabValue: string) => {
    setActiveTab(tabValue)
    if (tabValue === 'actionboard') {
      setIsActionBoardActive(true)
    }
  }

  const progress = (steps.findIndex(step => step.id === activeTab) + 1) * 20

  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get Started with BARK
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Your journey to decentralized finance begins here</p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Complete these steps to get started with BARK Protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Step {steps.findIndex(step => step.id === activeTab) + 1} of {steps.length}</p>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={updateProgress}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex items-center justify-center">
                  <step.icon className="w-5 h-5 mr-2 text-primary" />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              {steps.map((step) => (
                <TabsContent key={step.id} value={step.id}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription>{getStepDescription(step.id)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {renderStepContent(step.id, isActionBoardActive)}
                      </CardContent>
                      <CardFooter>
                        {renderStepFooter(step.id)}
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>

          <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Continue your journey with BARK Protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/pages/learn-more">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    Learn More About BARK
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/pages/about">
                    <AlertCircle className="w-4 h-4 mr-2 text-primary" />
                    Frequently Asked Questions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Ready to Launch?</h2>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/dashboard">
                <Rocket className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function getStepDescription(stepId: string) {
  switch (stepId) {
    case 'wallet':
      return 'Choose and set up a compatible wallet for BARK Protocol'
    case 'acquire':
      return 'Learn how to get BARK tokens to participate in the protocol'
    case 'stake':
      return 'Learn about staking and how to earn rewards'
    case 'participate':
      return 'Discover ways to engage with the BARK Protocol community'
    case 'actionboard':
      return 'Start using the Action Board feature to manage your BARK activities'
    default:
      return ''
  }
}

function renderStepContent(stepId: string, isActionBoardActive: boolean) {
  switch (stepId) {
    case 'wallet':
      return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="phantom">
            <AccordionTrigger className="text-sm">
              <Image src={PHANTOM_LOGO_URL} alt="Phantom" width={24} height={24} className="mr-2" />
              Phantom Wallet
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <ol className="list-decimal list-inside space-y-2">
                <li>Visit the Phantom wallet website</li>
                <li>Download and install the browser extension</li>
                <li>Create a new wallet or import an existing one</li>
                <li>Secure your wallet with a strong password and backup your seed phrase</li>
              </ol>
              <Button className="mt-4" asChild>
                <Link href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
                  <Wallet className="w-4 h-4 mr-2 text-primary-foreground" />
                  Get Phantom Wallet
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="solflare">
            <AccordionTrigger className="text-sm">
              <Image src={SOLFLARE_LOGO_URL} alt="Solflare" width={24} height={24} className="mr-2" />
              Solflare Wallet
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the Solflare wallet website</li>
                <li>Choose between web, mobile, or browser extension version</li>
                <li>Follow the setup instructions to create or import a wallet</li>
                <li>Ensure you safely store your recovery phrase</li>
              </ol>
              <Button className="mt-4" asChild>
                <Link href="https://solflare.com/" target="_blank" rel="noopener noreferrer">
                  <Wallet className="w-4 h-4 mr-2 text-primary-foreground" />
                  Get Solflare Wallet
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    case 'acquire':
      return (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Option 1: Purchase BARK</h3>
            <p className="mb-4">You can buy BARK tokens directly from our platform or supported exchanges.</p>
            <Button asChild>
              <Link href="/buy">
                <Image src={BARK_LOGO_URL} alt="BARK" width={16} height={16} className="mr-2 inline" />
                Buy BARK
              </Link>
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Option 2: Swap for BARK</h3>
            <p className="mb-4">Use our swap app to exchange other cryptocurrencies for BARK tokens.</p>
            <Button variant="outline" asChild>
              <Link href="/swap">
                <Repeat className="w-4 h-4 mr-2 text-primary" />
                Swap for BARK
              </Link>
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Option 3: Earn BARK</h3>
            <p className="mb-4">Participate in community activities, contribute to the protocol, or complete tasks to earn BARK tokens.</p>
            <Button variant="outline" asChild>
              <Link href="/earn">
                <Coins className="w-4 h-4 mr-2 text-primary" />
                Explore Earning Opportunities
              </Link>
            </Button>
          </div>
        </div>
      )
    case 'stake':
      return (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Benefits of Staking</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Earn passive rewards</li>
              <li>Participate in governance decisions</li>
              <li>Contribute to the security and decentralization of the network</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How to Stake</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ensure you have BARK tokens in your wallet</li>
              <li>Visit the staking page on our platform</li>
              <li>Choose the amount of BARK you want to stake</li>
              <li>Confirm the transaction in your wallet</li>
              <li>Start earning rewards!</li>
            </ol>
          </div>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/stake">
              <Zap className="w-4 h-4 mr-2 text-primary-foreground" />
              Go to Staking Page
            </Link>
          </Button>
        </div>
      )
    case 'participate':
      return (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Governance</h3>
            <p className="mb-4">Use your BARK tokens to vote on important protocol decisions and shape the future of BARK.</p>
            <Button variant="outline" asChild>
              <Link href="/pages/governance">
                <FileText className="w-4 h-4 mr-2 text-primary" />
                Explore Governance
              </Link>
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="mb-4">Join our vibrant community, participate in discussions, and contribute to the ecosystem.</p>
            <Button variant="outline" asChild>
              <Link href="/pages/community">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Join Community
              </Link>
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Development</h3>
            <p className="mb-4">Contribute to the BARK Protocol codebase or build applications on top of it.</p>
            <Button variant="outline" asChild>
              <Link href="/developers">
                <Zap className="w-4 h-4 mr-2 text-primary" />
                Developer Resources
              </Link>
            </Button>
          </div>
        </div>
      )
    case 'actionboard':
      return (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Action Board Features</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Dashboard overview of your BARK holdings and activities</li>
              <li>Quick access to staking, swapping, and governance functions</li>
              <li>Real-time updates on your rewards and community contributions</li>
              <li>Personalized recommendations for ecosystem participation</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Getting Started with Action Board</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Connect your wallet to the Action Board</li>
              <li>Explore the various widgets and features</li>
              <li>Customize your dashboard layout</li>
              <li>Start managing your BARK activities efficiently</li>
            </ol>
          </div>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/actionboard">
              <LightbulbIcon className="w-4 h-4 mr-2 text-primary-foreground" />
              Launch Action Board
            </Link>
          </Button>
        </div>
      )
    default:
      return null
  }
}

function renderStepFooter(stepId: string) {
  switch (stepId) {
    case 'wallet':
      return (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4 text-brown-[#D0BFB4]" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Never share your wallet's private key or seed phrase with anyone. Keep it safe and secure.
          </AlertDescription>
        </Alert>
      )
    case 'acquire':
      return (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4 text-brown-[#D0BFB4]" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Always verify the contract address when acquiring BARK tokens to ensure you're getting genuine tokens. When using the swap app, make sure you're connected to the correct network.
          </AlertDescription>
        </Alert>
      )
    case 'stake':
      return (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4 text-brown-[#D0BFB4]" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Staked tokens are locked for a certain period. Make sure you understand the terms before staking.
          </AlertDescription>
        </Alert>
      )
    case 'participate':
      return (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Great Progress!</AlertTitle>
          <AlertDescription>
            You're well on your way to becoming an active participant in the BARK Protocol ecosystem. Keep going!
          </AlertDescription>
        </Alert>
      )
    case 'actionboard':
      return (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Congratulations!</AlertTitle>
          <AlertDescription>
            You've completed the getting started guide. You're now ready to fully participate in the BARK Protocol ecosystem! Start using the Action Board to manage your activities efficiently.
          </AlertDescription>
        </Alert>
      )
    default:
      return null
  }
}