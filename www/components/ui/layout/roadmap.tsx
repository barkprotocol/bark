'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, Clock } from 'lucide-react'

interface Milestone {
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  year: number
}

const milestones: Milestone[] = [
  {
    title: 'Project Inception',
    description: 'Conceptualization and initial planning of BARK Protocol',
    status: 'completed',
    quarter: 'Q1',
    year: 2024,
  },
  {
    title: 'Whitepaper Release',
    description: 'Publication of comprehensive project documentation',
    status: 'completed',
    quarter: 'Q2',
    year: 2024,
  },
  {
    title: 'Token Generation Event',
    description: 'Creation and distribution of BARK tokens',
    status: 'in-progress',
    quarter: 'Q3',
    year: 2024,
  },
  {
    title: 'Mainnet Launch',
    description: 'Official release of BARK Protocol on Solana mainnet',
    status: 'upcoming',
    quarter: 'Q4',
    year: 2024,
  },
  {
    title: 'DEX Integration',
    description: 'Listing on major decentralized exchanges',
    status: 'upcoming',
    quarter: 'Q1',
    year: 2025,
  },
  {
    title: 'Governance Implementation',
    description: 'Introduction of decentralized governance mechanisms',
    status: 'upcoming',
    quarter: 'Q2',
    year: 2025,
  },
]

const statusIcons = {
  completed: CheckCircle2,
  'in-progress': Clock,
  upcoming: Circle,
}

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-brown-[#D0BFB4]',
  upcoming: 'bg-blue-500',
}

const MilestoneCard: React.FC<{ milestone: Milestone }> = ({ milestone }) => {
  const StatusIcon = statusIcons[milestone.status]
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{milestone.title}</CardTitle>
          <Badge variant="secondary" className={`${statusColors[milestone.status]} text-white`}>
            {milestone.status}
          </Badge>
        </div>
        <CardDescription>{`${milestone.quarter} ${milestone.year}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{milestone.description}</p>
        <StatusIcon className={`mt-2 h-5 w-5 ${milestone.status === 'completed' ? 'text-green-500' : milestone.status === 'in-progress' ? 'text-brown-[#D0BFB4]' : 'text-blue-500'}`} />
      </CardContent>
    </Card>
  )
}

export default function Roadmap() {
  const years = Array.from(new Set(milestones.map(m => m.year))).sort()

  return (
    <section className="py-16 bg-muted" id="roadmap">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-foreground dark:text-white sm:text-4xl lg:text-5xl mb-4">
            Project Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the journey of BARK Protocol from inception to future milestones
          </p>
        </motion.div>

        <Tabs defaultValue={years[0].toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {years.map((year) => (
              <TabsTrigger key={year} value={year.toString()} className="text-lg font-semibold">
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
          {years.map((year) => (
            <TabsContent key={year} value={year.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones
                  .filter((milestone) => milestone.year === year)
                  .map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <MilestoneCard milestone={milestone} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}