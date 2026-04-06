import type { MetadataRoute } from 'next'

const siteUrl = 'https://sinpres.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  let docPages: MetadataRoute.Sitemap = []
  try {
    const { source } = await import('@/app/lib/source')
    docPages = source.getPages().map((page) => ({
      url: `${siteUrl}/docs/${page.slugs.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // OpenAPI schema unavailable at build time — static routes only
  }

  return [...staticRoutes, ...docPages]
}
