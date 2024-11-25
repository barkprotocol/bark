'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { WalletButton } from "@/components/ui/wallet-button"
import { Menu, X, ChevronDown, Rocket } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Logo from "@/components/ui/layout/logo"

type NavItem = {
  name: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/pages/about' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Services', href: '/services' },
  { 
    name: 'Products', 
    href: '/products',
    children: [
      { name: 'DeFi', href: '/defi' },
      { name: 'Swap', href: '/swap' },
      { name: 'Payments', href: '/payments' },
      { name: 'marketplace', href: '/marketplace' },
      { name: 'clubs', href: '/clubs' },
      { name: 'Governance', href: '/governance' },
    ]
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const scrollListener = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20)
      })
    }
    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  useEffect(() => {
    return handleScroll()
  }, [handleScroll])

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
    {
      'bg-white dark:bg-black shadow-md': isScrolled,
      'bg-white/80 dark:bg-black/80 backdrop-blur-sm': !isScrolled
    }
  )

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} pathname={pathname} />
              ))}
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <WalletButton />
              <LaunchAppButton />
              <ThemeToggle />
            </div>
            <MobileMenuToggle 
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </div>
      <MobileMenu 
        navItems={navItems} 
        pathname={pathname} 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </header>
  )
}

function NavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const linkClasses = "transition-colors duration-300 flex items-center text-base font-medium text-gray-800 dark:text-gray-200 hover:text-[#BBA597] dark:hover:text-[#BBA597]"

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={linkClasses}>
          {item.name}
          <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          {item.children.map((child) => (
            <DropdownMenuItem key={child.name} asChild>
              <Link href={child.href} className="text-gray-800 dark:text-gray-200 hover:text-[#BBA597] dark:hover:text-[#BBA597] block px-4 py-2">
                {child.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href={item.href} className={linkClasses}>
      {item.name}
    </Link>
  )
}

function MobileMenuToggle({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-200 hover:text-[#BBA597] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#BBA597]"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
    >
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  )
}

function MobileMenu({ navItems, pathname, isOpen, setIsOpen }: { navItems: NavItem[]; pathname: string; isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        'lg:hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      )}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black">
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} pathname={pathname} setIsOpen={setIsOpen} />
        ))}
        <div className="mt-4 flex flex-col space-y-2">
          <WalletButton />
          <LaunchAppButton />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

function MobileNavItem({ item, pathname, setIsOpen }: { item: NavItem; pathname: string; setIsOpen: (isOpen: boolean) => void }) {
  const linkClasses = "block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-[#BBA597] dark:hover:text-[#BBA597]"

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={linkClasses}>
          {item.name}
          <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          {item.children.map((child) => (
            <DropdownMenuItem key={child.name} asChild>
              <Link href={child.href} className="text-gray-800 dark:text-gray-200 hover:text-[#BBA597] dark:hover:text-[#BBA597] block px-4 py-2" onClick={() => setIsOpen(false)}>
                {child.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href={item.href} className={linkClasses} onClick={() => setIsOpen(false)}>
      {item.name}
    </Link>
  )
}

function LaunchAppButton() {
  return (
    <Button 
      asChild 
      variant="default" 
      size="icon"
      className="bg-[#BBA597] text-white hover:bg-[#A8917F] transition-colors duration-300"
    >
      <Link href="https://app.barkprotocol.net" aria-label="Launch App">
        <Rocket className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Launch App</span>
      </Link>
    </Button>
  )
}

export default Header