'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    setShowScrollToTop(scrollTop > 200)
  }

  const scrollToTop = () => {
    document.getElementById('privacy-policy-top')?.scrollIntoView({ behavior: 'smooth' })
  }

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'data-collection', title: 'Data We Collect' },
    { id: 'data-usage', title: 'How We Use Your Data' },
    { id: 'blockchain-data', title: 'Blockchain Data' },
    { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'user-rights', title: 'Your Legal Rights' },
    { id: 'cookies', title: 'Cookies and Tracking Technologies' },
    { id: 'changes', title: 'Changes to This Privacy Policy' },
    { id: 'contact', title: 'Contact Us' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle id="privacy-policy-top" className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <nav className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="text-sm hover:underline">
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <ScrollArea className="h-[600px] md:col-span-3 pr-4" onScrollCapture={handleScroll}>
              <div className="space-y-8">
                <section id="introduction">
                  <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                  <p>Welcome to BARK Protocol. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you use our blockchain-based services and tell you about your privacy rights and how the law protects you.</p>
                </section>

                <section id="data-collection">
                  <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                  <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and blockchain wallet addresses.</li>
                    <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our website.</li>
                    <li><strong>Transaction Data:</strong> includes details about payments to and from you, and other details of products and services you have purchased or traded using our platform.</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                  </ul>
                </section>

                <section id="data-usage">
                  <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
                  <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>To register you as a new user of our platform.</li>
                    <li>To process and facilitate blockchain transactions.</li>
                    <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
                    <li>To administer and protect our business and this website.</li>
                    <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
                    <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences.</li>
                  </ul>
                </section>

                <section id="blockchain-data">
                  <h2 className="text-2xl font-bold mb-4">4. Blockchain Data</h2>
                  <p>Please note that due to the nature of blockchain technology, transactions you submit through our services will be publicly visible on the blockchain. This includes:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Transaction amounts</li>
                    <li>Wallet addresses involved in the transaction</li>
                    <li>Time and date of the transaction</li>
                  </ul>
                  <p className="mt-2">While this data is pseudonymous, it may be possible for third parties to associate your blockchain activity with your identity.</p>
                </section>

                <section id="data-sharing">
                  <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
                  <p>We may share your personal data with:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Service providers who provide IT and system administration services.</li>
                    <li>Professional advisers including lawyers, bankers, auditors and insurers.</li>
                    <li>Regulators and other authorities who require reporting of processing activities in certain circumstances.</li>
                    <li>Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets.</li>
                  </ul>
                  <p className="mt-2">We require all third parties to respect the security of your personal data and to treat it in accordance with the law.</p>
                </section>

                <section id="data-security">
                  <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                  <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. These include:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Encryption of sensitive data at rest and in transit.</li>
                    <li>Regular security assessments and penetration testing.</li>
                    <li>Access controls and authentication mechanisms.</li>
                    <li>Continuous monitoring for potential security threats.</li>
                  </ul>
                  <p className="mt-2">We have procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
                </section>

                <section id="user-rights">
                  <h2 className="text-2xl font-bold mb-4">7. Your Legal Rights</h2>
                  <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="access">
                      <AccordionTrigger>Request access to your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can request a copy of the personal data we hold about you.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="correction">
                      <AccordionTrigger>Request correction of your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can ask us to correct any incomplete or inaccurate data we hold about you.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="erasure">
                      <AccordionTrigger>Request erasure of your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can ask us to delete or remove personal data where there is no good reason for us continuing to process it.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="restriction">
                      <AccordionTrigger>Request restriction of processing your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can ask us to suspend the processing of your personal data in certain scenarios.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="transfer">
                      <AccordionTrigger>Request transfer of your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can request the transfer of your personal data to you or to a third party.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="object">
                      <AccordionTrigger>Object to processing of your personal data</AccordionTrigger>
                      <AccordionContent>
                        You can object to processing of your personal data where we are relying on a legitimate interest.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                <section id="cookies">
                  <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
                  <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                  <Button variant="outline" className="mt-2" asChild>
                    <Link href="/cookies">View Cookie Policy</Link>
                  </Button>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.</p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                  <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                  <p className="mt-2"><strong>Email:</strong> privacy@stormprotocol.co</p>
                  <p><strong>Address:</strong> 123 Solana Street, Storm City, CC 12345</p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      {showScrollToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}