"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bike, Users, Globe, Zap, Trophy, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Bike,
    title: "Epic Rides",
    description: "Join thrilling group rides across scenic routes, from coastal highways to mountain passes.",
    badge: "Adventure"
  },
  {
    icon: Users,
    title: "Tight-Knit Community",
    description: "Connect with fellow riders who share your passion for the open road and camaraderie.",
    badge: "Brotherhood"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access our worldwide network of riders and exclusive club houses in major cities.",
    badge: "Worldwide"
  },
  {
    icon: Zap,
    title: "Skill Development",
    description: "Enhance your riding skills with expert-led workshops and advanced training sessions.",
    badge: "Growth"
  },
  {
    icon: Trophy,
    title: "Exclusive Events",
    description: "Participate in members-only rallies, competitions, and social gatherings.",
    badge: "Exclusive"
  },
  {
    icon: HeartHandshake,
    title: "Charity Rides",
    description: "Make a difference by joining our regular charity rides and community outreach programs.",
    badge: "Give Back"
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Unleash the Underdogs Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the unique benefits that make the Underdogs Motorcycle Club an unparalleled riding experience.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {feature.description}
                  </p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {feature.badge}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
