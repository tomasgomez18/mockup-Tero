import { Link } from 'react-router'
import { Sparkles } from 'lucide-react'
import type { AnnouncementStyle, Ribbon } from '@/types/campaign'
import { cn } from '@/utils/cn'

interface AnnouncementBarProps {
  ribbon: Ribbon
  className?: string
}

const styles: Record<AnnouncementStyle, string> = {
  dark: 'bg-brand-600 text-white',
  red: 'bg-red-600 text-white',
  amber: 'bg-amber-300 text-neutral-900',
  light: 'bg-neutral-100 text-neutral-900 border-b border-neutral-200',
}

const REPEAT = 4

function AnnouncementBar({ ribbon, className }: AnnouncementBarProps) {
  const { messages, style, animated, linkTo } = ribbon
  const items = Array.from({ length: REPEAT }, () => messages).flat()

  const content = animated ? (
    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {items.map((message, index) => (
            <li key={index} className="flex items-center gap-3 px-6 whitespace-nowrap">
              <Sparkles className="size-3.5 shrink-0 opacity-70" />
              {message}
            </li>
          ))}
        </ul>
      ))}
    </div>
  ) : (
    <p className="truncate px-4 text-center">{messages.join('  ·  ')}</p>
  )

  const classes = cn(
    'flex h-10 items-center overflow-hidden text-xs font-medium tracking-wide uppercase sm:text-[13px]',
    !animated && 'justify-center',
    styles[style],
    className,
  )

  if (linkTo) {
    return (
      <Link to={linkTo} aria-label={messages.join('. ')} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <div role="region" aria-label="Anuncios" className={classes}>
      {content}
    </div>
  )
}

export default AnnouncementBar
