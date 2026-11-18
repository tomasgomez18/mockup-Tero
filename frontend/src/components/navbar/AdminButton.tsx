import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/utils/cn'

interface AdminButtonProps {
  className?: string
  onClick?: () => void
}

function AdminButton({ className, onClick }: AdminButtonProps) {
  return (
    <Link
      to="/admin"
      onClick={onClick}
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-full border border-brand-600 px-3 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white',
        className,
      )}
    >
      <LayoutDashboard className="size-4" />
      Admin
    </Link>
  )
}

export default AdminButton
