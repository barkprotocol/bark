'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UnderdogsMembership() {
  return (
    <section id="join-now" className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 font-serif">Join the Underdogs MC Club</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Ready to ride with the digital pack? Fill out the form below to start your journey with the Underdogs Motorcycle Club NFT collection!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center font-serif">NFT Minting Application</CardTitle>
              <CardDescription className="text-center text-gray-500 dark:text-gray-400">Join the ranks of the Underdogs MC NFT holders</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-white">Digital Road Name</Label>
                  <Input id="name" placeholder="Your NFT biker nickname" required className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallet" className="text-gray-700 dark:text-white">Wallet Address</Label>
                  <Input id="wallet" placeholder="Your blockchain wallet address" required className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nft-experience" className="text-gray-700 dark:text-white">NFT Experience</Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select your NFT expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novice">Novice (New to NFTs)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Own a few NFTs)</SelectItem>
                      <SelectItem value="experienced">Experienced (Active NFT trader)</SelectItem>
                      <SelectItem value="veteran">Veteran (NFT creator/developer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-chain" className="text-gray-700 dark:text-white">Preferred Blockchain</Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Choose your preferred blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="cardano">Cardano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="why-join" className="text-gray-700 dark:text-white">Why do you want to join Underdogs MC NFT?</Label>
                  <Textarea 
                    id="why-join" 
                    placeholder="Tell us why you want to be part of our digital pack" 
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    rows={4}
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  By submitting this application, you agree to pay a minting fee of 0.99% of the NFT's value if accepted.
                </div>
                <Button type="submit" className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 font-serif">
                  Submit Minting Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

