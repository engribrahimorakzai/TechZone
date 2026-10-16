import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Star, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const getDate = (daysAhead) => {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const discount = Math.round(product.discountPercentage || 0)
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null
  const rating = product.rating ? Number(product.rating).toFixed(1) : '4.8'
  const goToProduct = () => navigate(`/products/${product.id}`)

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition duration-200">
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {/* Thumbnail */}
        <div
          onClick={goToProduct}
          className="relative w-36 h-36 sm:w-48 sm:h-48 shrink-0 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          {discount > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{discount}%
            </span>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-300"
          />
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {product.brand || product.category?.replaceAll('-', ' ') || 'Electronics'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {rating}
            </span>
          </div>

          <h3
            onClick={goToProduct}
            className="font-bold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            {product.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-2 pt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              PKR {product.price}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 line-through">
                PKR {originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
            <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>FREE delivery by <strong className="text-slate-800 dark:text-slate-200">{getDate(3)}</strong></span>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full sm:w-auto flex flex-col gap-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
          <button
            onClick={goToProduct}
            className="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView