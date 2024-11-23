import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Blog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">All Posts</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} BARK Protocol. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://twitter.com/bark_protocol">Twitter</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com/bark-protocol">GitHub</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/rss.xml">RSS</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}