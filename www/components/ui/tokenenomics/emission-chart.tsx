'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { useTheme } from 'next-themes'
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface EmissionData {
  year: number
  emission: number
  totalSupply: number
}

interface EmissionChartProps {
  data: EmissionData[]
  title: string
}

const EmissionChart: React.FC<EmissionChartProps> = ({ data, title }) => {
  const { resolvedTheme } = useTheme()

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
    return value.toString()
  }

  const CustomTooltip = useMemo(() => {
    return ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <ChartTooltip>
            <p className="font-bold mb-2">Year: {label}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {formatLargeNumber(entry.value)}
              </p>
            ))}
          </ChartTooltip>
        )
      }
      return null
    }
  }, [])

  const chartColors = useMemo(() => ({
    grid: resolvedTheme === 'dark' ? 'hsl(var(--muted))' : 'hsl(var(--muted-foreground) / 0.2)',
    axis: resolvedTheme === 'dark' ? 'hsl(var(--border))' : 'hsl(var(--border))',
    tick: resolvedTheme === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))',
    emission: 'hsl(45, 100%, 50%)', // Bright yellow
    totalSupply: 'hsl(45, 100%, 30%)', // Darker yellow
  }), [resolvedTheme])

  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            emission: {
              label: "Annual Emission",
              color: chartColors.emission,
            },
            totalSupply: {
              label: "Total Supply",
              color: chartColors.totalSupply,
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="year" 
                tick={{ fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke={chartColors.emission}
                tickFormatter={formatLargeNumber}
                tick={{ fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke={chartColors.totalSupply}
                tickFormatter={formatLargeNumber}
                tick={{ fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
              <Bar
                yAxisId="left"
                dataKey="emission"
                name="Annual Emission"
                fill={chartColors.emission}
              />
              <Bar
                yAxisId="right"
                dataKey="totalSupply"
                name="Total Supply"
                fill={chartColors.totalSupply}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default EmissionChart