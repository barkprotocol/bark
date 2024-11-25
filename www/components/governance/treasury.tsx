import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bone, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

type Transaction = {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  date: string
  description: string
}

const transactions: Transaction[] = [
  { id: '1', type: 'deposit', amount: 500000, date: '2023-06-01', description: 'Community fund allocation' },
  { id: '2', type: 'withdrawal', amount: 100000, date: '2023-06-15', description: 'Development grant payout' },
  { id: '3', type: 'deposit', amount: 250000, date: '2023-06-30', description: 'Token sale proceeds' },
  { id: '4', type: 'withdrawal', amount: 75000, date: '2023-07-05', description: 'Marketing campaign expense' },
  { id: '5', type: 'deposit', amount: 1000000, date: '2023-07-15', description: 'Major investor contribution' },
]

export function Treasury() {
  const treasuryBalance = transactions.reduce((sum, tx) => 
    tx.type === 'deposit' ? sum + tx.amount : sum - tx.amount, 0
  )

  return (
    <Card className="w-full shadow-lg bg-white dark:bg-gray-800 border-t-4 border-brown-[#D0BFB4]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bone className="mr-2 h-6 w-6 text-brown-[#D0BFB4]" />
          BARK Treasury
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Current Balance</h3>
          <p className="text-3xl font-bold text-brown-[#D0BFB4]">
            {treasuryBalance.toLocaleString()} BARK
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Recent Transactions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge 
                      variant={tx.type === 'deposit' ? 'default' : 'destructive'}
                      className="flex items-center w-24 justify-center"
                    >
                      {tx.type === 'deposit' ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="mr-1 h-4 w-4" />
                      )}
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.amount.toLocaleString()} BARK
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default Treasury