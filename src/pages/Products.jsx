


import { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import LottiePlayer from '../components/LottiePlayer'
import notFoundAnimation from '../assets/NotFounds.json'

const ITEMS_PER_PAGE = 8

const Products = () => {
  const { data } = getData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

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
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-10">
        {/* mobile par filter ka button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden self-start bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* filter: mobile par button se, bari screen par hamesha */}
        <div
          className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 md:shrink-0`}
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

        <div className="flex-1 min-w-0">
          {pageData.length ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {pageData.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                page={page}
                pageHandler={pageHandler}
                dynamicPage={dynamicPage}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <LottiePlayer
                animationData={notFoundAnimation}
                className="w-64 md:w-96"
              />
              <p className="text-xl text-gray-500 -mt-4">No Products Found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products