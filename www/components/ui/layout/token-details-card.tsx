import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from 'lucide-react'

export interface TokenDetail {
  label: string
  value: string
}

interface TokenDetailsCardProps {
  title: string
  details: TokenDetail[]
}

export const TokenDetailsCard: React.FC<TokenDetailsCardProps> = ({ title, details }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground dark:text-white flex items-center">
          <Coins className="w-5 h-5 mr-2 text-[#D0BFB4]" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="font-medium mr-2">{detail.label}:</span>
              <span className="text-muted-foreground">{detail.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}