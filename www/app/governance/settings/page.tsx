'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/governance/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bone, Save } from 'lucide-react'

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [delegationThreshold, setDelegationThreshold] = useState(100000)
  const [autoVote, setAutoVote] = useState(false)

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement settings save logic here
    console.log('Settings saved:', { notificationsEnabled, delegationThreshold, autoVote })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bone className="mr-2 h-8 w-8 text-brown-[#D0BFB4]" />
          Settings
        </h1>
        <Card className="border-t-4 border-brown-[#D0BFB4]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Bone className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
              Governance Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-gray-700 dark:text-gray-300">Enable Notifications</Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delegationThreshold" className="text-gray-700 dark:text-gray-300">Delegation Threshold (BARK)</Label>
                <Input
                  id="delegationThreshold"
                  type="number"
                  value={delegationThreshold}
                  onChange={(e) => setDelegationThreshold(parseInt(e.target.value))}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoVote" className="text-gray-700 dark:text-gray-300">Enable Auto-Voting</Label>
                <Switch
                  id="autoVote"
                  checked={autoVote}
                  onCheckedChange={setAutoVote}
                />
              </div>
              <Button type="submit" className="w-full bg-brown-[#D0BFB4] text-white hover:bg-brown-[#C0AF94]">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

