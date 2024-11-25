import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, ThumbsUp, ThumbsDown, Bone } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

type Proposal = {
  id: string
  title: string
  description: string
  status: 'active' | 'passed' | 'rejected'
  votesFor: number
  votesAgainst: number
}

interface ProposalListProps {
  proposals: Proposal[]
}

export default function ProposalList({ proposals }: ProposalListProps) {
  const statusConfig = {
    active: { color: 'bg-brown-[#D0BFB4] text-yellow-50', icon: AlertCircle },
    passed: { color: 'bg-green-500 text-green-50', icon: CheckCircle },
    rejected: { color: 'bg-red-500 text-red-50', icon: XCircle },
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => {
        const totalVotes = proposal.votesFor + proposal.votesAgainst
        const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0
        
        return (
          <Card key={proposal.id} className="hover:shadow-xl transition-all duration-300 shadow-md bg-white dark:bg-gray-800 border-l-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className={`${statusConfig[proposal.status].color} px-2 py-1 text-xs font-semibold rounded-full`}>
                  {React.createElement(statusConfig[proposal.status].icon, { className: "mr-1 h-3 w-3 inline" })}
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">ID: {proposal.id}</span>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{proposal.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {proposal.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    For: {proposal.votesFor.toLocaleString()}
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    Against: {proposal.votesAgainst.toLocaleString()}
                  </span>
                </div>
                <Progress value={forPercentage} className="h-2 bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{forPercentage.toFixed(2)}% For</span>
                  <span>{(100 - forPercentage).toFixed(2)}% Against</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-green-500 text-white hover:bg-green-600 transition-colors duration-200">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Vote For
                  </Button>
                  <Button variant="outline" className="flex-1 bg-red-500 text-white hover:bg-red-600 transition-colors duration-200">
                    <ThumbsDown className="mr-2 h-4 w-4" /> Vote Against
                  </Button>
                </div>
                <Button variant="outline" className="w-full mt-2 bg-brown-[#D0BFB4] text-white hover:bg-brown-[#C0AF94] transition-colors duration-200">
                  <Bone className="mr-2 h-4 w-4" /> View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

