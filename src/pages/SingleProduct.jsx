import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react'
import Breadcrums from '../components/Breadcrums'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`https://dummyjson.com/products/${id}`)
        setProduct(res.data)
        setActiveImage(res.data.images?.[0] || res.data.thumbnail)
        setQuantity(1)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }
    getSingleProduct()
  }, [id])

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-3 transition-colors duration-200">
        <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Loading product specifications...
        </p>
      </div>
    )
  }

  const discount = Math.round(product.discountPercentage || 0)
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null
  const savings = originalPrice ? originalPrice - product.price : 0
  const rating = product.rating ? Number(product.rating).toFixed(1) : '4.8'

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrums title={product.title} />

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 sm:p-10 mt-4 transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Product Images Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 p-6 sm:p-10 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                {discount > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    SAVE {discount}%
                  </span>
                )}
                <img
                  src={activeImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.images.map((img, index) => {
                    const isActive = activeImage === img
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl p-2 bg-slate-50 dark:bg-slate-800 border-2 transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? 'border-blue-600 ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Brand & Category Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {product.brand && (
                    <span className="px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                      {product.brand}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg uppercase tracking-wider">
                    {product.category?.replaceAll('-', ' ')}
                  </span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{rating} Rating</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {product.title}
                </h1>

                {/* Stock status */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock &bull; Ready for Instant Dispatch</span>
                </div>

                {/* Price block */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                      PKR {product.price}
                    </span>
                    {originalPrice && (
                      <span className="text-base sm:text-lg text-slate-600 dark:text-slate-400 line-through">
                        PKR {originalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 px-2.5 py-1 rounded-full">
                        Save PKR {savings} ({discount}% OFF)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Includes all applicable taxes and 100% genuine warranty.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 shadow-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 shadow-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-md shadow-blue-500/20 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-sm font-bold rounded-2xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-transparent dark:border-slate-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Trust & Guarantee Box */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex flex-col items-center">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Free Delivery</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">On all electronics</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">2-Year Warranty</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">100% Authentic</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">30-Day Returns</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">Money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct