'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Zap, Paintbrush, Code, Building2 } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface HeroProps {
  onLaunchApp: () => void
}

export function Hero({ onLaunchApp }: HeroProps) {
  const { theme } = useTheme()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } }
  }

  return (
    <section className="relative text-center py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ucarecdn.com/750e9f1b-edfc-4ac8-a5b4-3286c7de98d6/barkmascottrasparentbg.png"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
          className="blur-sm opacity-5"
          priority
        />
      </div>
      <motion.div 
        {...fadeInUp}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <Badge className="inline-flex items-center mb-4 sm:mb-6 text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/50">
          <Zap className="w-4 h-4 mr-1.5" aria-hidden="true" />
          <span>Powering the Future of Digital Interactions</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 text-foreground leading-tight">
          Transform Your <span className="text-primary">Digital Experience</span> with BARK
        </h1>
        <p className="font-poppins text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 md:mb-10 text-foreground font-semibold max-w-4xl mx-auto">
          Unlock the full potential of the Solana blockchain and redefine how you create, share, and monetize digital content.
        </p>
        <p className="text-base sm:text-lg mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto transition-colors duration-300 ease-in-out text-muted-foreground">
          Step into the future of digital ownership, seamlessly integrating blockchain technology into your everyday life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16 md:mb-20">
          <Button 
            onClick={onLaunchApp}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Launch Application
            <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            asChild
          >
            <Link href="https://whitepaper.barkprotocol.com">
              Whitepaper
              <ExternalLink className="ml-2 h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left max-w-5xl mx-auto"
        >
          {[
            { icon: Paintbrush, title: "For Content Creators", description: "Mint unique digital assets, enhance your brand presence, and engage your audience in innovative ways." },
            { icon: Code, title: "For Developers", description: "Utilize our powerful API to build cutting-edge applications on the Solana blockchain." },
            { icon: Building2, title: "For Businesses", description: "Implement loyalty programs, issue digital certificates, and streamline operations through blockchain technology." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="bg-card text-card-foreground backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3" aria-hidden="true" />
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">{item.title}</h2>
              <p className="text-muted-foreground text-center text-sm sm:text-base">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

