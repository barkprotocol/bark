'use client'

import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CTAProps {
  onLaunchApp: () => void;
}

export function CTA({ onLaunchApp }: CTAProps) {
  return (
    <section id="cta" className="container mx-auto px-4 py-16 sm:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          <Image
            src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <h2 className="font-inter text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Ready to Start Creating Blinks?
        </h2>
        <p className="font-light text-lg sm:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Join the BARK community and start creating your Blinks today! Experience the future of digital interactions on Solana.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-base px-6 py-3 rounded-md shadow-md hover:shadow-lg"
            onClick={onLaunchApp}
          >
            Create Now
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
        <p className="mt-6 text-sm text-muted-foreground">
          Start for free and upgrade anytime.
        </p>
      </motion.div>
    </section>
  )
}

