import { ShoppingBag, Star, Check, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const isFavorited = isInWishlist(product.id)
  const discount = Math.round(product.discountPercentage || 0)
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null
  const rating = product.rating ? Number(product.rating).toFixed(1) : '4.8'

  const goToDetails = () => navigate(`/products/${product.id}`)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Image Preview Area */}
      <div className="relative aspect-square bg-slate-50/60 dark:bg-slate-800/40 p-4 flex items-center justify-center overflow-hidden cursor-pointer" onClick={goToDetails}>
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            -{discount}%
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product)
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-90 ${
            isFavorited
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 border border-rose-200 dark:border-rose-900'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 border border-slate-200/80 dark:border-slate-700'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs text-slate-700 dark:text-slate-200 text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-slate-100 dark:border-slate-700">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{rating}</span>
        </div>

        {/* Product Thumbnail */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 truncate">
            {product.brand || product.category?.replaceAll('-', ' ') || 'Electronics'}
          </div>

          {/* Product Title */}
          <h3
            onClick={goToDetails}
            className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Stock info */}
        <div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              PKR {product.price}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-600 dark:text-slate-400 line-through">
                PKR {originalPrice}
              </span>
            )}
          </div>

          <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-3">
            <Check className="w-3 h-3" /> In Stock &bull; Free Shipping
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-xs cursor-pointer active:scale-98"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard