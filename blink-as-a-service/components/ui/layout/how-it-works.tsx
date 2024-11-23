'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="transition-all duration-300 transform hover:scale-102 flex flex-col h-full relative overflow-hidden group bg-card dark:bg-card/80 border-border shadow-sm hover:shadow-md">
        <CardHeader className="text-center pb-2 relative z-10">
          <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3 transform transition-transform group-hover:scale-110 duration-300 bg-primary text-primary-foreground shadow-sm">
            <span className="text-xl">{number}</span>
          </div>
          <CardTitle className="font-inter text-lg font-semibold mb-2 text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex-grow relative z-10">
          <p className="font-poppins text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function HowItWorks() {
  const howItWorksSteps: HowItWorksStepProps[] = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description: "Link your Solana wallet to BARK BLINK to get started and access all features securely.",
    },
    {
      number: 2,
      title: "Create Your Blink",
      description: "Use our intuitive interface to create and customize your Solana Blink with unique attributes.",
    },
    {
      number: 3,
      title: "Share or Trade",
      description: "Send your Blink to friends or trade it on supported marketplaces to grow your collection.",
    },
    {
      number: 4,
      title: "Manage Your Collection",
      description: "Track and manage your Blinks in your personal BlinkBoard, monitoring value and activity.",
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-background dark:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-foreground">How It Works</h2>
          <p className="text-center max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Get started with BARK in just a few simple steps. Our intuitive platform makes it easy to create, manage, and trade your digital assets on the Solana blockchain.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {howItWorksSteps.map((step, index) => (
            <HowItWorksStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

