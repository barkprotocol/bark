'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText, ChevronDown } from 'lucide-react'

export default function Hero() {
  const [showBackground, setShowBackground] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleScroll = useMemo(() => {
    return () => {
      setShowBackground(window.scrollY > 50)
    }
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [handleScroll])

  const scrollToContent = useCallback(() => {
    const contentElement = document.getElementById('content')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <Image
          src={"https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png"}
          alt="Barkersters, representing the power and innovation of BARK"
          fill
          quality={85}
          priority
          unoptimized
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 z-10" aria-hidden="true" />
      )}

      <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true" />
      
      <AnimatePresence>
        {showBackground && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black z-20"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-30 flex flex-col items-center gap-4 sm:gap-6 w-full px-4 sm:px-6 lg:px-8"
      >
        <Badge variant="secondary" className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-md xl:text-xl uppercase tracking-wider bg-gray-950/20 text-gray-200 font-medium rounded-full shadow-lg backdrop-blur-sm">
          Introducing BARK Protocol
        </Badge>
        
        <motion.h1 
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-tight tracking-tighter text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 215, 0, 0.3)'
          }}
        >
          The Storm of Solana
        </motion.h1>
        
        <motion.p 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-medium mt-2 mb-1 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
          }}
        >
          Governance-Powered Solutions for Social Good
        </motion.p>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          BARK Protocol integrates Solana blinks, governance with the Solana network to create a dynamic, community-powered ecosystem. By leveraging MemeFi and NFTs, we are reshaping the future of social finance, enabling disaster relief, and empowering donations through decentralized solutions.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-4 justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 text-base sm:text-lg font-medium group bg-gradient-to-r from-yellow-400 to-brown-[#D0BFB4] text-gray-900 hover:from-brown-[#D0BFB4] hover:to-brown-[#D2BFB4] transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(255,186,8,0.39)] hover:shadow-[0_6px_20px_rgba(255,186,8,0.23)] rounded-md"
          >
            <Link href="/pages/get-started" className="flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto px-8 sm:px-10 py-4 text-base sm:text-lg font-medium group bg-transparent border-2 border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] rounded-md"
          >
            <Link href="/pages/whitepaper" className="flex items-center justify-center">
              Whitepaper
              <FileText className="ml-2 h-4 w-4 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <button 
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-30 text-yellow-400 text-xs sm:text-sm tracking-wide cursor-pointer hover:text-brown-[#D0BFB4] transition-colors duration-300"
        onClick={scrollToContent}
        aria-label="Scroll down to content"
      >
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" aria-hidden="true" />
        <span className="ml-1">Explore more</span>
      </button>
    </section>
  )
}