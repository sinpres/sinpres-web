'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchBar } from '@/app/components/explorer/search-bar'
import { ItemsTable } from '@/app/components/explorer/items-table'
import { Pagination } from '@/app/components/explorer/pagination'
import { ItemModal } from '@/app/components/explorer/item-modal'
import { getItems, type Item, type PaginationMeta } from '@/app/lib/api'

export default function ExplorerPage() {
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('')
  const [limit, setLimit] = useState(50)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Item[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getItems('civil-construction', {
        search: query || undefined,
        unit: unit || undefined,
        page,
        limit,
      })
      setItems(res.data)
      setMeta(res.meta)
    } catch {
      setItems([])
      setMeta(null)
    } finally {
      setLoading(false)
    }
  }, [query, unit, page, limit])

  useEffect(() => {
    const timer = setTimeout(fetchData, 300)
    return () => clearTimeout(timer)
  }, [fetchData])

  function handleQueryChange(q: string) {
    setQuery(q)
    setPage(1)
  }

  function handleUnitChange(u: string) {
    setUnit(u)
    setPage(1)
  }

  function handleLimitChange(l: number) {
    setLimit(l)
    setPage(1)
  }

  function handlePageChange(p: number) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Consulta de Preços e Insumos</h1>
          <p className="text-sm text-gray-500 mt-1">Base de dados pública do SINAPI — Construção Civil</p>
        </div>

        <SearchBar
          query={query}
          unit={unit}
          limit={limit}
          onQueryChange={handleQueryChange}
          onUnitChange={handleUnitChange}
          onLimitChange={handleLimitChange}
        />

        <ItemsTable
          items={items}
          loading={loading}
          onItemClick={setSelectedItem}
        />

        {meta && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            <strong className="text-gray-900">{meta.total.toLocaleString('pt-BR')}</strong> itens encontrados
            {' \u2014 '}Página <strong className="text-gray-900">{meta.page}</strong> de <strong className="text-gray-900">{meta.totalPages}</strong>
          </p>
        )}

        <Pagination meta={meta} onPageChange={handlePageChange} />

        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </main>
  )
}
