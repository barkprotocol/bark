'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const clubs = [
  {
    name: "Peaky Barkers",
    description: "A tough and meme-worthy canine NFT collection inspired by the iconic Peaky Blinders.",
    imageUrl: "https://ucarecdn.com/a7a65986-52ba-48cc-975e-68b223685749/beakybarker.png",
    link: "/clubs/peaky-barkers"
  },
  {
    name: "Underdogs MC",
    description: "A digital motorcycle club NFT and CNFT collection for the toughest dogs on the blockchain.",
    imageUrl: "https://ucarecdn.com/8d0cc096-a714-405a-a0c2-ac26bd25c822/barkersclub.png",
    link: "/clubs/underdogs"
  }
]

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our NFT Clubs</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our exclusive digital collectible communities. Each club offers unique NFTs, special perks, and a vibrant community of enthusiasts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {clubs.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={club.imageUrl}
                      alt={`${club.name} logo`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">{club.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {club.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link href={club.link} passHref>
                    <Button className="w-full">Explore {club.name}</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )

