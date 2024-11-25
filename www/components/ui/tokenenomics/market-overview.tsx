'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon, DollarSignIcon, CoinsIcon } from 'lucide-react'
import { getCurrentPrice, get24HourChange, get7DayChange, getTotalVolume, getMarketCap } from "@/utils/market-data/bark-price-data"

const MarketOverview: React.FC = () => {
  const currentPrice = getCurrentPrice()
  const change24h = get24HourChange()
  const change7d = get7DayChange()
  const totalVolume = getTotalVolume()
  const marketCap = getMarketCap()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const renderTrend = (value: number) => {
    const Icon = value >= 0 ? ArrowUpIcon : ArrowDownIcon
    const color = value >= 0 ? 'text-green-500' : 'text-red-500'
    return (
      <span className={`flex items-center ${color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {formatPercentage(value)}
      </span>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">BARK Token Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <span className="flex items-center">
                  <DollarSignIcon className="w-4 h-4 mr-2" />
                  Current Price
                </span>
              </TableCell>
              <TableCell>{formatCurrency(currentPrice)}</TableCell>
              <TableCell>{renderTrend(change24h)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <span className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  24h Change
                </span>
              </TableCell>
              <TableCell>{formatPercentage(change24h)}</TableCell>
              <TableCell>{renderTrend(change24h)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <span className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  7d Change
                </span>
              </TableCell>
              <TableCell>{formatPercentage(change7d)}</TableCell>
              <TableCell>{renderTrend(change7d)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <span className="flex items-center">
                  <CoinsIcon className="w-4 h-4 mr-2" />
                  Total Volume
                </span>
              </TableCell>
              <TableCell>{formatCurrency(totalVolume)}</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <span className="flex items-center">
                  <DollarSignIcon className="w-4 h-4 mr-2" />
                  Market Cap
                </span>
              </TableCell>
              <TableCell>{formatCurrency(marketCap)}</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default MarketOverview