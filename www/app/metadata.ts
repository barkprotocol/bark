import { Metadata } from "next";

// Constants
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SECONDARY_URL || "https://barkprotocol.net";

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "BARK - Innovative Blockchain Ecosystem",
    template: "%b | BARK Protocol"
  },
  description: "Brace Yourself for the Most Impactful and Innovative ecosystem on the Solana Blockchain!",
  keywords: ["BARK", "blockchain", "ecosystem", "cryptocurrency", "innovation"],
  authors: [{ name: "BARK Protocol" }],
  creator: "BARK Protocol",
  openGraph: {
    title: "BARK - Innovative Blockchain Ecosystem",
    description: "Brace Yourself for the Most Impactful and Innovative ecosystem on the Solana Blockchain!",
    url: defaultUrl,
    siteName: "BARK",
    images: [
      {
        url: `${defaultUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BARK Protocol Banner",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BARK - Innovative Blockchain Ecosystem",
    description: "Brace Yourself for the Most Impactful and Innovative ecosystem on the Blockchain!",
    creator: "@bark_protocol",
    images: [`${defaultUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${defaultUrl}/site.webmanifest`,
};