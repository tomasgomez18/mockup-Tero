import { NavLink } from 'react-router'
import type { NavItem } from '@/types/navigation'
import { cn } from '@/utils/cn'

interface NavLinksProps {
  items: NavItem[]
  className?: string
}

function NavLinks({ items, className }: NavLinksProps) {
  return (
    <ul className={cn('items-center gap-1', className)}>
      {items.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900',
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
