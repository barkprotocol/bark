'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-react'

export default function VotingPower() {
  const [votePower, setVotePower] = useState(500000)
  const maxVotePower = 1000000

  const handleIncrease = () => setVotePower(prev => Math.min(prev + 100000, maxVotePower))
  const handleDecrease = () => setVotePower(prev => Math.max(prev - 100000, 0))
  const handleReset = () => setVotePower(500000)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="votePower" className="text-gray-700 dark:text-gray-200">Voting Power</Label>
        <Input
          id="votePower"
          type="number"
          value={votePower}
          onChange={(e) => setVotePower(Math.max(0, Math.min(parseInt(e.target.value) || 0, maxVotePower)))}
          className="text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </div>
      <Progress value={(votePower / maxVotePower) * 100} className="w-full bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-brown-[#D0BFB4]" />
      <div className="flex justify-between space-x-4">
        <Button onClick={handleDecrease} variant="outline" className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600">
          <ArrowDown className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" /> Decrease
        </Button>
        <Button onClick={handleIncrease} variant="outline" className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600">
          <ArrowUp className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" /> Increase
        </Button>
      </div>
      <Button onClick={handleReset} variant="secondary" className="w-full bg-brown-[#D0BFB4] text-white hover:bg-brown-[#C0AF94]">
        <RotateCcw className="mr-2 h-4 w-4" /> Reset
      </Button>
      <div className="text-center text-sm text-gray-600 dark:text-gray-300">
        Current Voting Power: {votePower.toLocaleString()} / {maxVotePower.toLocaleString()}
      </div>
    </div>
  )
}