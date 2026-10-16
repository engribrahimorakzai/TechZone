import { useState } from 'react'
import { MapPin, ShoppingBag, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
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
  const { darkMode, toggleDarkMode } = useTheme()
  const [openNav, setOpenNav] = useState(false)

  const toggleDropdown = () => setOpcenDropdown(!openDropdown)

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              TZ
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Tech<span className="text-blue-600 dark:text-blue-500">Zone</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                Electronics Store
              </span>
            </div>
          </Link>

          {/* Location Indicator Pill */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-full border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="max-w-[150px] truncate">
                {location
                  ? `${location.city || location.town || location.state || 'Local'}, ${location.country || ''}`
                  : 'Deliver to: Set Location'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            </button>

            {/* Location Dropdown Modal */}
            {openDropdown && (
              <div className="absolute top-10 left-0 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Location</h4>
                  <button
                    onClick={toggleDropdown}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="py-3 text-xs text-slate-600 dark:text-slate-300">
                  {location ? (
                    <div className="space-y-1 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="font-semibold text-slate-900 dark:text-white">{location.country}</p>
                      <p className="text-slate-500 dark:text-slate-400">
                        {location.state || location.city || location.town || location.village}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">Detect your current position for accurate delivery estimates.</p>
                  )}
                </div>
                <button
                  onClick={getLoction}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" /> Detect My Location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Theme Toggle, Cart, Auth, and Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="View Shopping Cart"
            className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Authentication Section */}
          <div className="hidden sm:flex items-center gap-2">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md transition cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center pl-2">
                <UserButton />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenNav(!openNav)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {openNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </header>
  )
}

export default Navbar