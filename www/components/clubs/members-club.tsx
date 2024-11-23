'use client'

import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://ucarecdn.com/60f6ce5e-1757-4d1e-a9a2-a895bbfcab84/barkesters.png"
        alt="BARK - Underdogs Members Club: A Club for Everyday Heroes"
        fill
        quality={100}
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/90"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Title */}
        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tighter mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'linear-gradient(to right, #D0BFB4, #FFFFFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 8px rgba(208, 191, 180, 0.2), 0 0 30px rgba(208, 191, 180, 0.1)',
          }}
        >
          The Underdogs
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-1xl md:text-2xl lg:text-3xl text-[#D0BFB4] font-medium mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          Meme-Powered Solutions for Social Good
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}
        >
          BARK integrates blockchain governance with the Solana network to create a dynamic, 
          community-powered ecosystem. By leveraging Blink, MemeFi, and CNFTs, we are reshaping 
          the future of social finance, enabling disaster relief, and empowering donations through 
          decentralized solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* Get Started Button */}
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium group bg-gradient-to-r from-[#D0BFB4] to-[#D2BFB4] text-gray-900 hover:from-[#D2BFB4] hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-md"
          >
            <Link href="/pages/get-started" className="flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>

          {/* Explore Collection Button */}
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium group bg-transparent border-2 border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-md"
          >
            <Link href="/pages/collection" className="flex items-center justify-center">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
