import React from 'react';
import { Viewport } from "next";
import { GeistSans } from "geist/font/sans";

// Metadata
import { metadata } from './metadata';

// Components
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";

// Providers
import { ThemeProvider } from "@/components/ui/theme-provider";
import { WalletContextProvider } from "@/components/ui/wallet-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

// Styles
import "./styles/globals.css";

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.className} h-full`} suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-1000 text-foreground min-h-screen flex flex-col">
        <WalletContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 w-full max-w-[1920px] mx-auto px-2 sm:px-2 lg:px-0 pt-20" role="main">
                  {children}
                </main>
                <Footer />
                <div className="text-center py-4 text-sm">
                  © {new Date().getFullYear()} BARK Protocol. All rights reserved.
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
}
