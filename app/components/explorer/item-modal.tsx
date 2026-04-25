'use client'

import { useEffect } from 'react'
import { API_URL, formatPrice, type Item } from '@/app/lib/api'

interface ItemModalProps {
  item: Item | null
  onClose: () => void
}

export function ItemModal({ item, onClose }: ItemModalProps) {
  useEffect(() => {
    if (!item) return

    document.body.style.overflow = 'hidden'

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-start justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-4 sticky top-0 bg-white">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">
            <span className="text-gray-500 font-mono mr-2">#{item.code}</span>
            {item.description}
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
          {item.imageUrl ? (
            <img
              src={item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}/${item.imageUrl}`}
              alt={item.description}
              className="w-full max-h-72 object-contain bg-gray-50 rounded-lg border border-gray-200 mb-5"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement?.insertAdjacentHTML(
                  'beforeend',
                  '<div class="w-full h-28 bg-gray-50 rounded-lg border border-gray-200 mb-5 flex items-center justify-center text-sm text-gray-500">Imagem indisponível</div>'
                )
              }}
            />
          ) : (
            <div className="w-full h-28 bg-gray-50 rounded-lg border border-gray-200 mb-5 flex items-center justify-center text-sm text-gray-500">
              Sem imagem
            </div>
          )}

          {item.previousCode !== null && (
            <div className="mb-5 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-900">
              Este insumo substitui o código anterior <strong>#{item.previousCode}</strong>.
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Unidade</label>
              <p className="text-sm text-gray-900">{item.unit}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">UF</label>
              <p className="text-sm text-gray-900">{item.stateCode ?? 'Nacional'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mês</label>
              <p className="text-sm text-gray-900">{item.referenceMonth ?? '—'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Preço</label>
              <p className="text-sm text-gray-900 font-mono">{formatPrice(item.unitPrice)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Atualizado em</label>
              <p className="text-sm text-gray-900">{item.sourceUpdatedAt || '—'}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Descrição</label>
              <p className="text-sm text-gray-900 leading-relaxed">{item.description}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Normas Técnicas</label>
              <p className="text-sm text-gray-900 leading-relaxed">{item.technicalStandards || '—'}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Informações Gerais</label>
              <p className="text-sm text-gray-900 leading-relaxed">{item.generalInfo || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
