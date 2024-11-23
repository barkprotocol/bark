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
  benefits: string[]
}

const clubImageUrl = "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"

const tiers: Tier[] = [
  {
    level: 1,
    name: "Puppy Pals",
    description: "Start your journey with the Peaky Barkers!",
    benefits: [
      "Access to basic community features",
      "Weekly newsletter subscription",
      "Participation in public events"
    ]
  },
  {
    level: 2,
    name: "Loyal Companions",
    description: "Show your dedication and unlock more perks!",
    benefits: [
      "All Puppy Pals benefits",
      "Exclusive merchandise discounts",
      "Monthly virtual meetups"
    ]
  },
  {
    level: 3,
    name: "Top Dogs",
    description: "Experience premium features and recognition!",
    benefits: [
      "All Loyal Companions benefits",
      "Priority access to new features",
      "Personalized birthday surprises"
    ]
  },
  {
    level: 4,
    name: "Alpha Pack",
    description: "Join the elite ranks of the Peaky Barkers!",
    benefits: [
      "All Top Dogs benefits",
      "VIP invitations to special events",
      "Exclusive Alpha Pack merchandise"
    ]
  },
  {
    level: 5,
    name: "Legendary Barkers",
    description: "Reach the pinnacle of the Peaky Barkers community!",
    benefits: [
      "All Alpha Pack benefits",
      "One-on-one mentoring sessions",
      "Featured spotlight in community showcase"
    ]
  }
]

const TierBadge: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="absolute top-2 left-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
      {level}
    </div>
  )
}

export default function PeakyBarkersTiers() {
  return (
    <section className="py-16 bg-gray-100">
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
              alt="BARK Club Icon"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Peaky Barkers Tiers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the exclusive benefits of each Peaky Barkers tier and elevate your experience!
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
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative aspect-video bg-gray-800">
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
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    Join {tier.name}
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
