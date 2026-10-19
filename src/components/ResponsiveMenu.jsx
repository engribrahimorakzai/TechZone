import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { UserCircle, X, ShoppingBag, Home, Package, Info, Phone, Sun, Moon, Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/wishlist', label: 'Wishlist', icon: Heart, isWishlist: true },
  { to: '/cart', label: 'Cart', icon: ShoppingBag, isCart: true },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
]

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user, isSignedIn } = useUser()
  const { darkMode, toggleDarkMode } = useTheme()
  const { totalWishlist } = useWishlist()
  const { totalItems } = useCart()
  const location = useLocation()
  const closeNav = () => setOpenNav(false)

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${openNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-50 flex h-full w-[88vw] min-[360px]:w-4/5 max-w-sm flex-col justify-between overflow-y-auto bg-white dark:bg-slate-900 px-4 min-[360px]:px-6 py-5 min-[360px]:py-6 text-slate-800 dark:text-slate-100 shadow-2xl transition-transform duration-300 ease-out lg:hidden border-l border-slate-200 dark:border-slate-800 ${openNav ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 min-[360px]:pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                TZ
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white truncate">
                Tech<span className="text-blue-600 dark:text-blue-500">Zone</span>
              </span>
            </div>
            <button
              onClick={closeNav}
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="mt-4 min-[360px]:mt-5 p-3 min-[360px]:p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            {isSignedIn ? (
              <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <UserCircle className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {isSignedIn ? (user?.fullName || user?.firstName || 'User') : 'Welcome, Guest'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {isSignedIn ? (user?.primaryEmailAddress?.emailAddress || 'Verified Member') : 'Sign in to access orders'}
              </p>
            </div>
          </div>

          {/* Dark Mode Switch inside Drawer */}
          <div className="mt-3 min-[360px]:mt-4 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 shrink-0" />
              )}
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {darkMode ? 'Dark Theme' : 'Light Theme'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode theme"
              className={`relative inline-flex h-6 w-11 min-h-[24px] items-center rounded-full transition-colors cursor-pointer ${darkMode ? 'bg-blue-600' : 'bg-slate-300'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-4 min-[360px]:mt-5">
            <ul className="flex flex-col gap-1.5">
              {links.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.to
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeNav}
                      className={`min-h-[44px] flex items-center justify-between px-3.5 min-[360px]:px-4 py-2.5 min-[360px]:py-3 rounded-xl text-sm font-semibold transition ${isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.isWishlist && totalWishlist > 0 && (
                        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {totalWishlist}
                        </span>
                      )}
                      {item.isCart && totalItems > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Footer / Auth actions for mobile */}
        {!isSignedIn && (
          <div className="flex flex-col gap-2.5 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <SignInButton mode="modal">
              <button
                onClick={closeNav}
                className="w-full min-h-[44px] py-2.5 px-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition cursor-pointer flex items-center justify-center"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                onClick={closeNav}
                className="w-full min-h-[44px] py-2.5 px-4 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer flex items-center justify-center"
              >
                Create Account
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </>
  )
}

export default ResponsiveMenu