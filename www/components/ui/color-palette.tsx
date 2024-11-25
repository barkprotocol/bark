'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from "@/components/ui/use-toast"

interface ColorSwatch {
  name: string
  variable: string
  hex: string
  rgb: string
}

const colorSwatches: ColorSwatch[] = [
  { name: 'Primary', variable: '--primary', hex: '#D0BFB4', rgb: '208, 191, 180' },
  { name: 'Secondary', variable: '--secondary', hex: '#78716C', rgb: '120, 113, 108' },
  { name: 'Accent', variable: '--accent', hex: '#F59E0B', rgb: '245, 158, 11' },
  { name: 'Background', variable: '--background', hex: '#FFFFFF', rgb: '255, 255, 255' },
  { name: 'Foreground', variable: '--foreground', hex: '#1F2937', rgb: '31, 41, 55' },
  { name: 'Yellow', variable: '--yellow', hex: '#FDE68A', rgb: '253, 230, 138' },
]

const ColorSwatch: React.FC<{ color: ColorSwatch }> = ({ color }) => {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: `${color.name}: ${text}`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <div 
        className="h-24 w-full transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: color.hex }}
      ></div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{color.name}</h3>
        <Tabs defaultValue="hex" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="hex" className="flex items-center justify-between">
            <span>{color.hex}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(color.hex)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TabsContent>
          <TabsContent value="rgb" className="flex items-center justify-between">
            <span>{color.rgb}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(`rgb(${color.rgb})`)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TabsContent>
          <TabsContent value="css" className="flex items-center justify-between">
            <span>{color.variable}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(`var(${color.variable})`)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function ColorPalette() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">BARK Protocol Color Palette</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-6 text-muted-foreground">
          Our color palette is designed to convey trust, innovation, and energy. Click on any color value to copy it to your clipboard.
        </p>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {colorSwatches.map((color) => (
            <ColorSwatch key={color.name} color={color} />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}

