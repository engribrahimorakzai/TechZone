


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
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-4">
      <button
        disabled={page === 1}
        className={`${page === 1 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 cursor-pointer'} text-white text-sm md:text-base px-3 py-1 rounded-md`}
        onClick={() => pageHandler(page - 1)}
      >
        Prev
      </button>

      {getPages(page, dynamicPage).map((item, index) => (
        <span
          key={index}
          onClick={() => typeof item === 'number' && pageHandler(item)}
          className={`${typeof item === 'number' ? 'cursor-pointer' : ''} ${
            item === page ? 'font-bold text-red-600' : 'text-black'
          }`}
        >
          {item}
        </span>
      ))}

      <button
        disabled={page === dynamicPage}
        className={`${page === dynamicPage ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 cursor-pointer'} text-white text-sm md:text-base px-3 py-1 rounded-md`}
        onClick={() => pageHandler(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination