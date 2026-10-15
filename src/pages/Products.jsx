// import { useState } from 'react'
// import { getData } from '../context/DataContext'
// import FilterSection from '../components/FilterSection'
// import ProductCard from '../components/ProductCard'

// const Products = () => {
//   const { data } = getData()
//   const [search, setSearch] = useState('')
//   const [category, setCategory] = useState('All')
//   const [brand, setBrand] = useState('All')
//   const [priceRange, setPriceRange] = useState([0, 10000])

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.checked ? e.target.value : 'All')
//   }

//   const handleBrandChange = (e) => setBrand(e.target.value)

//   const filteredData = data?.filter(
//     (item) =>
//       item.title.toLowerCase().includes(search.toLowerCase()) &&
//       (category === 'All' || item.category === category) &&
//       (brand === 'All' || item.brand === brand) &&
//       item.price >= priceRange[0] &&
//       item.price <= priceRange[1]
//   )

//   return (
//     <div className="max-w-6xl mx-auto px-4 mb-10">
//       <div className="flex gap-8">
//         <FilterSection
//           search={search}
//           setSearch={setSearch}
//           brand={brand}
//           setBrand={setBrand}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           category={category}
//           setCategory={setCategory}
//           handleBrandChange={handleBrandChange}
//           handleCategoryChange={handleCategoryChange}
//         />

//         <div className="flex-1 mt-10">
//           {filteredData?.length ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {filteredData.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-xl text-gray-500">
//              No Products Found
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Products

import { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import LottiePlayer from '../components/LottiePlayer'
import notFoundAnimation from '../assets/NotFounds.json'
import ProductListView from '../components/ProductListView'

const ITEMS_PER_PAGE = 8

const Products = () => {
  const { data } = getData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [page, setPage] = useState(1)

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

  // filter badle to wapas page 1 par jao
  useEffect(() => {
    setPage(1)
  }, [search, category, brand, priceRange])

  const dynamicPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  // sirf is page ke 8 products
  const start = (page - 1) * ITEMS_PER_PAGE
  const pageData = filteredData.slice(start, start + ITEMS_PER_PAGE)

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <div className="flex gap-8">
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

        <div className="flex-1 mt-10">
          {pageData.length ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                className="w-80 md:w-96"
              />
              <p className="text-xl text-gray-500 -mt-4"></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products