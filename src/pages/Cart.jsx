import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from 'lucide-react'
import { useCart } from '../context/CartContext'

const HANDLING_CHARGE = 5

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem, totalPrice } = useCart()
  const { user } = useUser()

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [form, setForm] = useState({
    name: '',
    address: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
  })

  // Auto-populate when user or location updates
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.fullName ?? prev.name,
      address: location?.county || location?.city || location?.town || prev.address,
      state: location?.state ?? prev.state,
      postcode: location?.postcode ?? prev.postcode,
      country: location?.country ?? prev.country,
    }))
  }, [user, location])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'TECH10') {
      setPromoApplied(true)
    } else {
      alert('Invalid code! Try "TECH10" for PKR 10 discount.')
    }
  }

  const discountAmount = promoApplied ? 10 : 0
  const grandTotal = Math.max(0, totalPrice + HANDLING_CHARGE - discountAmount)

  if (cartItem.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16 text-center transition-colors duration-200">
        <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-8">
          Looks like you haven't added any electronics to your cart yet. Explore our featured deals and bestsellers.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          Explore Electronics <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              You have <span className="font-semibold text-slate-900 dark:text-white">{cartItem.length} items</span> in your cart
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Continue Shopping &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Products List */}
            <div className="space-y-3">
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-colors duration-200"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-slate-50 dark:bg-slate-800 p-2 shrink-0 border border-slate-100 dark:border-slate-700"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {item.category?.replaceAll('-', ' ')}
                      </p>
                      <p className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                        PKR {item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 shadow-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 shadow-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Info Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 space-y-4 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Delivery Address
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Verify or edit your destination address for shipping.
                  </p>
                </div>

                <button
                  onClick={getLocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-xl border border-blue-200 dark:border-blue-800 transition cursor-pointer self-start sm:self-auto"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Detect Location
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Street Address / City
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Tech St, Suite 400"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="New York"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    placeholder="10001"
                    value={form.postcode}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United States"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 space-y-5 transition-colors duration-200">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Order Summary
              </h3>

              {/* Free delivery qualified banner */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>You've unlocked <strong>FREE Express Shipping!</strong></span>
              </div>

              {/* Bill Details */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal ({cartItem.length} items)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">PKR {totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="line-through text-slate-400 dark:text-slate-500 mr-1.5">PKR 250</span> FREE
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Handling & Packaging</span>
                  <span className="font-semibold text-slate-900 dark:text-white">PKR {HANDLING_CHARGE.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Promo Discount (TECH10)</span>
                    <span>-PKR {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-slate-900 dark:text-white block">Total Due</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">Includes all applicable duties</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    PKR {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. TECH10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl uppercase tracking-wider font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer border border-transparent dark:border-slate-700"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Checkout Button */}
              <button
                onClick={() => alert(`Order placed successfully! Total: PKR ${grandTotal.toFixed(2)}`)}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-md shadow-blue-500/20 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShieldCheck className="w-4 h-4" /> Proceed to Secure Checkout
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>Encrypted 256-Bit Bank Grade Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart