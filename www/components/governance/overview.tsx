import React from 'react'
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl border-t-2 border-brown-[#D0BFB4]"
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
  )
}

