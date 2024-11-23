'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { UsersIcon, ShoppingBagIcon, HeartIcon } from 'lucide-react'

interface ClubBenefit {
  name: string
  description: string
  benefits: string[]
  icon: React.ElementType
  tier: number
}

const clubBenefits: ClubBenefit[] = [
  {
    name: 'Members Club',
    description: 'Join our exclusive Members Club to enjoy special privileges and rewards.',
    benefits: [
      'Exclusive access to special events',
      'Priority participation in governance',
      'Early access to new features',
      'Special recognition in projects',
      'Access to members-only content',
    ],
    icon: UsersIcon,
    tier: 1,
  },
  {
    name: 'Rewards Program',
    description: 'Earn and redeem rewards for your participation and contributions.',
    benefits: [
      'Earn points for platform activity',
      'Redeem points for exclusive items',
      'Access to limited edition NFTs',
      'Participate in reward challenges',
      'Bonus rewards for referrals',
    ],
    icon: ShoppingBagIcon,
    tier: 2,
  },
  {
    name: 'Social Impact',
    description: 'Make a difference through our social impact initiatives and projects.',
    benefits: [
      'Participate in charitable giving',
      'Vote on social causes to support',
      'Track your contribution impact',
      'Collaborate on community projects',
      'Earn impact badges',
    ],
    icon: HeartIcon,
    tier: 3,
  },
]

const DogPaw: React.FC = () => (
  <svg className="w-4 h-4 text-brown-600 dark:text-brown-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 15.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-5.5-3c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm11 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-5.5-9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" />
  </svg>
)

const BenefitCard: React.FC<ClubBenefit> = ({ name, description, benefits, icon: Icon, tier }) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon 
              className="h-8 w-8 text-brown-600 dark:text-brown-400 mr-3" 
              aria-hidden="true" 
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {name}
            </h3>
          </div>
          <div className="flex">
            {[...Array(tier)].map((_, i) => (
              <DogPaw key={i} />
            ))}
          </div>
        </div>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function MembersClubCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {clubBenefits.map((benefit, index) => (
        <BenefitCard key={index} {...benefit} />
      ))}
    </div>
  )
}
