

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { CgClose } from 'react-icons/cg'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { useCart } from '../context/CartContext'
import ResponsiveMenu from './ResponsiveMenu'

const linkClass = ({ isActive }) =>
  isActive
    ? 'border-b-2 border-red-500 text-red-500 cursor-pointer transition-all'
    : 'text-black cursor-pointer'

const Navbar = ({ location, getLoction, openDropdown, setOpcenDropdown }) => {
  const { isSignedIn } = useAuth()
  const { totalItems } = useCart()
  const [openNav, setOpenNav] = useState(false)

  const toggleDropdown = () => setOpcenDropdown(!openDropdown)

  return (
    <div className="bg-white py-3 shadow-xl px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo + Location */}
        <div className="flex items-center gap-4 xl:gap-7">
          <Link to="/">
            <h1 className="font-bold text-2xl md:text-3xl">
              <span className="text-red-500 font-serif">Tech</span>
              Zone
            </h1>
          </Link>

          <div className="hidden xl:flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-1 text-sm">
                  <p>{location.country || 'Country unavailable'}</p>
                  <p>
                    {location.state ||
                      location.city ||
                      location.town ||
                      location.village ||
                      'Location unavailable'}
                  </p>
                </div>
              ) : (
                'Add Your Location'
              )}
            </span>
            <FaCaretDown onClick={toggleDropdown} className="text-gray-700" />
          </div>

          {openDropdown && (
            <div className="hidden xl:block w-62.5 h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change location
                <span onClick={toggleDropdown} className="cursor-pointer">
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLoction}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* Right section */}
        <nav className="flex gap-4 md:gap-6 items-center">
          <ul className="hidden lg:flex gap-6 items-center text-lg xl:text-xl font-semibold">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <NavLink to="/cart" className={linkClass}>Cart</NavLink>
          </ul>

          <Link to="/cart" className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm">
              {totalItems}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton />
            )}
          </div>

          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 lg:hidden cursor-pointer"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 lg:hidden cursor-pointer"
            />
          )}
        </nav>
      </div>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  )
}

export default Navbar