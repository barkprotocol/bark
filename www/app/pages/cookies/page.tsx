'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cookie, Shield, Settings, Info, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function CookiesPage() {
  const [analyticsCookies, setAnalyticsCookies] = useState(true)
  const [marketingCookies, setMarketingCookies] = useState(false)
  const { toast } = useToast()

  const handleSavePreferences = () => {
    // In a real application, you would save these preferences to local storage or send them to a server
    console.log('Saved preferences:', { analyticsCookies, marketingCookies })
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been updated.",
    })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">Cookies Policy</h1>
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cookie className="w-6 h-6 mr-2" />
              What are cookies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              How BARK Protocol uses cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              BARK Protocol uses cookies to improve your experience on our website, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Remembering your preferences and settings</li>
              <li>Keeping you signed in to your account</li>
              <li>Understanding how you use our website</li>
              <li>Improving our services based on your behavior</li>
              <li>Ensuring the security of your transactions</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-6 h-6 mr-2" />
              Types of cookies we use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="essential">
                <AccordionTrigger>Essential Cookies</AccordionTrigger>
                <AccordionContent>
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas of the website, and processing transactions. The website cannot function properly without these cookies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="analytics">
                <AccordionTrigger>Analytics Cookies</AccordionTrigger>
                <AccordionContent>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's functionality and optimize user experience. We use services like Google Analytics for this purpose.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="marketing">
                <AccordionTrigger>Marketing Cookies</AccordionTrigger>
                <AccordionContent>
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user. They remember that you have visited our website and share this information with other organizations, such as advertisers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Manage Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="essential-cookies" className="flex items-center space-x-2">
                  <span>Essential Cookies</span>
                </Label>
                <Switch
                  id="essential-cookies"
                  checked={true}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics-cookies" className="flex items-center space-x-2">
                  <span>Analytics Cookies</span>
                </Label>
                <Switch
                  id="analytics-cookies"
                  checked={analyticsCookies}
                  onCheckedChange={setAnalyticsCookies}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-cookies" className="flex items-center space-x-2">
                  <span>Marketing Cookies</span>
                </Label>
                <Switch
                  id="marketing-cookies"
                  checked={marketingCookies}
                  onCheckedChange={setMarketingCookies}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePreferences} className="w-full">
              Save Preferences
            </Button>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            For more information about cookies and how to manage them, visit{' '}
            <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
              aboutcookies.org
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}