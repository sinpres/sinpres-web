'use client'

import { useEffect, useState } from 'react'
import {
  formatPrice,
  getCompositionByCode,
  type Composition,
  type CompositionDetail,
} from '@/app/lib/api'

interface CompositionModalProps {
  composition: Composition | null
  state: string
  onClose: () => void
}

export function CompositionModal({ composition, state, onClose }: CompositionModalProps) {
  const [detail, setDetail] = useState<CompositionDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!composition) return

    document.body.style.overflow = 'hidden'

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)

    setDetail(null)
    setLoading(true)
    getCompositionByCode('civil-construction', composition.code, state ? { state } : {})
      .then((res) => setDetail(res.data))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false))

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [composition, state, onClose])

  if (!composition) return null

  const showPrices = !!state
  const items = detail?.items ?? []

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-start justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-4 sticky top-0 bg-white">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">
            <span className="text-gray-500 font-mono mr-2">#{composition.code}</span>
            {composition.description}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-1 text-2xl leading-none transition-colors"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Unidade</label>
              <p className="text-sm text-gray-900">{composition.unit}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">UF</label>
              <p className="text-sm text-gray-900">{composition.stateCode ?? 'Nacional'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mês</label>
              <p className="text-sm text-gray-900">{composition.referenceMonth ?? '—'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Custo Base</label>
              <p className="text-sm text-gray-900 font-mono">{formatPrice(composition.baseUnitCost)}</p>
            </div>
          </div>

          {composition.previousCode !== null && (
            <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-900">
              Esta composição substitui o código anterior <strong>#{composition.previousCode}</strong>.
            </div>
          )}

          <h3 className="text-sm font-semibold text-gray-900 mb-3">Insumos e sub-composições</h3>

          {loading ? (
            <p className="text-sm text-gray-500 py-8 text-center">Carregando itens...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">Nenhum item nesta composição.</p>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">Tipo</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">Código</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Descrição</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">Unid.</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700 whitespace-nowrap">Coef.</th>
                    {showPrices && (
                      <>
                        <th className="px-3 py-2 text-right font-semibold text-gray-700 whitespace-nowrap">Preço Unit.</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-700 whitespace-nowrap">Total</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={`${it.itemType}-${it.code}-${idx}`} className="border-t border-gray-100">
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          it.itemType === 'INPUT'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {it.itemType === 'INPUT' ? 'INSUMO' : 'COMPOSIÇÃO'}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{it.code}</td>
                      <td className="px-3 py-2 max-w-[400px]">{it.description}</td>
                      <td className="px-3 py-2 text-xs whitespace-nowrap">{it.unit}</td>
                      <td className="px-3 py-2 font-mono text-right whitespace-nowrap text-xs">{Number(it.coefficient).toFixed(4)}</td>
                      {showPrices && (
                        <>
                          <td className="px-3 py-2 font-mono text-right whitespace-nowrap text-xs">{formatPrice(it.unitPrice)}</td>
                          <td className="px-3 py-2 font-mono text-right whitespace-nowrap text-xs font-semibold">{formatPrice(it.totalPrice)}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!showPrices && (
            <p className="mt-3 text-xs text-gray-500">
              Selecione uma UF no filtro para ver os preços unitários e totais calculados (coeficiente × preço).
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
