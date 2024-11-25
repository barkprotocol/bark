'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/governance/dashboard'
import DelegationManager from '@/components/governance/delegation-manager'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bone } from 'lucide-react'

type Delegation = {
    address: string
    amount: number
    date: string
  }
  
  const initialDelegations: Delegation[] = [
    { address: '7fgX8bktP...9ZhyDnc', amount: 50000, date: '2024-12-01' },
    { address: '3jQx7Ap2R...Km4FvLq', amount: 75000, date: '2024-12-15' },
    { address: '9tNx5Qw8E...Hs2PzXy', amount: 100000, date: '2024-11-01' },
  ]
  
  export default function DelegationPage() {
    const [delegations] = useState(initialDelegations)
  
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bone className="mr-2 h-8 w-8 text-brown-[#D0BFB4]" />
            Delegation
          </h1>
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Delegate Voting Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DelegationManager />
            </CardContent>
          </Card>
          <Card className="border-t-4 border-brown-[#D0BFB4]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                Active Delegations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delegations.map((delegation, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{delegation.address}</TableCell>
                      <TableCell>{delegation.amount.toLocaleString()} BARK</TableCell>
                      <TableCell>{delegation.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }