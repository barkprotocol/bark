import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, FileText, Users } from 'lucide-react'

type Proposal = {
  id: string
  title: string
  description: string
  votesFor: number
  votesAgainst: number
  status: 'active' | 'passed' | 'rejected'
}

interface GovernanceOverviewProps {
  proposals: Proposal[]
}

export default function GovernanceOverview({ proposals }: GovernanceOverviewProps) {
  const stats = React.useMemo(() => [
    {
      title: "Total Proposals",
      value: proposals.length,
      icon: FileText,
    },
    {
      title: "Active Proposals",
      value: proposals.filter(p => p.status === 'active').length,
      icon: Users,
    },
    {
      title: "Total Votes Cast",
      value: proposals.reduce((sum, p) => sum + p.votesFor + p.votesAgainst, 0).toLocaleString(),
      icon: BarChart2,
    },
  ], [proposals])

  return (
    <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Governance Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.title} 
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <stat.icon className="w-8 h-8 mb-2 text-brown-[#D0BFB4]" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{stat.title}</h3>
              <p 
                className="text-3xl font-bold text-brown-[#D0BFB4]" 
                aria-label={`${stat.title}: ${stat.value}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="h-6" aria-hidden="true"></div>
    </Card>
  )
}