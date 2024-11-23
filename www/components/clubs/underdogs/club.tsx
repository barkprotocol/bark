import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const members = [
  { 
    name: 'Road King', 
    role: 'President', 
    description: 'Fearless leader with decades of road experience, guiding the Underdogs with wisdom and grit.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Throttle', 
    role: 'Vice President', 
    description: 'Speed demon and strategic planner, always pushing the club to new heights.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Wrench', 
    role: 'Sergeant at Arms', 
    description: 'Keeps the peace and the bikes running smooth. The go-to guy for any mechanical issues.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Nomad', 
    role: 'Road Captain', 
    description: 'Plans the best routes for unforgettable rides. Has a sixth sense for finding hidden gems on the road.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Patches', 
    role: 'Secretary', 
    description: 'Keeps the club organized and handles communications. The glue that holds the Underdogs together.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Piggy', 
    role: 'Treasurer', 
    description: 'Manages the clubs finances with an iron fist. Ensures the Underdogs always have fuel in their tanks.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
]

export default function UnderdogsClub() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meet the Underdogs</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're more than just a motorcycle club. We're a family of riders, united by our love for the open road and the spirit of freedom.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white dark:bg-gray-800 h-full">
                <CardHeader className="relative pb-0">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src={member.imageUrl}
                      alt={`Portrait of ${member.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                    <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
