'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, PawPrint, Bike } from 'lucide-react'

const achievements = [
  {
    title: "NFT Rescue Ride",
    description: "Annual digital ride raising crypto funds for animal shelters.",
    impact: "Raised 50 ETH for shelters"
  },
  {
    title: "Digital Paw Patrol",
    description: "Weekly blockchain patrols to rescue abandoned NFT animals.",
    impact: "100+ NFT animals rescued"
  },
  {
    title: "Crypto Biker's Best Friend",
    description: "Matching veterans with AI-powered digital service dog NFTs.",
    impact: "50 veterans paired with NFT service dogs"
  }
]

const CharityMascot: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Meet Rivet</CardTitle>
            <CardDescription className="dark:text-gray-300">The Underdogs MC's Charity NFT Mascot</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://example.com/rivet-mascot.png" // Replace with actual mascot image
                  alt="Rivet the Charity NFT Mascot"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Rivet's Digital Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rivet, our tough but loving Pit Bull NFT mascot, embodies the Underdogs MC's commitment to giving back in the digital realm. 
                With a heart as big as his bark, Rivet leads our charity efforts to help animals and veterans in need through blockchain technology.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Heart size={16} /> Crypto Compassion
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <PawPrint size={16} /> NFT Animal Welfare
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Bike size={16} /> Digital Biker Spirit
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg dark:text-white">Join Rivet's Crypto Cause</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Help us make a difference in our digital community</p>
            </div>
            <Button className="w-full sm:w-auto">Donate Crypto Now</Button>
          </CardFooter>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-bold text-center mb-4 dark:text-white">Rivet's Recent Blockchain Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="w-full justify-center">
                    {achievement.impact}
                  </Badge>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default CharityMascot
