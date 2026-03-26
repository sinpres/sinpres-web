'use client'

import type { Item } from '@/app/lib/api'

function truncate(text: string | null, max: number): string {
  if (!text) return '\u2014'
  return text.length > max ? text.slice(0, max) + '...' : text
}

interface ItemsTableProps {
  items: Item[]
  loading: boolean
  onItemClick: (item: Item) => void
}

export function ItemsTable({ items, loading, onItemClick }: ItemsTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap">Código</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900">Descrição</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap">Unidade</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 hidden lg:table-cell">Normas Técnicas</th>
            <th className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 hidden lg:table-cell">Informações Gerais</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-500">Buscando...</td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-500">Nenhum item encontrado</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onItemClick(item)}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-3 py-2.5 font-mono font-semibold text-gray-900 whitespace-nowrap">{item.code}</td>
                <td className="px-3 py-2.5 max-w-[400px]">{truncate(item.description, 80)}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {item.unit}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[200px] hidden lg:table-cell">{truncate(item.technicalStandards, 60)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[300px] hidden lg:table-cell">{truncate(item.generalInfo, 100)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
