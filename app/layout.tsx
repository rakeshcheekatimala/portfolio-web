import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Cursor from '@components/Cursor'

const siteUrl = 'https://www.rakeshcheekatimala.com'
const title = 'Rakesh Cheekatimala - Senior Software Engineer, Platforms & Applied AI'
const description =
  'Senior software engineer in Singapore building performance-focused web platforms, payments flows, eKYC systems, and developer tooling.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Rakesh Cheekatimala',
    type: 'website',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@RCheekatim12238',
    images: ['/images/og.jpg'],
  },
  icons: { icon: '/favicon.svg' },
}

// Runs before paint so the first frame already has the right palette.
const themeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('portfolio-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  } catch (_) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Cursor />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
