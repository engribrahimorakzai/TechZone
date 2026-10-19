import { ChevronLeft, ChevronRight } from 'lucide-react'

const getPages = (current, total) => {
  const pages = []
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else if (current <= 3) {
    pages.push(1, 2, 3, '...', total)
  } else if (current >= total - 2) {
    pages.push(1, '...', total - 2, total - 1, total)
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total)
  }
  return pages
}

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  if (dynamicPage <= 1) return null

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" aria-label="Pagination">
      {/* Previous Button */}
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${page === 1
          ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 cursor-not-allowed'
          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 cursor-pointer shadow-xs'
          }`}
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      {/* Numbered Pages */}
      <div className="flex items-center gap-1">
        {getPages(page, dynamicPage).map((item, index) => {
          if (item === '...') {
            return (
              <span key={index} className="px-2 py-1 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-bold select-none">
                ...
              </span>
            )
          }

          const isActive = item === page
          return (
            <button
              key={index}
              onClick={() => pageHandler(item)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition cursor-pointer ${isActive
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
              {item}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${page === dynamicPage
          ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 cursor-not-allowed'
          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 cursor-pointer shadow-xs'
          }`}
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}

export default Pagination