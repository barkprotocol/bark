'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const partners = [
  { name: 'Solana', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'Jupiter', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'UNICEF', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'Red Cross', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'World Food Programme', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'Charity:Water', logo: '/placeholder.svg?height=80&width=80' },
]

export function Partnership() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Pack of Partners</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Together with our esteemed partners, we&apos;re unleashing a new era of blockchain-powered philanthropy.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 border-[#D0BFB4] dark:border-[#E5D3C8]">
                <CardContent className="flex flex-col items-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={80}
                    height={80}
                    className="mb-4"
                  />
                  <p className="text-gray-900 dark:text-white font-semibold text-center">{partner.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto p-6 border-[#D0BFB4] dark:border-[#E5D3C8]">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Pack</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you ready to make a difference? Partner with BARK Protocol and help us reshape the landscape of charitable giving.
            </p>
            <Button 
              size="lg"
              className="bg-[#D0BFB4] text-gray-900 hover:bg-[#E5D3C8] dark:bg-[#E5D3C8] dark:text-gray-900 dark:hover:bg-[#D0BFB4]"
            >
              Become a Partner
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

