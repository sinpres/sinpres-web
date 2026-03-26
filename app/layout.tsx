import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import DefaultSearchDialog from 'fumadocs-ui/components/dialog/search-default'
import { Header } from '@/app/components/header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SINPRES — Sistema Nacional de Preços Setoriais',
  description: 'API pública e open-source para consulta de preços e insumos por setor da economia brasileira.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <RootProvider
          theme={{ defaultTheme: 'light', forcedTheme: 'light' }}
          search={{ SearchDialog: DefaultSearchDialog }}
        >
          <Header />
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
