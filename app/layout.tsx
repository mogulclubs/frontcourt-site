import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans-bundled',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-bundled',
  display: 'swap',
})

const SITE_URL = 'https://frontcourt.ca'
const SITE_NAME = 'Frontcourt'
const SITE_DESCRIPTION =
  'Frontcourt is the sports facility intelligence platform — operational software for clubs, courts, and academies. Currently in private beta.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Frontcourt — Sports Facility Intelligence Platform',
    template: '%s · Frontcourt',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Frontcourt' }],
  generator: 'Next.js',
  keywords: [
    'sports facility software',
    'pickleball facility management',
    'club operations platform',
    'court booking software',
    'facility intelligence',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Frontcourt — Sports Facility Intelligence Platform',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontcourt — Sports Facility Intelligence Platform',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
}

export const viewport: Viewport = {
  themeColor: '#0a0e14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
