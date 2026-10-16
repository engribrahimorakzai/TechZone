import { useNavigate } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { getData } from '../context/DataContext'

const Category = () => {
  const navigate = useNavigate()
  const { data } = getData()

  const categories = [...new Set(data?.map((item) => item.category))].filter(Boolean)

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => navigate('/products')}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 text-white shadow-xs hover:bg-blue-700 transition cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5" /> All Categories
          </button>

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => navigate(`/category/${item}`)}
              className="shrink-0 capitalize text-xs sm:text-sm font-medium px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition cursor-pointer"
            >
              {item.replaceAll('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Category