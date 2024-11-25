import React from 'react'
import { Bone, BarChart2, FileText, Users, Settings } from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
  { icon: BarChart2, label: 'Overview', href: '/governance' },
  { icon: FileText, label: 'Proposals', href: '/governance/proposals' },
  { icon: Users, label: 'Delegation', href: '/governance/delegation' },
  { icon: Settings, label: 'Settings', href: '/governance/settings' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Bone className="h-8 w-8 text-brown-[#D0BFB4]" />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">BARK Governance</span>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brown-[#D0BFB4] transition-colors duration-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

