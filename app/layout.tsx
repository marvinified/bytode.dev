import './global.css'
import type { Metadata } from 'next'
import { Zain } from 'next/font/google'
import { Fustat } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { EasterEggs, SourceCodeHint } from './components/easter-eggs'
import { baseUrl } from './sitemap'

const zain = Zain({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-zain',
  display: 'swap',
})

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fustat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'I\'m Marvin',
    template: '%s | I\'m Marvin',
  },
  description: 'I build software mostly around AI, automation, and agents. Currently building Stagerun.',
  openGraph: {
    title: 'I\'m Marvin',
    description: 'I build software mostly around AI, automation, and agents. Currently building Stagerun.',
    url: baseUrl,
    siteName: 'I\'m Marvin',
    locale: 'en_US',
    type: 'website',
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
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        zain.variable,
        fustat.variable
      )}
    >
      <body className={`antialiased px-4 h-dvh pt-8 ${fustat.className}`}>
        <SourceCodeHint />
        <main className="flex-auto max-w-[520px] mx-auto flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <EasterEggs />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
