import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import PageLoader from '@/components/pageLoader/PageLoader'
import MainLayout from '@/layouts/mainLayout/MainLayout'

const Home = lazy(() => import('@/pages/home/Home'))
const ProductDetail = lazy(() => import('@/pages/productDetail/ProductDetail'))
const Collection = lazy(() => import('@/pages/collection/Collection'))
const Search = lazy(() => import('@/pages/search/Search'))
const NotFound = lazy(() => import('@/pages/notFound/NotFound'))

const AdminLayout = lazy(() => import('@/layouts/adminLayout/AdminLayout'))
const AdminLogin = lazy(() => import('@/pages/admin/login/AdminLogin'))
const Dashboard = lazy(() => import('@/pages/admin/dashboard/Dashboard'))
const AdminProducts = lazy(() => import('@/pages/admin/products/AdminProducts'))
const ProductEditor = lazy(() => import('@/pages/admin/productEditor/ProductEditor'))
const HomeContent = lazy(() => import('@/pages/admin/homeContent/HomeContent'))
const Offers = lazy(() => import('@/pages/admin/offers/Offers'))
const CampaignEditor = lazy(() => import('@/pages/admin/campaignEditor/CampaignEditor'))
const StoreSettings = lazy(() => import('@/pages/admin/storeSettings/StoreSettings'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/:collectionSlug" element={<Collection />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="productos/nuevo" element={<ProductEditor />} />
            <Route path="productos/:productId" element={<ProductEditor />} />
            <Route path="ofertas" element={<Offers />} />
            <Route path="ofertas/nueva" element={<CampaignEditor />} />
            <Route path="ofertas/:campaignId" element={<CampaignEditor />} />
            <Route path="inicio" element={<HomeContent />} />
            <Route path="tienda" element={<StoreSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
