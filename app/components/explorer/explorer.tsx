'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchBar, type Mode } from '@/app/components/explorer/search-bar'
import { ResultsTable } from '@/app/components/explorer/results-table'
import { Pagination } from '@/app/components/explorer/pagination'
import { ItemModal } from '@/app/components/explorer/item-modal'
import { CompositionModal } from '@/app/components/explorer/composition-modal'
import {
  getItems,
  getCompositions,
  type Item,
  type Composition,
  type PaginationMeta,
} from '@/app/lib/api'

export function Explorer() {
  const [mode, setMode] = useState<Mode>('items')
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('')
  const [state, setState] = useState('') // '' = Nacional
  const [limit, setLimit] = useState(50)
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<(Item | Composition)[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [selectedComposition, setSelectedComposition] = useState<Composition | null>(null)

  const closeItemModal = useCallback(() => setSelectedItem(null), [])
  const closeCompositionModal = useCallback(() => setSelectedComposition(null), [])

  useEffect(() => {
    let ignore = false

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const params = {
          search: query || undefined,
          unit: unit || undefined,
          state: state || undefined,
          page,
          limit,
        }
        const res = mode === 'items'
          ? await getItems('civil-construction', params)
          : await getCompositions('civil-construction', params)

        if (ignore) return

        setRows(res.data)
        setMeta(res.meta)
      } catch {
        if (ignore) return

        setRows([])
        setMeta(null)
      } finally {
        if (!ignore) setLoading(false)
      }
    }, 300)

    return () => {
      ignore = true
      clearTimeout(timer)
    }
  }, [mode, query, unit, state, page, limit])

  function handleModeChange(m: Mode) {
    if (m === mode) return

    setMode(m)
    setPage(1)
    setUnit('') // unit lists differ between items/compositions
    setRows([])
    setMeta(null)
    setLoading(true)
    setSelectedItem(null)
    setSelectedComposition(null)
  }

  function handleQueryChange(q: string) {
    setQuery(q)
    setPage(1)
  }

  function handleUnitChange(u: string) {
    setUnit(u)
    setPage(1)
  }

  function handleStateChange(s: string) {
    setState(s)
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

  function handleRowClick(row: Item | Composition) {
    if (mode === 'items') setSelectedItem(row as Item)
    else setSelectedComposition(row as Composition)
  }

  const showPriceColumn = !!state // só mostra preço quando UF selecionada

  const totalLabel = mode === 'items' ? 'insumos encontrados' : 'composições encontradas'

  return (
    <>
      <SearchBar
        mode={mode}
        query={query}
        unit={unit}
        state={state}
        limit={limit}
        onModeChange={handleModeChange}
        onQueryChange={handleQueryChange}
        onUnitChange={handleUnitChange}
        onStateChange={handleStateChange}
        onLimitChange={handleLimitChange}
      />

      <ResultsTable
        mode={mode}
        rows={rows}
        loading={loading}
        showPriceColumn={showPriceColumn}
        onRowClick={handleRowClick}
      />

      {meta && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          <strong className="text-gray-900">{meta.total.toLocaleString('pt-BR')}</strong> {totalLabel}
          {' — '}Página <strong className="text-gray-900">{meta.page}</strong> de <strong className="text-gray-900">{meta.totalPages}</strong>
          {!state && (
            <span className="block text-xs text-gray-400 mt-1">
              Selecione uma UF para ver preços
            </span>
          )}
        </p>
      )}

      <Pagination meta={meta} onPageChange={handlePageChange} />

      <ItemModal item={selectedItem} onClose={closeItemModal} />
      <CompositionModal
        composition={selectedComposition}
        state={state}
        onClose={closeCompositionModal}
      />
    </>
  )
}
