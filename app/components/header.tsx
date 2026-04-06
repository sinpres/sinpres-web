'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSearchContext } from 'fumadocs-ui/contexts/search'

function SearchButton() {
  const { setOpenSearch, enabled } = useSearchContext()

  if (!enabled) return null

  return (
    <button
      onClick={() => setOpenSearch(true)}
      className="hidden md:flex items-center gap-2 text-sm text-gray-400 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 min-w-[240px] transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      Pesquisar docs...
      <kbd className="ml-auto text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">⌘K</kbd>
    </button>
  )
}

function MobileSearchButton() {
  const { setOpenSearch, enabled } = useSearchContext()

  if (!enabled) return null

  return (
    <button
      onClick={() => setOpenSearch(true)}
      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Pesquisar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
  )
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/', label: 'Explorer', external: false },
  { href: '/docs', label: 'Docs', external: false },
  { href: 'https://github.com/sinpres/sinpres-api', label: 'GitHub', external: true },
  { href: 'https://tree.ia.br?utm_source=sinpres&utm_medium=web&utm_campaign=header', label: 'TREE.IA', external: true },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const linkClass = (path: string) =>
    isActive(path)
      ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-0.5'
      : 'text-gray-500 hover:text-gray-900 transition-colors'

  const mobileLinkClass = (path: string) =>
    isActive(path)
      ? 'block px-4 py-3 text-gray-900 font-medium bg-gray-50 rounded-lg'
      : 'block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'

  const isDocs = pathname.startsWith('/docs')

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isDocs && (
            <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
              <img src="/sinpres-logo-horizontal.svg" alt="SINPRES — Sistema Nacional de Preços Setoriais" className="h-10" width={120} height={40} />
            </Link>
          )}
          {isDocs && <SearchButton />}
        </div>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-5 text-sm">
          {NAV_LINKS.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile: search + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          {isDocs && <MobileSearchButton />}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav aria-label="Menu mobile" className="md:hidden border-t border-gray-100 px-4 py-3 space-y-1 bg-white">
          {NAV_LINKS.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span className="text-gray-400 text-xs ml-2">↗</span>
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={mobileLinkClass(href)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  )
}
