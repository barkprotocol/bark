'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Globe, Shield, Users, ArrowRight, Download, ExternalLink, Mail, CreditCard, Clipboard, Network, Gem, Layers } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    icon: Zap,
    title: 'Efficient Transactions',
    description: 'Leveraging Solana for high-speed, low-cost transactions in disaster relief and charitable giving.',
  },
  {
    icon: CreditCard,
    title: 'Frictionless Payments',
    description: 'Seamless Solana blockchain-based payment solution for quick and transparent payments and donations.',
  },
  {
    icon: Clipboard,
    title: 'Action Board',
    description: 'Real-time dashboard for coordinating relief efforts and tracking impact.',
  },
  {
    icon: Network,
    title: 'Unique Ecosystem',
    description: 'Integrated platform connecting donors, charities, and beneficiaries in a decentralized network.',
  },
  {
    icon: Gem,
    title: 'Real-World Assets (RWA)',
    description: 'Tokenization of physical assets for more efficient aid distribution and tracking.',
  },
  {
    icon: Layers,
    title: 'Applications',
    description: 'Suite of dApps designed for various aspects of charitable giving and disaster relief.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting donors and recipients worldwide without borders.',
  },
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Immutable blockchain records ensure full transparency and security.',
  },
]

export default function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          BARK Protocol is revolutionizing charitable giving and disaster relief through the power of Solana blockchain technology. We're on a mission to create a more efficient, transparent, and impactful way to help those in need.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <Image
            src="/images/storm-icon-card.png"
            alt="BARK Protocol icon card showcasing the platform's features"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            We envision a world where technology bridges the gap between those who want to help and those in need. By leveraging Solana blockchain, we're creating a future where aid is delivered swiftly, securely, and with complete transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/whitepaper">
                Read Our Whitepaper <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Learn more about BARK Protocol in our whitepaper</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/assets/storm-protocol-presentation.pdf" download>
                Download Presentation <Download className="ml-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Download BARK Protocol presentation</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BARK Protocol</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Join Us in Making a Difference</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Whether you're a donor, a charitable organization, or someone passionate about leveraging technology for good, there's a place for you in the BARK Protocol ecosystem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/get-started">
              Get Started with BARK Protocol <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Begin your journey with BARK Protocol</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="https://github.com/storm-protocol" target="_blank" rel="noopener noreferrer">
              View on GitHub <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Visit BARK Protocol GitHub repository</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Have questions or want to get involved? We'd love to hear from you!
        </p>
        <div className="inline-flex items-center justify-center">
          <Mail className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />
          <a href="mailto:contact@stormprotocol.co" className="text-gray-800 dark:text-gray-200 hover:underline">
            contact@stormprotocol.co
          </a>
        </div>
      </motion.div>
    </div>
  )
}