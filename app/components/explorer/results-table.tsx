'use client'

import { formatPrice, type Item, type Composition } from '@/app/lib/api'
import type { Mode } from './search-bar'

function isItemRow(row: Item | Composition): row is Item {
  return 'imageUrl' in row
}

function truncate(text: string | null, max: number): string {
  if (!text) return '—'
  return text.length > max ? text.slice(0, max) + '...' : text
}

interface ResultsTableProps {
  mode: Mode
  rows: (Item | Composition)[]
  loading: boolean
  showPriceColumn: boolean
  onRowClick: (row: Item | Composition) => void
}

export function ResultsTable({ mode, rows, loading, showPriceColumn, onRowClick }: ResultsTableProps) {
  const isItems = mode === 'items'
  const priceLabel = isItems ? 'Preço' : 'Custo Base'
  const colCount = 3 + (showPriceColumn ? 2 : 0) + (isItems ? 2 : 0)
  const visibleRows = rows.filter((row) => isItemRow(row) === isItems)

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap">Código</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900">Descrição</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap">Unidade</th>
            {showPriceColumn && (
              <>
                <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap">UF</th>
                <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-right font-semibold text-gray-900 whitespace-nowrap">{priceLabel}</th>
              </>
            )}
            {isItems && (
              <>
                <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 hidden lg:table-cell">Normas Técnicas</th>
                <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 hidden lg:table-cell">Informações Gerais</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={colCount} className="text-center py-12 text-gray-500">Buscando...</td>
            </tr>
          ) : visibleRows.length === 0 ? (
            <tr>
              <td colSpan={colCount} className="text-center py-12 text-gray-500">
                {isItems ? 'Nenhum insumo encontrado' : 'Nenhuma composição encontrada'}
              </td>
            </tr>
          ) : (
            visibleRows.map((row) => {
              const isItem = isItemRow(row)
              const price = isItem ? row.unitPrice : row.baseUnitCost
              return (
                <tr
                  key={`${mode}-${row.id}-${row.code}`}
                  onClick={() => onRowClick(row)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-2.5 font-mono font-semibold text-gray-900 whitespace-nowrap">{row.code}</td>
                  <td className="px-3 py-2.5 max-w-[400px]">{truncate(row.description, 80)}</td>
                  <td className="px-3 py-2.5">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">
                      {row.unit}
                    </span>
                  </td>
                  {showPriceColumn && (
                    <>
                      <td className="px-3 py-2.5 font-mono text-xs text-gray-700 whitespace-nowrap">{row.stateCode ?? '—'}</td>
                      <td className="px-3 py-2.5 font-mono text-right whitespace-nowrap text-gray-900">{formatPrice(price)}</td>
                    </>
                  )}
                  {isItems && isItem && (
                    <>
                      <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[200px] hidden lg:table-cell">{truncate(row.technicalStandards, 60)}</td>
                      <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[300px] hidden lg:table-cell">{truncate(row.generalInfo, 100)}</td>
                    </>
                  )}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
