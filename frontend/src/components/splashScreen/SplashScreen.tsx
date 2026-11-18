import { useEffect, useState } from 'react'
import LogoLoader from '@/components/logoLoader/LogoLoader'
import { cn } from '@/utils/cn'

const MIN_DURATION_MS = 1200
const FADE_DURATION_MS = 400

type SplashState = 'visible' | 'fading' | 'hidden'

function SplashScreen() {
  const [state, setState] = useState<SplashState>('visible')

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setState('fading'), MIN_DURATION_MS)
    const hideTimeout = setTimeout(() => setState('hidden'), MIN_DURATION_MS + FADE_DURATION_MS)
    return () => {
      clearTimeout(fadeTimeout)
      clearTimeout(hideTimeout)
    }
  }, [])

  if (state === 'hidden') return null

  return (
    <div
      style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-neutral-50 transition-opacity ease-out',
        state === 'fading' && 'pointer-events-none opacity-0',
      )}
    >
      <LogoLoader size="lg" />
    </div>
  )
}

export default SplashScreen
