'use client'

import type { PaginationMeta } from '@/app/lib/api'

interface PaginationProps {
  meta: PaginationMeta | null
  onPageChange: (page: number) => void
}

const btnBase = 'min-w-[36px] h-9 flex items-center justify-center text-sm border rounded-lg transition-colors'
const btnNormal = `${btnBase} bg-white text-gray-900 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-default`
const btnActive = `${btnBase} bg-gray-900 text-white border-gray-900`

export function Pagination({ meta, onPageChange }: PaginationProps) {
  if (!meta || meta.totalPages <= 1) return null

  const { page, totalPages } = meta

  // Show fewer pages on mobile
  const range = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2
  const start = Math.max(1, page - range)
  const end = Math.min(totalPages, page + range)

  const pages: number[] = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4">
      <button onClick={() => onPageChange(1)} disabled={page <= 1} className={btnNormal}>
        &laquo;
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className={btnNormal}>
        &lsaquo;
      </button>

      {start > 1 && <span className="text-sm text-gray-400 px-1">...</span>}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? btnActive : btnNormal}
        >
          {p}
        </button>
      ))}

      {end < totalPages && <span className="text-sm text-gray-400 px-1">...</span>}

      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className={btnNormal}>
        &rsaquo;
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} className={btnNormal}>
        &raquo;
      </button>
    </div>
  )
}
