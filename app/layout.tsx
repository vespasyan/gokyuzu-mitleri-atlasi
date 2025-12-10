import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import AnalyticsTracker from '@/components/AnalyticsTracker'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://gokyuzu-mitleri-atlasi.com' : 'http://localhost:3000'),
  title: {
    default: 'Gökyüzü Mitleri Atlası',
    template: '%s | Gökyüzü Mitleri Atlası'
  },
  description: 'Türk mitolojisindeki yıldız hikayeleri ve çağdaş sanat yorumları ile interaktif gökyüzü deneyimi',
  keywords: ['türk mitolojisi', 'yıldızlar', 'astronomi', 'gökyüzü', 'efsaneler', 'sanat'],
  authors: [{ name: 'Gökyüzü Mitleri Atlası Ekibi' }],
  creator: 'Gökyüzü Mitleri Atlası',
  publisher: 'Gökyüzü Mitleri Atlası',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://gokyuzu-mitleri-atlasi.com',
    title: 'Gökyüzü Mitleri Atlası',
    description: 'Türk mitolojisindeki yıldız hikayeleri ve çağdaş sanat yorumları ile interaktif gökyüzü deneyimi',
    siteName: 'Gökyüzü Mitleri Atlası',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gökyüzü Mitleri Atlası - Türk Mitolojisi ve Astronomi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gökyüzü Mitleri Atlası',
    description: 'Türk mitolojisindeki yıldız hikayeleri ve çağdaş sanat yorumları ile interaktif gökyüzü deneyimi',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen bg-dark-500 text-white antialiased">
        <AnalyticsTracker />
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}