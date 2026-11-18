import { Suspense } from 'react'
import { Outlet } from 'react-router'
import CartDrawer from '@/components/cartDrawer/CartDrawer'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import PageLoader from '@/components/pageLoader/PageLoader'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import SplashScreen from '@/components/splashScreen/SplashScreen'
import { useRibbon } from '@/hooks/useRibbon'
import { cn } from '@/utils/cn'

function MainLayout() {
  const ribbon = useRibbon()

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <SplashScreen />
      <ScrollToTop />
      <Navbar ribbon={ribbon} />
      <main className={cn('flex-1', ribbon ? 'pt-30' : 'pt-20')}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default MainLayout
