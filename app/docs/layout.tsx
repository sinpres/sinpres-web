import { source } from '@/app/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { ReactNode } from 'react'

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree()

  const treeWithOverview = {
    ...tree,
    children: [
      {
        type: 'page' as const,
        name: 'Visão Geral',
        url: '/docs',
      },
      { type: 'separator' as const, name: 'API Endpoints' },
      ...tree.children,
    ],
  }

  return (
    <DocsLayout
      tree={treeWithOverview}
      nav={{ title: 'Documentação SINPRES' }}
      themeSwitch={{ enabled: false }}
      searchToggle={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  )
}
