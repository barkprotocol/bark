'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

const partners = [
  { name: 'Solana', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'UNICEF', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'Red Cross', logo: '/placeholder.svg?height=80&width=80' },
  { name: 'World Food Programme', logo: '/placeholder.svg?height=80&width=80' },
]

export function Partnership() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Partners</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We collaborate with leading organizations to maximize our impact and reach.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={80}
                height={80}
                className="mb-4"
              />
              <p className="text-gray-900 dark:text-white font-semibold">{partner.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button size="lg">
            Become a Partner
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

