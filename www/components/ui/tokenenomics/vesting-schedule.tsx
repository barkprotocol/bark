'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from 'next-themes'
import { Lock, Unlock } from 'lucide-react'
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface VestingData {
  month: number
  Community: number
  Development: number
  Team: number
  Liquidity: number
  Ecosystem: number
  Reserve: number
}

const vestingData: VestingData[] = [
  { month: 0, Community: 25, Development: 10, Team: 0, Liquidity: 50, Ecosystem: 20, Reserve: 0 },
  { month: 3, Community: 37.5, Development: 17.5, Team: 0, Liquidity: 62.5, Ecosystem: 35, Reserve: 0 },
  { month: 6, Community: 50, Development: 25, Team: 0, Liquidity: 75, Ecosystem: 50, Reserve: 12.5 },
  { month: 9, Community: 62.5, Development: 32.5, Team: 0, Liquidity: 87.5, Ecosystem: 65, Reserve: 25 },
  { month: 12, Community: 75, Development: 40, Team: 25, Liquidity: 100, Ecosystem: 80, Reserve: 37.5 },
  { month: 18, Community: 87.5, Development: 55, Team: 37.5, Liquidity: 100, Ecosystem: 90, Reserve: 62.5 },
  { month: 24, Community: 100, Development: 70, Team: 50, Liquidity: 100, Ecosystem: 100, Reserve: 87.5 },
  { month: 30, Community: 100, Development: 85, Team: 62.5, Liquidity: 100, Ecosystem: 100, Reserve: 100 },
  { month: 36, Community: 100, Development: 100, Team: 75, Liquidity: 100, Ecosystem: 100, Reserve: 100 },
  { month: 42, Community: 100, Development: 100, Team: 87.5, Liquidity: 100, Ecosystem: 100, Reserve: 100 },
  { month: 48, Community: 100, Development: 100, Team: 100, Liquidity: 100, Ecosystem: 100, Reserve: 100 },
]

const colorScheme = {
  Community: 'hsl(45, 100%, 85%)',
  Development: 'hsl(45, 100%, 70%)',
  Team: 'hsl(45, 100%, 55%)',
  Liquidity: 'hsl(45, 100%, 45%)',
  Ecosystem: 'hsl(45, 100%, 35%)',
  Reserve: 'hsl(45, 100%, 25%)',
}

const VestingSchedule: React.FC = () => {
  const { resolvedTheme } = useTheme()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <ChartTooltip>
          <p className="font-bold mb-2">Month: {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex justify-between">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="ml-2 font-semibold">{entry.value.toFixed(2)}%</span>
            </p>
          ))}
        </ChartTooltip>
      )
    }
    return null
  }

  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <Lock className="mr-2 h-6 w-6 text-[#D0BFB4]" aria-hidden="true" />
          Token Vesting Schedule
          <Unlock className="ml-2 h-6 w-6 text-[#D0BFB4]" aria-hidden="true" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(Object.entries(colorScheme).map(([key, color]) => [key, { label: key, color }]))}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={vestingData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
                label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: 'var(--foreground)' }}
              />
              <YAxis
                tick={{ fill: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
                label={{ value: 'Tokens Unlocked (%)', angle: -90, position: 'insideLeft', fill: 'var(--foreground)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
              {Object.entries(colorScheme).reverse().map(([key, color]) => (
                <Area 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stackId="1" 
                  stroke={color} 
                  fill={color} 
                  fillOpacity={0.8}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default VestingSchedule