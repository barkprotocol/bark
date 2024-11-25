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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tighter text-center text-white mb-2 sm:mb-4"
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
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium mb-2 sm:mb-4 text-center max-w-4xl mx-auto"
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
          className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-8 text-center"
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
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold group bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(255,255,255,0.5)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.35)] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <Link href="/pages/get-started" className="flex items-center justify-center">
              Get Started
              <motion.span
                className="ml-2"
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
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold group bg-transparent text-white hover:text-gray-200 border-2 border-white/50 hover:border-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] rounded-md focus:outline-none focus:ring-2 focus:ring-white/75"
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
    </section>
  )
}

