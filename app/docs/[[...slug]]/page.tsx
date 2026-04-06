import { source } from '@/app/lib/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page'
import { notFound } from 'next/navigation'
import { APIPage } from '@/app/components/api-page'
import { getReadmeData } from '@/app/components/readme-page'
import type { Metadata } from 'next'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params

  // /docs (no slug) → show README inside DocsPage layout with TOC
  if (!params.slug || params.slug.length === 0) {
    // getReadmeData() returns sanitized HTML + TOC extracted from markdown headings
    const { html, toc } = await getReadmeData()
    return (
      <DocsPage toc={toc}>
        <DocsTitle>Visão Geral</DocsTitle>
        <DocsDescription>Documentação da API SINPRES</DocsDescription>
        <DocsBody>
          <article
            className="docs-readme prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-gray-900 prose-a:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </DocsBody>
      </DocsPage>
    )
  }

  const page = source.getPage(params.slug)
  if (!page) notFound()

  return (
    <DocsPage toc={page.data.toc} full>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <APIPage {...page.data.getAPIPageProps()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return [{ slug: [] }, ...source.generateParams()]
}

const siteUrl = 'https://sinpres.com.br'

export async function generateMetadata(
  props: { params: Promise<{ slug?: string[] }> },
): Promise<Metadata> {
  const params = await props.params

  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Documentação da API',
      description:
        'Documentação completa da API SINPRES. Endpoints, exemplos de uso e referência técnica para consulta de preços e insumos do SINAPI.',
      alternates: {
        canonical: `${siteUrl}/docs`,
      },
      openGraph: {
        title: 'SINPRES — Documentação da API',
        description: 'Referência técnica completa da API pública SINPRES para consulta de preços do SINAPI.',
        url: `${siteUrl}/docs`,
      },
    }
  }

  const page = source.getPage(params.slug)
  if (!page) notFound()

  const pageUrl = `${siteUrl}/docs/${params.slug.join('/')}`

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.data.title} | SINPRES Docs`,
      description: page.data.description,
      url: pageUrl,
    },
  }
}
