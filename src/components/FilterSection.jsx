import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { getData } from '../context/DataContext'

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData()

  const handleReset = () => {
    setSearch('')
    setCategory('All')
    setBrand('All')
    setPriceRange([0, 10000])
  }

  return (
    <aside className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6 transition-colors duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
          <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search Input with Icon */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Search Products
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="e.g. iPhone, Laptop, Watch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition"
          />
        </div>
      </div>

      {/* Categories List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Category
          </label>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
          {categoryOnlyData?.map((item, index) => {
            const isSelected = category === item
            return (
              <label
                key={index}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition capitalize ${isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <input
                  type="checkbox"
                  name={item}
                  checked={isSelected}
                  value={item}
                  onChange={handleCategoryChange}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer accent-blue-600"
                />
                <span className="truncate">{item.replaceAll('-', ' ')}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Brand Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Brand
        </label>
        <select
          className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          value={brand}
          onChange={handleBrandChange}
        >
          {brandOnlyData?.map((item, index) => (
            <option key={index} value={item} className="dark:bg-slate-900 dark:text-white">
              {item === 'All' ? 'All Brands' : item}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Price Range
          </label>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            PKR {priceRange[0]} - PKR {priceRange[1]}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="3000"
          step="25"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
          <span>PKR 0</span>
          <span>PKR 1,500</span>
          <span>PKR 3,000+</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
      </button>
    </aside>
  )
}

export default FilterSection