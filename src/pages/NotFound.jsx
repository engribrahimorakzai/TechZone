import { Link } from 'react-router-dom'
import { Home, PackageSearch, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16 text-center transition-colors duration-200">
      {/* Large decorative 404 */}
      <div className="relative mb-4 select-none pointer-events-none">
        <div className="text-[120px] sm:text-[180px] font-black text-slate-100 dark:text-slate-900 leading-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xl shadow-blue-500/10 border border-blue-100 dark:border-blue-900">
            <PackageSearch className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed mb-8">
        Yeh page exist nahi karta ya URL galat hai. Wapas home ya products par jayein.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl transition hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Products
        </Link>
      </div>
    </div>
  )
}

export default NotFound
