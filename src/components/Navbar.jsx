import { useState, useRef, useEffect } from 'react'
import { MapPin, ShoppingBag, Menu, X, ChevronDown, Sun, Moon, Heart, Search } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { getData } from '../context/DataContext'
import ResponsiveMenu from './ResponsiveMenu'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = ({ location, getLoction, openDropdown, setOpcenDropdown }) => {
  const { isSignedIn } = useAuth()
  const { totalItems } = useCart()
  const { totalWishlist } = useWishlist()
  const { darkMode, toggleDarkMode } = useTheme()
  const { data } = getData() || { data: [] }
  const [openNav, setOpenNav] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef(null)
  const navigate = useNavigate()

  const toggleDropdown = () => setOpcenDropdown(!openDropdown)

  // Suggestions filtered by live title match
  const suggestions = (searchTerm.trim() && data)
    ? data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : []

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    if (searchTerm.trim()) {
      setShowSuggestions(false)
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      navigate('/products')
    }
  }

  const handleSelectSuggestion = (productId) => {
    setShowSuggestions(false)
    setSearchTerm('')
    navigate(`/products/${productId}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2.5 min-[360px]:px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-1.5 min-[360px]:gap-2 sm:gap-4">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-2 sm:gap-4 xl:gap-6 min-w-0">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0 min-w-0">
            <div className="w-8.5 h-8.5 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              TZ
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base min-[360px]:text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none truncate">
                Tech<span className="text-blue-600 dark:text-blue-500">Zone</span>
              </span>
              <span className="text-[9px] min-[360px]:text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase truncate hidden min-[360px]:block">
                Electronics Store
              </span>
            </div>
          </Link>

          {/* Location Indicator Pill */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-full border border-slate-200 dark:border-slate-700 transition cursor-pointer min-h-[36px]"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="max-w-[130px] 2xl:max-w-[180px] truncate">
                {location
                  ? `${location.city || location.town || location.state || 'Local'}, ${location.country || ''}`
                  : 'Deliver to: Set Location'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
            </button>

            {/* Location Dropdown Modal */}
            {openDropdown && (
              <div className="absolute top-11 left-0 w-[calc(100vw-2rem)] max-w-xs sm:w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Location</h4>
                  <button
                    onClick={toggleDropdown}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                    aria-label="Close location modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="py-3 text-xs text-slate-600 dark:text-slate-300">
                  {location ? (
                    <div className="space-y-1 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{location.country}</p>
                      <p className="text-slate-500 dark:text-slate-400 truncate">
                        {location.state || location.city || location.town || location.village}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">Detect your current position for accurate delivery estimates.</p>
                  )}
                </div>
                <button
                  onClick={getLoction}
                  className="w-full min-h-[40px] sm:min-h-[44px] py-2 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" /> Detect My Location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Navigation Links & Search Bar */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-5 min-w-0">
          <nav className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="relative w-40 xl:w-60 min-w-0">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => {
                  if (searchTerm.trim()) setShowSuggestions(true)
                }}
                className="w-full pl-9 pr-3 py-1.5 text-base sm:text-xs xl:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[38px]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && searchTerm.trim() && (
              <div className="absolute top-full right-0 w-72 sm:w-80 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {suggestions.length > 0 ? (
                  <div className="space-y-1">
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSuggestion(item.id)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition text-left"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-8 h-8 rounded-lg object-contain bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                            PKR {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="w-full min-h-[36px] mt-1 py-1.5 text-[11px] font-bold text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition cursor-pointer flex items-center justify-center"
                    >
                      View all results &rarr;
                    </button>
                  </div>
                ) : (
                  <p className="py-2.5 px-3 text-center text-xs text-slate-500 dark:text-slate-400">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Theme Toggle, Cart, Auth, and Mobile Menu Toggle */}
        <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2 lg:gap-3 shrink-0">
          {/* Mobile Search Icon */}
          <button
            onClick={() => navigate('/products')}
            className="lg:hidden w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Search Products"
            title="Search Products"
          >
            <Search className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5" />
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-10.5 sm:h-10.5 rounded-xl text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5" />
            ) : (
              <Moon className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5" />
            )}
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            aria-label="View Wishlist"
            className="relative w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-10.5 sm:h-10.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center shrink-0"
            title="My Wishlist"
          >
            <Heart className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 sm:w-5.5 sm:h-5.5" />
            {totalWishlist > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] min-[360px]:text-[11px] font-bold h-4.5 min-w-4.5 min-[360px]:h-5 min-[360px]:min-w-5 px-1 rounded-full flex items-center justify-center shadow-xs pointer-events-none">
                {totalWishlist}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="View Shopping Cart"
            className="relative w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-10.5 sm:h-10.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center shrink-0"
          >
            <ShoppingBag className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 sm:w-5.5 sm:h-5.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] min-[360px]:text-[11px] font-bold h-4.5 min-w-4.5 min-[360px]:h-5 min-[360px]:min-w-5 px-1 rounded-full flex items-center justify-center shadow-xs pointer-events-none">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Authentication Section */}
          <div className="hidden sm:flex items-center gap-2">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer min-h-[40px] flex items-center">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md transition cursor-pointer min-h-[40px] flex items-center">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center pl-1 sm:pl-2 min-h-[40px]">
                <UserButton />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenNav(!openNav)}
            className="lg:hidden w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
          >
            {openNav ? (
              <X className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6" />
            ) : (
              <Menu className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6" />
            )}
          </button>
        </div>
      </div>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </header>
  )
}

export default Navbar