import { Metadata } from 'next'
import Clubs from '@/components/clubs/clubs'
import Features from '@/components/ui/layout/features'
import Header from '@/components/ui/layout/header'
import Footer from '@/components/ui/layout/footer'

export const metadata: Metadata = {
  title: 'BARK Members Club | Underdogs & Peaky Barkers',
  description: 'Join the BARK Members Club and choose between the Underdogs or the meme-loving Peaky Barkers!',
}

export default function MembersClubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Features />
        <Clubs />
      </main>
      <Footer />
    </div>
  )
}