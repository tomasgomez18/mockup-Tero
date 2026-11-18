import { AnimatePresence, motion } from 'motion/react'
import { NavLink } from 'react-router'
import type { NavItem } from '@/types/navigation'
import AdminButton from '@/components/navbar/AdminButton'
import { cn } from '@/utils/cn'

interface MobileMenuProps {
  open: boolean
  items: NavItem[]
  onNavigate: () => void
}

function MobileMenu({ open, items, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden md:hidden"
        >
          <ul className="flex flex-col gap-1 border-t border-neutral-200/70 px-4 py-4">
            {items.map((item, index) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-900/5',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </motion.li>
            ))}
            <li className="px-1 pt-2 sm:hidden"><AdminButton onClick={onNavigate} className="h-11 w-full justify-center" /></li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
