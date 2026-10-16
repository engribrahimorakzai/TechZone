import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, PackageCheck } from 'lucide-react'
import { getData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import Breadcrums from '../components/Breadcrums'

const CategoryProducts = () => {
  const { category } = useParams()
  const { data, loading } = getData()

  const formattedCategory = category?.replaceAll('-', ' ') || ''
  const filtered = data?.filter((item) => item.category === category) || []

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrums title={formattedCategory.toUpperCase()} />

        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 dark:border-slate-800 gap-4 mt-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <PackageCheck className="w-3.5 h-3.5" />
              <span>CATEGORY SPOTLIGHT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold capitalize text-slate-900 dark:text-white tracking-tight">
              {formattedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span> devices in this collection
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>
        </div>

        {/* Content */}
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
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              No products available in this category
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Please check out our full collection of electronics and gadgets.
            </p>
            <Link
              to="/products"
              className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryProducts