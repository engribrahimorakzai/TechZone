import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrums = ({ title }) => {
  return (
    <nav className="max-w-7xl mx-auto py-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
        <li className="inline-flex items-center">
          <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Products
          </Link>
        </li>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
        <li className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
          {title}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrums