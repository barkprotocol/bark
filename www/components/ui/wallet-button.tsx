'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WalletButton() {
  const { publicKey, wallet, disconnect, select, wallets, connecting } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const buttonClasses = "bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800"

  if (publicKey) {
    return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`${buttonClasses} px-3 sm:px-4`}>
            <Wallet className="h-[1.2rem] w-[1.2rem] text-primary" />
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-58 bg-background/80 backdrop-blur-sm">
          <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
          <DropdownMenuItem>
            {publicKey.toBase58()}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (connecting) {
    return (
      <Button disabled className={`${buttonClasses} px-3 sm:px-4`}>
        <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin text-primary" />
        <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm">Connecting</span>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${buttonClasses} px-3 sm:px-4`}>
          <Wallet className="h-[1.2rem] w-[1.2rem] text-primary" />
          <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm">Connect</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-58 bg-background/80 backdrop-blur-sm">
        {wallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.adapter.name}
            onClick={() => {
              select(wallet.adapter.name)
              setIsDropdownOpen(false)
            }}
          >
            {wallet.adapter.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}