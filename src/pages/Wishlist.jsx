import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import lottie from 'lottie-web'
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Star,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import Breadcrums from '../components/Breadcrums'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import emptyHeart from '../assets/EmptyHeart.json'

// Chhota Lottie player (isi file ke andar)
const LottiePlayer = ({ animationData, loop = true }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: true,
      animationData,
    })
    return () => anim.destroy()
  }, [animationData, loop])

  return <div ref={containerRef} className="w-full h-full" />
}

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart, moveAllToCart, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrums title="Wishlist" />

        {/* Wishlist Header */}
        <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 shadow-sm border border-rose-100 dark:border-rose-900/50">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  My Wishlist
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Save your favorite gadgets and move them to cart anytime.
              </p>
            </div>
          </div>

          {/* Action buttons when items exist */}
          {wishlist.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={moveAllToCart}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition shadow-sm shadow-blue-500/20 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" /> Move All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:border-rose-200 dark:hover:bg-rose-950/30 dark:hover:border-rose-900 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-4">
              <LottiePlayer animationData={emptyHeart} loop={true} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              Looks like you haven't saved any electronics yet. Click the heart icon on any product to keep track of items you love!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Discover Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-5 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlist.map((product) => {
              const discount = Math.round(product.discountPercentage || 0)
              const originalPrice =
                discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null
              const rating = product.rating ? Number(product.rating).toFixed(1) : '4.8'

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-square bg-slate-50/60 dark:bg-slate-800/40 p-4 flex items-center justify-center overflow-hidden">
                    {/* Discount Pill */}
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        -{discount}%
                      </span>
                    )}

                    {/* Remove from Wishlist button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer"
                      title="Remove from wishlist"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      {/* Brand & Category */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 truncate">
                          {product.brand || product.category?.replaceAll('-', ' ') || 'Electronics'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {rating}
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link to={`/products/${product.id}`}>
                        <h3
                          className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug"
                          title={product.title}
                        >
                          {product.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Price and Action Buttons */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                          PKR {product.price}
                        </span>
                        {originalPrice && (
                          <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                            PKR {originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-3">
                        <Check className="w-3 h-3" /> In Stock &bull; Free Shipping
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          onClick={() => moveToCart(product)}
                          className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-xs cursor-pointer active:scale-98"
                        >
                          <ShoppingBag className="w-4 h-4" /> Move to Cart
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                        >
                          Add to Cart (Keep Saved)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist