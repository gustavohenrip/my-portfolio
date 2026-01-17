import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050508',
}

export const metadata: Metadata = {
  title: 'Monayzera | Full-Stack Developer',
  description: 'Portfolio of Monayzera - Full-Stack Developer specialized in Flutter and ReactJS. Transforming complex problems into fluid digital solutions.',
  keywords: ['developer', 'portfolio', 'flutter', 'reactjs', 'full-stack', 'mobile', 'web'],
  authors: [{ name: 'Monayzera' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml', sizes: '180x180' }
    ]
  },
  openGraph: {
    title: 'Monayzera | Full-Stack Developer',
    description: 'Transforming complex problems into fluid digital solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} dark`} suppressHydrationWarning>
      <body className="bg-background text-foreground overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
