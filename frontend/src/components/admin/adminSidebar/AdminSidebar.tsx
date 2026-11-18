import { Link, NavLink } from 'react-router'
import { ExternalLink, LogOut } from 'lucide-react'
import { adminNavItems } from '@/data/adminNavItems'
import { useAuth } from '@/hooks/useAuth'
import { useStoreContent } from '@/hooks/useStoreContent'
import { logout } from '@/state/authStore'
import { cn } from '@/utils/cn'

interface AdminSidebarProps {
  className?: string
  onNavigate?: () => void
}

function AdminSidebar({ className, onNavigate }: AdminSidebarProps) {
  const { storeInfo } = useStoreContent()
  const { email } = useAuth()

  return (
    <aside className={cn('flex h-full flex-col bg-brand-950 text-neutral-400', className)}>
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          to="/admin"
          onClick={onNavigate}
          className="text-lg font-semibold tracking-[0.25em] text-white uppercase"
        >
          {storeInfo.name}
        </Link>
        <p className="mt-1 text-xs text-neutral-500">Panel de administración</p>
      </div>

      <nav aria-label="Panel" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {adminNavItems.map(({ label, to, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-thumb px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-white text-neutral-900' : 'hover:bg-white/10 hover:text-white',
                  )
                }
              >
                <Icon className="size-[18px]" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-3 rounded-thumb px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="size-[18px]" />
          Ver tienda
        </a>
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="truncate text-xs text-neutral-500">{email}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
