'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, PawPrint } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  const [showBackground, setShowBackground] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { ref: scrollRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContent = useCallback(() => {
    const contentElement = document.getElementById('content')
    contentElement?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    setImageError(false)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        {!imageError && (
          <Image
            src="https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png"
            alt="Barkersters, representing the power and innovation of BARK"
            fill
            quality={85}
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brown-[#D0BFB4]"></div>
        </div>
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
        ref={scrollRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-30 flex flex-col items-center gap-4 sm:gap-6 w-full px-4 sm:px-6 lg:px-8"
      >
        <Badge variant="secondary" className="px-2 py-1 text-xs sm:text-sm md:text-base uppercase tracking-wider bg-brown-[#D0BFB4]/20 text-brown-[#E5D3C8] font-medium rounded-full shadow-lg backdrop-blur-sm">
          <PawPrint className="w-4 h-4 inline-block mr-1" />
          Introducing BARK Protocol
        </Badge>
        
        <motion.h1 
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-brown-[#D0BFB4]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Redefining Social Finance
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mt-2 mb-1 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
          }}
        >
          Driving impactful donations, disaster relief, and community empowerment through blockchain innovation.
        </motion.p>

        <motion.p
          className="text-xs sm:text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          BARK Protocol leverages Solana blinks, governance, and decentralized technology to build a transparent, secure, and community-driven ecosystem. Together, we're shaping a future of meaningful impact and transformation.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-4 justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold group bg-gradient-to-r from-brown-[#E5D3C8] via-brown-[#D0BFB4] to-brown-[#C1A99E] text-gray-800 hover:from-brown-[#F0E4D8] hover:via-brown-[#E5D3C8] hover:to-brown-[#D0BFB4] transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(208,191,180,0.5)] hover:shadow-[0_6px_20px_rgba(208,191,180,0.35)] rounded-md ring-2 ring-brown-[#D0BFB4]/50 hover:ring-brown-[#D0BFB4] focus:outline-none focus:ring-2 focus:ring-brown-[#D0BFB4]"
            style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.1)' }}
          >
            <Link href="/pages/get-started" className="flex items-center justify-center">
              Get Started
              <motion.span
                className="ml-2 opacity-0 transition-opacity duration-300 ease-in-out"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold group bg-transparent border-2 border-brown-[#D0BFB4] text-brown-[#E5D3C8] hover:bg-gradient-to-r hover:from-brown-[#D0BFB4]/30 hover:to-brown-[#E5D3C8]/30 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(208,191,180,0.3)] hover:shadow-[0_6px_20px_rgba(208,191,180,0.2)] rounded-md ring-2 ring-brown-[#D0BFB4]/30 hover:ring-brown-[#D0BFB4]/50 focus:outline-none focus:ring-2 focus:ring-brown-[#D0BFB4]"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
          >
            <Link href="/pages/whitepaper" className="flex items-center justify-center">
              Whitepaper
              <motion.span
                className="ml-2 opacity-0 transition-opacity duration-300 ease-in-out"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.button 
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-30 text-brown-[#D0BFB4] text-xs sm:text-sm tracking-wide cursor-pointer hover:text-brown-[#E5D3C8] transition-colors duration-300 bg-black/50 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-[#D0BFB4]/75"
        onClick={scrollToContent}
        aria-label="Scroll down to content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" aria-hidden="true" />
        <span className="ml-1">Explore more</span>
      </motion.button>
    </section>
  )
}

