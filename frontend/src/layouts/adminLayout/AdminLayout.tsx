import { Suspense, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router'
import { Menu, X } from 'lucide-react'
import AdminSidebar from '@/components/admin/adminSidebar/AdminSidebar'
import IconButton from '@/components/iconButton/IconButton'
import PageLoader from '@/components/pageLoader/PageLoader'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import Toaster from '@/components/toaster/Toaster'
import { useAuth } from '@/hooks/useAuth'
import { useStoreContent } from '@/hooks/useStoreContent'

function AdminLayout() {
  const { isAuthenticated } = useAuth()
  const { storeInfo } = useStoreContent()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <ScrollToTop />
      <AdminSidebar className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen" />

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
        <Link to="/admin" className="text-base font-semibold tracking-[0.25em] uppercase">
          {storeInfo.name}
        </Link>
        <IconButton label="Abrir menú" onClick={() => setMenuOpen(true)}>
          <Menu className="size-5" />
        </IconButton>
      </header>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú del panel"
          onClick={(event) => event.target === event.currentTarget && setMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        >
          <div className="relative h-full w-72 max-w-[85%]">
            <AdminSidebar onNavigate={() => setMenuOpen(false)} />
            <IconButton
              label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-3 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </IconButton>
          </div>
        </div>
      )}

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <Toaster />
    </div>
  )
}

export default AdminLayout
