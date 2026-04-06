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

const siteUrl = 'https://sinpres.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SINPRES — Consulta de Preços e Insumos do SINAPI',
    template: '%s | SINPRES',
  },
  description:
    'Consulte preços e insumos do SINAPI gratuitamente. API pública e open-source com dados da construção civil brasileira pelo IBGE e Caixa.',
  keywords: [
    'SINAPI',
    'preços construção civil',
    'insumos construção',
    'API SINAPI',
    'SINPRES',
    'preços setoriais',
    'tabela SINAPI',
    'custos construção',
    'IBGE',
    'Caixa Econômica Federal',
    'orçamento obras',
    'composições SINAPI',
    'índices construção civil',
    'consulta SINAPI online',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'SINPRES',
    title: 'SINPRES — Consulta de Preços e Insumos do SINAPI',
    description:
      'Consulte preços e insumos do SINAPI gratuitamente. API pública para a construção civil brasileira.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SINPRES — Sistema Nacional de Preços Setoriais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SINPRES — Consulta de Preços e Insumos do SINAPI',
    description:
      'API pública para consulta de preços da construção civil brasileira. Dados do SINAPI atualizados.',
    images: ['/og-image.png'],
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
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#app`,
      name: 'SINPRES',
      alternateName: 'Sistema Nacional de Preços Setoriais',
      description:
        'API pública e open-source para consulta de preços e insumos do SINAPI por setor da economia brasileira.',
      url: siteUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
      creator: {
        '@type': 'Organization',
        name: 'SINPRES',
        url: siteUrl,
      },
    },
    {
      '@type': 'Dataset',
      '@id': `${siteUrl}/#dataset`,
      name: 'SINAPI — Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil',
      description:
        'Base de dados pública de preços, insumos e composições da construção civil brasileira, mantida pelo IBGE e pela Caixa Econômica Federal.',
      url: siteUrl,
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      inLanguage: 'pt-BR',
      creator: {
        '@type': 'GovernmentOrganization',
        name: 'IBGE / Caixa Econômica Federal',
      },
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://api.sinpres.com.br/api/v1',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'SINPRES',
      inLanguage: 'pt-BR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
