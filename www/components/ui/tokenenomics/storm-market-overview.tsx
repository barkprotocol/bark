'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from 'next-themes'
import { DollarSign, TrendingUp, TrendingDown, BarChart2, Repeat, Clock } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PriceData {
  date: string
  price: number
}

const priceData: PriceData[] = [
  { date: '2024-11-01', price: 0.00000001 },
  { date: '2024-11-02', price: 0.000000012 },
  { date: '2024-11-03', price: 0.000000011 },
  { date: '2024-11-04', price: 0.000000013 },
  { date: '2024-11-05', price: 0.000000014 },
  { date: '2024-11-06', price: 0.0000000135 },
  { date: '2024-11-07', price: 0.000000015 },
]

const MarketOverview: React.FC = () => {
  const { theme } = useTheme()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 10,
      maximumFractionDigits: 10,
    }).format(value)
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
    return value.toString()
  }

  const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; change?: string }> = ({ title, value, icon, change }) => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </p>
            )}
          </div>
          <div className="text-brown-[#D0BFB4]">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">BARK Token Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'var(--foreground)' }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis
                    tick={{ fill: 'var(--foreground)' }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickFormatter={(value) => `$${value.toFixed(10)}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Current Price"
          value={formatCurrency(0.000000015)}
          icon={<DollarSign size={24} />}
          change="+5.26% (24h)"
        />
        <MetricCard
          title="Market Cap"
          value={formatCurrency(279600)}
          icon={<BarChart2 size={24} />}
        />
        <MetricCard
          title="24h Trading Volume"
          value={formatCurrency(15000)}
          icon={<Repeat size={24} />}
        />
        <MetricCard
          title="Circulating Supply"
          value={formatLargeNumber(18640000000)}
          icon={<TrendingUp size={24} />}
        />
        <MetricCard
          title="Total Supply"
          value={formatLargeNumber(20000000000)}
          icon={<TrendingDown size={24} />}
        />
        <MetricCard
          title="All-Time High"
          value={formatCurrency(0.00000002)}
          icon={<Clock size={24} />}
          change="Jan 15, 2024"
        />
      </div>
    </div>
  )
}

export default MarketOverview