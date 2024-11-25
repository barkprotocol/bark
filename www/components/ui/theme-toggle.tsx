"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ThemeOption = {
  value: string
  label: string
  icon: React.ReactNode
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
  { value: "system", label: "System", icon: <Laptop className="h-4 w-4" /> },
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="w-9 h-9 rounded-md bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 border-primary/10"
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-36 bg-background shadow-md"
      >
        {themeOptions.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => setTheme(option.value)}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            {React.cloneElement(option.icon as React.ReactElement, { 
              className: "mr-2 h-4 w-4",
              "aria-hidden": "true"
            })}
            <span>{option.label}</span>
            {theme === option.value && (
              <span className="sr-only">(current)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}