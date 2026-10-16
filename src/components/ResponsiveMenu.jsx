import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { UserCircle, X, ShoppingBag, Home, Package, Info, Phone, Sun, Moon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
]

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user, isSignedIn } = useUser()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const closeNav = () => setOpenNav(false)

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
          openNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-50 flex h-full w-4/5 max-w-sm flex-col justify-between bg-white dark:bg-slate-900 px-6 py-6 text-slate-800 dark:text-slate-100 shadow-2xl transition-transform duration-300 ease-out lg:hidden border-l border-slate-200 dark:border-slate-800 ${
          openNav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                TZ
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Tech<span className="text-blue-600 dark:text-blue-500">Zone</span>
              </span>
            </div>
            <button
              onClick={closeNav}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            {isSignedIn ? (
              <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <UserCircle className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {isSignedIn ? (user?.fullName || user?.firstName || 'User') : 'Welcome, Guest'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {isSignedIn ? (user?.primaryEmailAddress?.emailAddress || 'Verified Member') : 'Sign in to access orders'}
              </p>
            </div>
          </div>

          {/* Dark Mode Switch inside Drawer */}
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {darkMode ? 'Dark Theme' : 'Light Theme'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                darkMode ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-5">
            <ul className="flex flex-col gap-1.5">
              {links.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.to
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeNav}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Footer / Auth actions for mobile */}
        {!isSignedIn && (
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <SignInButton mode="modal">
              <button
                onClick={closeNav}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition cursor-pointer"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                onClick={closeNav}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
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