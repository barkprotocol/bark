'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, Download, ExternalLink, Palette, Type, FileImage, MessageSquare, FileCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"

const sections = [
  { id: 'logo', title: 'Logo', icon: FileImage },
  { id: 'colors', title: 'Colors', icon: Palette },
  { id: 'typography', title: 'Typography', icon: Type },
  { id: 'iconography', title: 'Iconography', icon: FileImage },
  { id: 'voice', title: 'Voice & Tone', icon: MessageSquare },
  { id: 'usage', title: 'Usage Guidelines', icon: FileCheck },
]

export default function BrandGuidePage() {
  const [activeTab, setActiveTab] = useState('logo')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { toast } = useToast()

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    setShowScrollToTop(scrollTop > 200)
  }

  const scrollToTop = () => {
    document.getElementById('brand-guide-top')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadAssets = async () => {
    try {
      const response = await fetch('/api/brand-assets/download')
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'Storm_Protocol_Brand_Assets.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast({
        title: "Download Started",
        description: "Your brand assets are being downloaded.",
      })
    } catch (error) {
      console.error('Error downloading brand assets:', error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the brand assets. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-6xl mx-auto bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle id="brand-guide-top" className="text-4xl font-bold text-center">BARK Protocol Brand Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            <Button variant="outline" onClick={handleDownloadAssets}>
              <Download className="mr-2 h-4 w-4" />
              Download Brand Assets
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/storm-protocol/brand-guide" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <nav className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-2">Sections</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === section.id ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => setActiveTab(section.id)}
                    >
                      <section.icon className="mr-2 h-5 w-5 text-brown-[#D0BFB4]" />
                      {section.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <ScrollArea className="h-[600px] md:col-span-3 pr-4" onScrollCapture={handleScroll}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="logo">
                      <h2 className="text-2xl font-bold mb-4">Logo</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Card>
                          <CardContent className="p-4">
                            <Image 
                              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp?height=200&width=200" 
                              alt="BARK Protocol Logo" 
                              width={200} 
                              height={200} 
                              className="mx-auto"
                            />
                            <p className="text-center mt-2">Primary Logo</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <Image 
                              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp?height=200&width=200" 
                              alt="BARK Protocol Icon" 
                              width={200} 
                              height={200} 
                              className="mx-auto"
                            />
                            <p className="text-center mt-2">Icon</p>
                          </CardContent>
                        </Card>
                      </div>
                      <p className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                        The BARK Protocol logo represents the power and dynamism of our blockchain solution. It combines a stylized lightning bolt with a circular shape, symbolizing the cyclical nature of blockchain transactions and the speed of our protocol.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Logo Usage Guidelines</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
                        <li>Always maintain clear space around the logo</li>
                        <li>Do not alter the colors or proportions of the logo</li>
                        <li>Ensure the logo is clearly visible against its background</li>
                        <li>Use the appropriate logo version for different sizes and contexts</li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="colors">
                      <h2 className="text-2xl font-bold mb-4">Colors</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {[
                          { name: 'Primary', variable: '--primary' },
                          { name: 'Secondary', variable: '--secondary' },
                          { name: 'Accent', variable: '--accent' },
                          { name: 'Background', variable: '--background' },
                          { name: 'Foreground', variable: '--foreground' },
                          { name: 'Yellow', variable: '--yellow' },
                        ].map((color) => (
                          <Card key={color.name}>
                            <CardContent className="p-4">
                              <div 
                                className="w-full h-20 rounded-md mb-2" 
                                style={{ backgroundColor: `hsl(var(${color.variable}))` }}
                              ></div>
                              <h3 className="font-semibold">{color.name}</h3>
                              <p className="text-sm">CSS Variable: {color.variable}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <p className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                        Our color palette is designed to convey trust, innovation, and energy. The primary colors represent stability and professionalism, while the accent colors add vibrancy and highlight important elements. The addition of yellow brings warmth and optimism to our brand, emphasizing our forward-thinking approach and the bright future of blockchain technology.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="typography">
                      <h2 className="text-2xl font-bold mb-4">Typography</h2>
                      <div className="space-y-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Primary Font: Poppins</h3>
                          <p className="font-['Poppins'] text-2xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                          <p className="font-['Poppins'] text-2xl">abcdefghijklmnopqrstuvwxyz</p>
                          <p className="font-['Poppins'] text-2xl">1234567890</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Heading Font: Oswald</h3>
                          <p className="font-['Oswald'] text-2xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                          <p className="font-['Oswald'] text-2xl">abcdefghijklmnopqrstuvwxyz</p>
                          <p className="font-['Oswald'] text-2xl">1234567890</p>
                        </div>
                      </div>
                      <p className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                        We use Poppins as our primary font for its clean, modern look and excellent readability across different screen sizes. Oswald is used for headings to provide a strong, impactful presence. Both fonts contribute to our brand's professional and innovative image.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="iconography">
                      <h2 className="text-2xl font-bold mb-4">Iconography</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                        {['Zap', 'Cloud', 'Lock', 'Shield', 'Cpu', 'Database', 'Globe', 'Users'].map((icon) => (
                          <Card key={icon}>
                            <CardContent className="p-4 flex flex-col items-center">
                              <div className="w-12 h-12 flex items-center justify-center bg-brown-[#D0BFB4] text-white rounded-full mb-2">
                                <span className="text-2xl">{icon[0]}</span>
                              </div>
                              <p className="text-sm">{icon}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <p className="mb-4 text-lg text-gray-800 dark:text-gray-200">
                        Our iconography is designed to be simple, clear, and consistent. We use a stroke-based style with rounded corners to maintain a friendly and approachable feel while conveying technical concepts. The yellow background adds a touch of energy and optimism to our visual language.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="voice">
                      <h2 className="text-2xl font-bold mb-4">Voice & Tone</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Brand Voice</h3>
                          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-gray-200">
                            <li>Knowledgeable: We demonstrate expertise in blockchain technology</li>
                            <li>Innovative: We emphasize our cutting-edge solutions and forward-thinking approach</li>
                            <li>Trustworthy: We communicate with transparency and integrity</li>
                            <li>Approachable: We explain complex concepts in an understandable way</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Tone Guidelines</h3>
                          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-gray-200">
                            <li>Use active voice to convey confidence and clarity</li>
                            <li>Balance technical accuracy with accessibility</li>
                            <li>Be concise and direct, avoiding unnecessary jargon</li>
                            <li>Maintain a positive and solution-oriented tone</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="usage">
                      <h2 className="text-2xl font-bold mb-4">Usage Guidelines</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Do's</h3>
                          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-gray-200">
                            <li>Use the full BARK Protocol logo in primary communications</li>
                            <li>Maintain consistent color usage across all materials</li>
                            <li>Adhere to the specified typography guidelines</li>
                            <li>Use approved iconography in user interfaces and marketing materials</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Don'ts</h3>
                          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-gray-200">
                            <li>Don't alter the proportions or colors of the logo</li>
                            <li>Avoid using unapproved fonts in official communications</li>
                            <li>Don't use the brand elements in a way that implies endorsement of unaffiliated products or services</li>
                            <li>Avoid cluttered designs that detract from the clean, modern aesthetic of the brand</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="fixed bottom-4 right-4 rounded-full p-2 bg-brown-[#D0BFB4] hover:bg-brown-[#D2BFB4] text-white"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}