import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, VoteIcon, Lightbulb, Shield } from 'lucide-react'
import Link from 'next/link'

export function GovernanceModel() {
  const governanceFeatures = [
    { icon: Users, title: "Community-Driven", description: "BARK's governance is powered by its community members." },
    { icon: VoteIcon, title: "Proposal Voting", description: "Token holders can vote on key decisions and proposals." },
    { icon: Lightbulb, title: "Idea Submission", description: "Anyone can submit ideas for improving the BARK ecosystem." },
    { icon: Shield, title: "Decentralized Control", description: "No single entity has complete control over the protocol." },
  ]

  const participationSteps = [
    "Acquire BARK tokens to gain voting power",
    "Join the BARK governance forum to discuss proposals",
    "Create or vote on proposals to shape the future of BARK",
    "Delegate your voting power if you can't actively participate",
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">BARK Governance Model</h1>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">What is BARK Governance?</CardTitle>
            <CardDescription>
              BARK governance is a decentralized decision-making process that allows BARK token holders to 
              participate in the development and management of the BARK protocol.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {governanceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <feature.icon className="w-8 h-8 text-brown-[#D0BFB4] mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">How to Participate</CardTitle>
            <CardDescription>
              Follow these steps to get involved in BARK's governance process:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {participationSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-brown-[#D0BFB4] mt-1" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Governance Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li className="text-gray-700">
                <span className="font-semibold text-gray-900">Proposal Submission:</span> Community members submit proposals for changes or improvements.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold text-gray-900">Discussion Period:</span> The community discusses and refines proposals in the governance forum.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold text-gray-900">Voting:</span> Eligible token holders cast their votes on proposals.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold text-gray-900">Implementation:</span> Approved proposals are implemented by the BARK development team.
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild size="lg" className="mt-6 bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4] text-white">
            <Link href="/governance">
              Explore Active Proposals <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GovernanceModel