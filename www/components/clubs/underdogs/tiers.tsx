'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Tier {
  level: number
  name: string
  description: string
  requirements: string[]
}

const clubImageUrl = "https://example.com/underdogs-logo.png" // Replace with actual logo URL

const tiers: Tier[] = [
  {
    level: 1,
    name: "Prospect NFT",
    description: "The starting point for all Underdogs MC NFT holders.",
    requirements: [
      "Mint a Prospect NFT",
      "Participate in community Discord events",
      "Complete digital tasks and quests",
      "Learn club history and smart contract rules"
    ]
  },
  {
    level: 2,
    name: "Pup CNFT",
    description: "Newly patched compressed NFT members of the Underdogs MC.",
    requirements: [
      "Hold Prospect NFT for minimum 6 months",
      "Receive votes from Full Dog NFT holders",
      "Demonstrate commitment to the digital club",
      "Complete club's crypto safety course"
    ]
  },
  {
    level: 3,
    name: "Full Dog NFT",
    description: "Established NFT members with full voting rights.",
    requirements: [
      "Upgrade Pup CNFT to Full Dog NFT",
      "Participate in virtual club rides and events",
      "Contribute to club's charitable NFT activities",
      "Maintain good standing in the NFT community"
    ]
  },
  {
    level: 4,
    name: "Old Dog CNFT",
    description: "Seasoned compressed NFT members with years of dedication.",
    requirements: [
      "Hold Full Dog NFT for minimum 5 years",
      "Significant contributions to the NFT club",
      "Mentor newer NFT members",
      "Exemplify the club's values in the crypto space"
    ]
  },
  {
    level: 5,
    name: "Top Dog NFT",
    description: "Leadership positions within the Underdogs MC NFT collection.",
    requirements: [
      "Elected by NFT club members via DAO",
      "Exceptional blockchain leadership skills",
      "Deep understanding of NFT operations",
      "Represent the club in external crypto affairs"
    ]
  }
]

const TierBadge: React.FC<{ level: number }> = ({ level }) => {
  return (
    <Badge variant="secondary" className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {level}
    </Badge>
  )
}

export default function UnderdogsTiers() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mb-8">
            <Image
              src={clubImageUrl}
              alt="Underdogs MC NFT Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Underdogs MC NFT Tiers</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the path to becoming a full-fledged NFT member of the Underdogs Motorcycle Club!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative aspect-video bg-gray-800 dark:bg-gray-700">
                    <Image
                      src={clubImageUrl}
                      alt={`${tier.name} Tier Icon`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 opacity-50"
                    />
                    <TierBadge level={tier.level} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-white">{tier.name}</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tier.description}</p>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {tier.requirements.map((requirement, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{requirement}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600">
                    Mint NFT
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

