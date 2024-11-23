import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PeakyBarkersMembership() {
  return (
    <section id="join-now" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 font-serif">Join the Peaky Barkers</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Ready to unleash your inner meme lord and join the most pawsome gang on the internet? Fill out the form below and start your journey with the Peaky Barkers!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center font-serif">Membership Application</CardTitle>
              <CardDescription className="text-center text-gray-400">Join the ranks of the Peaky Barkers</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Barker Name</Label>
                  <Input id="name" placeholder="Your meme-tastic nickname" required className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input type="email" id="email" placeholder="your@email.com" required className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meme-skill" className="text-white">Meme Skill Level</Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select your meme prowess" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novice">Novice (Just discovered memes)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Can recognize most memes)</SelectItem>
                      <SelectItem value="advanced">Advanced (Creates original memes)</SelectItem>
                      <SelectItem value="expert">Expert (Lives and breathes memes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier" className="text-white">Membership Tier</Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Choose your bark level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pup-scout">Pup Scout</SelectItem>
                      <SelectItem value="bark-knight">Bark Knight</SelectItem>
                      <SelectItem value="alpha-dog">Alpha Dog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favorite-meme" className="text-white">Favorite Meme</Label>
                  <Textarea 
                    id="favorite-meme" 
                    placeholder="Describe your all-time favorite meme" 
                    className="bg-gray-700 text-white border-gray-600"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#D0BFB4] text-gray-900 hover:bg-[#C0AFA4] font-serif">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
