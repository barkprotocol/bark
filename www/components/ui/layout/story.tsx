"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const milestones = [
  {
    year: "2023",
    title: "The Idea",
    description: "BARK Protocol was conceived as a solution to bring transparency and efficiency to charitable giving."
  },
  {
    year: "2024",
    title: "Development Begins",
    description: "Our team of blockchain experts and social impact enthusiasts started building the BARK Protocol."
  },
  {
    year: "2025",
    title: "Beta Launch",
    description: "BARK Protocol beta was released, allowing early adopters to test and provide feedback on the platform."
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "BARK Protocol goes global, connecting donors and causes across the world."
  }
]

export default function Story() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The journey of BARK Protocol from an idea to a global platform for social impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white dark:bg-gray-900 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="outline" className="self-start mb-2">{milestone.year}</Badge>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">{milestone.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Our journey continues as we work towards our vision of a more transparent and impactful charitable giving ecosystem.
          </p>
          <Badge variant="outline" className="text-lg font-semibold px-4 py-2">
            Be part of our story
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}