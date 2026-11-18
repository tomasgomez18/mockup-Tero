import { useCallback, useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import AnnouncementBar from '@/components/announcementBar/AnnouncementBar'
import Logo from '@/components/logo/Logo'
import IconButton from '@/components/iconButton/IconButton'
import NavLinks from '@/components/navbar/NavLinks'
import AdminButton from '@/components/navbar/AdminButton'
import MobileMenu from '@/components/navbar/MobileMenu'
import SearchOverlay from '@/components/searchOverlay/SearchOverlay'
import { navItems } from '@/data/navItems'
import { useCart } from '@/hooks/useCart'
import { useScrolled } from '@/hooks/useScrolled'
import { openCart } from '@/state/cartStore'
import type { Ribbon } from '@/types/campaign'
import { cn } from '@/utils/cn'

interface NavbarProps {
  ribbon?: Ribbon | null
}

function Navbar({ ribbon }: NavbarProps) {
  const scrolled = useScrolled()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const handleResize = () => desktop.matches && setMenuOpen(false)
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    desktop.addEventListener('change', handleResize)
    window.addEventListener('keydown', handleKey)
    return () => {
      desktop.removeEventListener('change', handleResize)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  const floating = scrolled || menuOpen

  const handleOpenSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  const handleOpenCart = () => {
    setMenuOpen(false)
    openCart()
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {ribbon && (
          <div
            className={cn(
              'grid transition-[grid-template-rows] duration-500 ease-out',
              scrolled ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
            )}
          >
            <div className="overflow-hidden">
              <AnnouncementBar ribbon={ribbon} />
            </div>
          </div>
        )}

        <div
          className={cn(
            'flex justify-center transition-[padding] duration-500 ease-out',
            scrolled ? 'px-3 pt-3 sm:px-4 sm:pt-4' : 'px-0 pt-0',
          )}
        >
          <nav
            aria-label="Principal"
            className={cn(
              'w-full border transition-all duration-500 ease-out',
              scrolled
                ? 'max-w-5xl rounded-3xl border-neutral-200/70 bg-white/75 shadow-lg shadow-neutral-900/5 backdrop-blur-md md:rounded-[28px]'
                : 'max-w-full rounded-none border-transparent',
              !scrolled && (floating ? 'bg-white' : 'bg-white/0'),
            )}
          >
            <div
              className={cn(
                'mx-auto flex w-full max-w-7xl items-center justify-between gap-4 transition-all duration-500 ease-out',
                scrolled ? 'h-14 px-3 sm:px-4' : 'h-20 px-4 sm:px-6 lg:px-8',
              )}
            >
              <Logo className="pl-1" />

              <NavLinks items={navItems} className="hidden md:flex" />

              <div className="flex items-center gap-0.5">
                <AdminButton className="mr-1 hidden sm:inline-flex" />
                <IconButton label="Buscar" onClick={handleOpenSearch}>
                  <Search className="size-5" />
                </IconButton>
                <IconButton
                  label={
                    count > 0 ? `Carrito, ${count} ${count === 1 ? 'producto' : 'productos'}` : 'Carrito'
                  }
                  onClick={handleOpenCart}
                  className="relative"
                >
                  <ShoppingBag className="size-5" />
                  {count > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </IconButton>
                <IconButton
                  label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="md:hidden"
                >
                  {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </IconButton>
              </div>
            </div>

            <MobileMenu open={menuOpen} items={navItems} onNavigate={() => setMenuOpen(false)} />
          </nav>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  )
}

export default Navbar
