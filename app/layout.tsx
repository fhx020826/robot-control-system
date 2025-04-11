import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import CompanyLogo from './components/CompanyLogo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '机器脑',
  description: '先进的人工智能控制系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="dark">
      <body className={`${inter.className} min-h-screen bg-gray-100 text-gray-800`}>
        <div className="flex flex-col h-screen">
          <header className="bg-white border-b border-blue-300 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
              <CompanyLogo />
              <Navigation />
            </div>
          </header>
          <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

