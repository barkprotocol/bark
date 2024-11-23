import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const gangMembers = [
  { 
    name: 'BARK', 
    role: 'The Alpha', 
    description: 'The embodiment of resilience and leadership, BARK inspires the Peaky Barkers to push boundaries and drive positive change.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
  { 
    name: 'Sparky', 
    role: 'The Kingpin', 
    description: 'Charismatic and cunning, Sparky leads the Peaky Barkers with a mix of charm and strategy.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
  { 
    name: 'Trixie', 
    role: 'The Mastermind', 
    description: 'Sharp-witted and resourceful, Trixie devises the crews most ingenious schemes.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
  { 
    name: 'Bruno', 
    role: 'The Enforcer', 
    description: 'Loyal and intimidating, Bruno ensures the Peaky Barkers plans go off without a hitch.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
  { 
    name: 'Dash', 
    role: 'The Scout', 
    description: 'Quick-footed and observant, Dash gathers intel and runs crucial errands for the gang.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
  { 
    name: 'Bella', 
    role: 'The Negotiator', 
    description: 'Charming and persuasive, Bella smooths over conflicts and brokers deals for the Peaky Barkers.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Max', 
    role: 'The Fixer', 
    description: 'Tech-savvy and innovative, Max provides the crew with cutting-edge tools and solutions.',
    imageUrl: 'https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png'
  },
  { 
    name: 'Maggie', 
    role: 'The Wildcard', 
    description: 'Unpredictable and daring, Maggie brings an element of surprise to every Peaky Barkers operation.',
    imageUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp'
  },
]

export default function PeakyBarkersClub() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 font-serif">The Peaky Barkers Gang</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the roughest, toughest, and most meme-loving gang of canines this side of the internet. 
            These top dogs are here to take a bite out of crime and serve up some pawsome content!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {gangMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader className="relative pb-0">
                  <div className="w-48 h-48 mx-auto mb-4 relative">
                    <Image
                      src={member.imageUrl}
                      alt={`Portrait of ${member.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 rounded-full"></div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-2xl font-semibold mb-2 font-serif">{member.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                    <p className="text-gray-300">{member.description}</p>
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