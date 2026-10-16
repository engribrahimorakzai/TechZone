import { useEffect, useState } from 'react'
import { LayoutGrid, List, SlidersHorizontal, Package } from 'lucide-react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import ProductCard from '../components/ProductCard'
import ProductListView from '../components/ProductListView'
import Pagination from '../components/Pagination'
import LottiePlayer from '../components/LottiePlayer'
import notFoundAnimation from '../assets/NotFounds.json'

const ITEMS_PER_PAGE = 8

const Products = () => {
  const { data, loading } = getData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  const handleCategoryChange = (e) => {
    setCategory(e.target.checked ? e.target.value : 'All')
  }
  const handleBrandChange = (e) => setBrand(e.target.value)

  const filteredData =
    data?.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'All' || item.category === category) &&
        (brand === 'All' || item.brand === brand) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    ) || []

  useEffect(() => {
    setPage(1)
  }, [search, category, brand, priceRange])

  const dynamicPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const start = (page - 1) * ITEMS_PER_PAGE
  const pageData = filteredData.slice(start, start + ITEMS_PER_PAGE)

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <Package className="w-3.5 h-3.5" />
              <span>OFFICIAL CATALOG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              All Electronics & Gadgets
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredData.length}</span> verified products
            </p>
          </div>

          {/* Controls: Mobile Filter Toggle + Grid/List View switcher */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Filter Products'}</span>
            </button>

            <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filter */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-72 shrink-0 md:sticky md:top-24`}
          >
            <FilterSection
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              handleBrandChange={handleBrandChange}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Product Listing Area */}
          <div className="flex-1 min-w-0 w-full">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                    <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : pageData.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {pageData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {pageData.map((product) => (
                      <ProductListView key={product.id} product={product} />
                    ))}
                  </div>
                )}

                <Pagination
                  page={page}
                  pageHandler={pageHandler}
                  dynamicPage={dynamicPage}
                />
              </>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center">
                <LottiePlayer
                  animationData={notFoundAnimation}
                  className="w-48 sm:w-64"
                />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">
                  No products matched your criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                  Try adjusting your search query, selecting different categories, or clearing the price slider filter.
                </p>
                <button
                  onClick={() => {
                    setSearch('')
                    setCategory('All')
                    setBrand('All')
                    setPriceRange([0, 10000])
                  }}
                  className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products