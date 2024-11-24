'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  endDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(endDate) - +new Date()
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const addLeadingZero = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString()
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Time Remaining</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {Object.entries(timeLeft).map(([interval, value]) => (
            <div key={interval} className="flex flex-col">
              <span className="text-2xl font-bold">{addLeadingZero(value)}</span>
              <span className="text-xs text-muted-foreground capitalize">{interval}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

