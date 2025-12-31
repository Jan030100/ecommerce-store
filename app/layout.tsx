import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextShop - E-commerce Store',
  description: 'A modern e-commerce store built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="mt-12 border-t bg-white py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2026 Shoply. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Learning project — not for commercial use
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
