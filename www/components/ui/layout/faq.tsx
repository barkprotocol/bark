'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from 'next-themes'

const faqItems = [
  {
    question: "What is BARK Protocol?",
    answer: "BARK Protocol is a Solana blockchain-based ecosystem designed for decentralized finance, empowering users with advanced financial tools on Solana. It brings together fast transactions, user-friendly features, and a secure environment for crypto enthusiasts and DeFi newcomers alike."
  },
  {
    question: "What are some practical use cases for BARK Protocol?",
    answer: `BARK Protocol offers a versatile suite of tools for real-world impact, financial accessibility, and community engagement. Here are some key use cases:
     - **BARK Token Utility**: The BARK token, anchored in real-world value, serves as a powerful tool for charity, disaster relief, community donations, Solana-based micro-applications ("Blinks"), alert systems, and decentralized infrastructure networks (DePIN).
      - **Fast & Affordable Payments**: Leverage Solana's high-speed network for quick, low-cost payments, making transactions efficient and accessible worldwide.
      - **Blinks for Quick Actions**: Use Solana's Blink technology to perform rapid on-chain actions, enabling seamless transaction signing, social finance activities, and real-time user interactions.
      - **Charity & Social Impact**: Support social causes effortlessly with built-in charity mechanisms that streamline donations, making it easy to contribute to impactful projects.
      - **Engagement Rewards**: Participate in unique rewards programs linked to events, contributions, and community activities, encouraging user engagement and support.
      - **Personalized Dashboard**: Monitor and manage your charitable donations, escrowed assets, real-world (RWA) assets, and investments through an intuitive, all-in-one dashboard.
      - **NFT & RWA Integration**: Create, trade, and manage NFTs and tokenized real-world assets on Solana, blending digital assets with tangible value for a new interactive experience.
      - **E-commerce on Solana**: Build decentralized commerce solutions with Storm's Blinks and Solana's secure infrastructure, enhancing both digital and physical sales channels.
      - **Decentralized Finance (DeFi)**: Access a range of DeFi solutions for lending, borrowing, and yield management, democratizing financial tools and fostering economic growth.
      - **Governance Participation**: Engage in the protocol's decentralized governance by voting on decisions that shape its future, giving users a real voice in protocol evolution.
      - **Developer Tools (API & SDK)**: A comprehensive SDK and API support seamless integration, making it easy for developers to build customized applications and expand the ecosystem.`
  },
  {
    question: "How does the Jupiter API-based swap feature work?",
    answer: "Through the Jupiter API integration, BARK Protocol allows users to perform token swaps at competitive rates. This means users can swap assets directly within the platform, accessing deep liquidity and optimized trading routes seamlessly."
  },
  {
    question: "How can I get started with BARK Protocol?",
    answer: "To get started, set up a compatible wallet (e.g., Phantom, Solflare or MetaMask). Then, acquire BARK tokens via supported exchanges or directly on the platform. For step-by-step help, check our 'Get Started' guide."
  },
  {
    question: "What makes BARK unique?",
    answer: "BARK is built on the high-performance Solana blockchain, designed to offer fast, secure, and scalable solutions for DeFi and beyond. Its advanced tokenomics and governance structure make it an ideal choice for decentralized applications."
  },
  {
    question: "What is Action Board?",
    answer: "Action Board is a set of Solana Blink-based mini applications, offering streamlined and secure functionalities for various on-chain actions."
  },
  {
    question: "How do I participate in BARK Protocol governance?",
    answer: "By holding BARK tokens, you can participate in the governance process. Access our governance platform to view and vote on proposals that shape the protocol's direction."
  }
]

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { theme } = useTheme()

  const toggleItem = (value: string) => {
    setExpandedItems(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-foreground mb-4">Frequently Asked Questions</h2>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Find answers to common questions about BARK Protocol, its features, and how to get started.
      </p>
      <Card className="w-full bg-white dark:bg-gray-950 shadow-lg">
        <CardContent className="p-6">
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="w-full space-y-6"
          >
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-lg bg-white dark:bg-gray-950 shadow-sm overflow-hidden"
              >
                <AccordionTrigger
                  onClick={() => toggleItem(`item-${index}`)}
                  className="text-left text-lg font-medium py-4 px-6 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition"
                >
                  <span className="font-semibold text-xl">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="mt-2 space-y-2">
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground dark:text-muted-foreground"
                      dangerouslySetInnerHTML={{ 
                        __html: item.answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#D0BFB4]">$1</strong>')
                                              .replace(/\n\s*-\s*/g, '<br>• ')
                      }} 
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}