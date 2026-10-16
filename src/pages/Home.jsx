import { Link } from 'react-router-dom'
import { ArrowRight, Flame } from 'lucide-react'
import Carosel from '../components/Carosel'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'
import Category from '../components/Category'
import ProductCard from '../components/ProductCard'
import { getData } from '../context/DataContext'

const Home = () => {
  const { data, loading } = getData()
  const trendingProducts = data?.slice(6, 14) || []

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      {/* Hero Carousel */}
      <Carosel />

      {/* Categories Bar */}
      <Category />

      {/* Features Bar */}
      <Features />

      {/* Featured / Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Trending Gear</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Electronics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked bestsellers, verified performance, and exclusive price drops.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
          >
            Explore All Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Mid Banner */}
      <MidBanner />
    </div>
  )
}

export default Home