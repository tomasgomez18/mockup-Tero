import { Link } from 'react-router'
import { useStoreContent } from '@/hooks/useStoreContent'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  to?: string
}

function Logo({ className, to = '/' }: LogoProps) {
  const { storeInfo } = useStoreContent()

  return (
    <Link
      to={to}
      className={cn('text-xl font-semibold uppercase tracking-[0.25em] text-neutral-900', className)}
    >
      {storeInfo.name}
    </Link>
  )
}

export default Logo
