'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DelegationManager() {
  const [delegateAddress, setDelegateAddress] = useState('')
  const [error, setError] = useState('')

  const handleDelegate = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement delegation logic here
    console.log('Delegating to:', delegateAddress)
    // For demonstration, we'll just show an error
    setError('Delegation failed. Please try again.')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleDelegate} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="delegateAddress" className="text-gray-700 dark:text-gray-300">Delegate Address</Label>
          <Input
            id="delegateAddress"
            placeholder="Enter Solana address"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            required
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full bg-brown-[#D0BFB4] text-white hover:bg-brown-[#C0AF94]">Delegate</Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4 bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-600">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-300" />
          <AlertDescription className="text-red-800 dark:text-red-100">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}