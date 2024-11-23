'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, Download, ExternalLink, Zap, Repeat, CreditCard, AlertTriangle, FileText, Users, Coins, BarChart, Shield, Globe, LightbulbIcon, Rocket } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"

const sections = [
  { id: 'introduction', title: 'Introduction', icon: LightbulbIcon },
  { id: 'problem', title: 'Problem Statement', icon: AlertTriangle },
  { id: 'solution', title: 'Solution', icon: Zap },
  { id: 'technology', title: 'Technology Stack', icon: BarChart },
  { id: 'architecture', title: 'Architecture & Services', icon: Globe },
  { id: 'tokenomics', title: 'Tokenomics', icon: Coins },
  { id: 'staking', title: 'Staking', icon: Shield },
  { id: 'swap', title: 'Swap', icon: Repeat },
  { id: 'payments', title: 'Payments', icon: CreditCard },
  { id: 'roadmap', title: 'Roadmap', icon: Rocket },
  { id: 'governance', title: 'Governance', icon: Users },
  { id: 'conclusion', title: 'Conclusion', icon: LightbulbIcon },
  { id: 'disclaimer', title: 'Disclaimer', icon: AlertTriangle },
  { id: 'references', title: 'References', icon: FileText },
]

export default function WhitepaperPage() {
  const [activeTab, setActiveTab] = useState('introduction')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/whitepaper/last-updated')
      .then(response => response.json())
      .then(data => setLastUpdated(data.lastUpdated))
      .catch(error => console.error('Error fetching last updated date:', error))
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    setShowScrollToTop(scrollTop > 200)
  }

  const scrollToTop = () => {
    document.getElementById('whitepaper-top')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/whitepaper/download')
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'BARK_Protocol_Whitepaper.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast({
        title: "Download Started",
        description: "Your whitepaper PDF is being downloaded.",
      })
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the whitepaper. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle id="whitepaper-top" className="text-4xl font-bold text-center">Whitepaper</CardTitle>
          <p className="text-center text-muted-foreground mt-2 font-semibold">Version 1.0 - Last Updated: {lastUpdated}</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" />
              Download PDF
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/storm-protocol/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" />
                View on GitHub
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <nav className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link 
                      href={`#${section.id}`}
                      className={`text-sm hover:underline flex items-center ${activeTab === section.id ? 'font-bold' : ''}`}
                      onClick={() => setActiveTab(section.id)}
                    >
                      <section.icon className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" />
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <ScrollArea className="h-[600px] md:col-span-3 pr-4" onScrollCapture={handleScroll}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="introduction">
                      <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                      <p className="mb-4">
                        BARK Protocol is a revolutionary blockchain-based platform designed to bridge the gap between decentralized finance (DeFi) and real-world applications. By leveraging the power of Solana's high-performance blockchain, BARK Protocol aims to create a seamless ecosystem for developers, businesses, and users to interact with blockchain technology in meaningful and practical ways.
                      </p>
                      <p>
                        This whitepaper outlines the core concepts, technology, and vision behind BARK Protocol, detailing how it addresses current market challenges and paves the way for widespread blockchain adoption.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="problem">
                      <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
                      <p className="mb-4">
                        Despite the rapid growth of blockchain technology and DeFi, several key challenges persist:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Limited scalability and high transaction costs on many blockchain networks</li>
                        <li>Lack of interoperability between different blockchain ecosystems</li>
                        <li>Complexity in developing and deploying blockchain applications</li>
                        <li>Difficulty in integrating blockchain solutions with existing business processes</li>
                        <li>Inadequate tools for managing and analyzing on-chain data</li>
                      </ul>
                      <p>
                        These challenges have hindered the widespread adoption of blockchain technology, particularly in enterprise and real-world applications.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="solution">
                      <h2 className="text-2xl font-bold mb-4">BARK Protocol Solution</h2>
                      <p className="mb-4">
                        BARK Protocol addresses these challenges through a comprehensive suite of tools and services:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>High-performance blockchain infrastructure built on Solana</li>
                        <li>Cross-chain interoperability solutions</li>
                        <li>Developer-friendly SDK and API for rapid application development</li>
                        <li>Enterprise integration tools for seamless blockchain adoption</li>
                        <li>Advanced data analytics and visualization platform</li>
                      </ul>
                      <p>
                        By providing these solutions, BARK Protocol aims to accelerate blockchain adoption across various industries and use cases.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="technology">
                      <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
                      <p className="mb-4">
                        BARK Protocol's technology stack is built on cutting-edge blockchain and web technologies:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Solana blockchain for high-throughput and low-latency transactions</li>
                        <li>WebAssembly (WASM) for efficient smart contract execution</li>
                        <li>Rust programming language for secure and performant code</li>
                        <li>GraphQL for flexible and efficient data querying</li>
                        <li>React and Next.js for building responsive and dynamic user interfaces</li>
                      </ul>
                      <Image 
                        src="/placeholder.svg?height=300&width=500" 
                        alt="Technology Stack" 
                        width={500} 
                        height={300} 
                        className="mx-auto my-4"
                      />
                    </TabsContent>

                    <TabsContent value="architecture">
                      <h2 className="text-2xl font-bold mb-4">Architecture & Services</h2>
                      <p className="mb-4">
                        BARK Protocol's architecture is designed to be modular, scalable, and interoperable. Our core services and products include:
                      </p>
                      <ul className="list-disc pl-6 space-y-4 mb-4">
                        <li>
                          <strong>StormCore:</strong> The foundational layer of our protocol, providing high-performance consensus mechanisms and smart contract execution.
                        </li>
                        <li>
                          <strong>StormBridge:</strong> A cross-chain interoperability solution enabling seamless asset and data transfer between different blockchain networks.
                        </li>
                        <li>
                          <strong>StormSDK:</strong> A comprehensive development kit for building decentralized applications (dApps) on the BARK Protocol.
                        </li>
                        <li>
                          <strong>StormAnalytics:</strong> Advanced data analytics and visualization tools for on-chain data analysis and business intelligence.
                        </li>
                        <li>
                          <strong>StormPay:</strong> A decentralized payment solution leveraging the BARK Protocol for fast, secure, and low-cost transactions.
                        </li>
                      </ul>
                      <Image 
                        src="/placeholder.svg?height=400&width=600" 
                        alt="Architecture" 
                        width={600} 
                        height={400} 
                        className="mx-auto my-4"
                      />
                    </TabsContent>
                    
                    <TabsContent value="tokenomics">
                      <h2 className="text-2xl font-bold mb-4">Tokenomics</h2>
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-inner mb-6">
                        <h3 className="text-xl font-semibold mb-4">BARK Token Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Token Name:</p>
                            <p className="text-lg">BARK</p>
                          </div>
                          <div>
                            <p className="font-medium">Total Supply:</p>
                            <p className="text-lg">18,271,889,396.27 BARK</p>
                            <p className="text-lg">1,000,000,000 BARK</p>
                          </div>
                          <div>
                            <p className="font-medium">Token Standard:</p>
                            <p className="text-lg">SPL & Token-2022 (Solana Program Library)</p>
                          </div>
                          <div>
                            <p className="font-medium">Blockchain:</p>
                            <p className="text-lg">Solana</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Distribution</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center">
                            <span>Community and Ecosystem Development</span>
                            <span className="font-semibold">40%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Team and Advisors (vested over 2 years)</span>
                            <span className="font-semibold">15%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Liquidity</span>
                            <span className="font-semibold">15%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Reserve Fund</span>
                            <span className="font-semibold">5%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Initial Token Sale</span>
                            <span className="font-semibold">10%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Marketing and Rewards</span>
                            <span className="font-semibold">5%</span>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="staking">
                      <h2 className="text-2xl font-bold mb-4">Staking</h2>
                      <p className="mb-4">
                        Staking is a crucial component of the BARK Protocol ecosystem, allowing token holders to participate in network security and earn rewards.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Key Features of BARK Staking:</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Flexible staking periods: Choose from various lock-up durations</li>
                        <li>Competitive APY: Earn attractive annual percentage yields</li>
                        <li>Automatic compounding: Rewards are automatically reinvested</li>
                        <li>Governance rights: Staked tokens grant voting power</li>
                        <li>Liquid staking options: Receive stBARK tokens</li>
                      </ul>
                      <h3 className="text-xl font-semibold mb-2">Staking Tiers:</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center">
                            <span>Bronze (1,000 - 10,000 BARK)</span>
                            <span className="font-semibold">Base APY</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Silver (10,001 - 100,000 BARK)</span>
                            <span className="font-semibold">Base APY + 0.5%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Gold (100,001 - 1,000,000 BARK)</span>
                            <span className="font-semibold">Base APY + 1%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Platinum (1,000,001+ BARK)</span>
                            <span className="font-semibold">Base APY + 1.5%</span>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="swap">
                      <h2 className="text-2xl font-bold mb-4">Swap</h2>
                      <p className="mb-4">
                        The BARK Protocol Swap feature provides a seamless and efficient way for users to exchange various cryptocurrencies within the ecosystem. Built on Solana's high-performance blockchain, Storm Swap offers lightning-fast transactions with minimal fees.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Key Features of Swap:</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Multi-chain support: Swap tokens across different blockchain networks</li>
                        <li>Automated Market Maker (AMM) model: Ensures liquidity and efficient price discovery</li>
                        <li>Low slippage: Advanced routing algorithms to find the best trading paths</li>
                        <li>Yield farming opportunities: Liquidity providers can earn additional rewards</li>
                        <li>User-friendly interface: Intuitive design for both beginners and experienced traders</li>
                      </ul>
                      <Image 
                        src="/placeholder.svg?height=300&width=500" 
                        alt="Swap Interface" 
                        width={500} 
                        height={300} 
                        className="mx-auto my-4 rounded-lg shadow-md"
                      />
                    </TabsContent>

                    <TabsContent value="payments">
                      <h2 className="text-2xl font-bold mb-4">Payments</h2>
                      <p className="mb-4">
                        BARK Protocol's payment solutions, leverages blockchain technology to offer fast, secure, and cost-effective transactions for both individuals and businesses.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Instant settlements using BARK tokens and other supported cryptocurrencies</li>
                        <li>Integration with traditional payment systems for seamless fiat on/off ramps</li>
                        <li>Support for recurring payments and subscriptions</li>
                        <li>Built-in fraud protection and dispute resolution mechanisms</li>
                        <li>Cross-border payments with minimal fees</li>
                      </ul>
                      <Image 
                        src="/placeholder.svg?height=300&width=500" 
                        alt="User Dashboard" 
                        width={500} 
                        height={300} 
                        className="mx-auto my-4 rounded-lg shadow-md"
                      />
                    </TabsContent>
                    
                    <TabsContent value="roadmap">
                      <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">Q2 2024</h3>
                          <ul className="list-disc pl-6">
                            <li>Launch of BARK Protocol</li>
                            <li>Release of whitepaper, developer documentation and SDK (MVP)</li>
                            <li>Community building and partnerships</li>
                            <li>BARK token generation event</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Q1 2025</h3>
                          <ul className="list-disc pl-6">
                            <li>Launch of BARK Pump.fun</li>
                            <li>Deployment of initial dApps on BARK Protocol</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Q2 2025</h3>
                          <ul className="list-disc pl-6">
                            <li>Launch of cross-chain interoperability features</li>
                            <li>Integration with major DeFi protocols</li>
                            <li>Release of advanced analytics tools</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Q3 2025 and beyond</h3>
                          <ul className="list-disc pl-6">
                            <li>Expansion of enterprise solutions</li>
                            <li>Launch of BARK Protocol Grants Program</li>
                            <li>Continuous improvement and scaling of the ecosystem</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="governance">
                      <h2 className="text-2xl font-bold mb-4">Governance</h2>
                      <p className="mb-4">
                        BARK Protocol is committed to decentralized governance, empowering the community to shape the future of the protocol. Our governance model includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Token-based voting: BARK token holders can vote on protocol upgrades and parameter changes</li>
                        <li>Proposal system: Community members can submit improvement proposals for consideration</li>
                        <li>Delegation: Token holders can delegate their voting power to trusted representatives</li>
                        <li>Transparent decision-making: All governance activities are recorded on-chain for full transparency</li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="conclusion">
                      <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                      <p className="mb-4">
                        BARK Protocol represents a significant leap forward in blockchain technology, offering a comprehensive solution to the challenges facing widespread adoption. By combining high-performance infrastructure, developer-friendly tools, and enterprise-grade solutions, BARK Protocol is poised to drive the next wave of blockchain innovation.
                      </p>
                      <p className="mb-4">
                        As we move forward with our roadmap, we invite developers, businesses, and blockchain enthusiasts to join us in building a more decentralized and efficient future. Together, we can unlock the full potential of blockchain technology and create real-world impact across industries.
                      </p>
                    </TabsContent>

                    <TabsContent value="disclaimer">
                      <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
                      <p className="mb-4">
                        This whitepaper is for informational purposes only and does not constitute financial advice, investment recommendations, or an offer to sell or a solicitation of an offer to buy any securities, tokens, or other financial instruments. The BARK token, as described in this document, is not intended to constitute a security in any jurisdiction.
                      </p>
                      <p className="mb-4">
                        The information contained in this whitepaper is subject to change and may be updated without notice. BARK Protocol does not guarantee the accuracy of the conclusions reached in this whitepaper, and this whitepaper is provided "as is" with no representations and warranties, express or implied, whatsoever.
                      </p>
                    </TabsContent>

                    <TabsContent value="references">
                      <h2 className="text-2xl font-bold mb-4">References</h2>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System.
                          <Link href="https://bitcoin.org/bitcoin.pdf" className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            https://bitcoin.org/bitcoin.pdf
                          </Link>
                        </li>
                        <li>
                          Buterin, V. (2013). Ethereum Whitepaper.
                          <Link href="https://ethereum.org/en/whitepaper/" className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            https://ethereum.org/en/whitepaper/
                          </Link>
                        </li>
                        <li>
                          Yakovenko, A. (2017). Solana: A new architecture for a high performance blockchain.
                          <Link href="https://solana.com/solana-whitepaper.pdf" className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            https://solana.com/solana-whitepaper.pdf
                          </Link>
                        </li>
                      </ol>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="fixed bottom-4 right-4 rounded-full p-2 bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4]"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}