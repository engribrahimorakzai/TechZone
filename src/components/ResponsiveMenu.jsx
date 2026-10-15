import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { FaUserCircle } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/cart', label: 'Cart' },
]

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user, isSignedIn } = useUser()
  const closeNav = () => setOpenNav(false)

  return (
    <>
      {/* dhundla parda: bahar click karo to menu band */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 z-10 bg-black/40 md:hidden transition-opacity ${
          openNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* side menu */}
      <div
        className={`${
          openNav ? 'left-0' : '-left-full'
        } fixed bottom-0 top-0 z-20 flex h-screen w-3/4 flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
      >
        <button
          onClick={closeNav}
          className="absolute top-5 right-5 text-2xl cursor-pointer"
          aria-label="Close menu"
        >
          <CgClose />
        </button>

        <div>
          {/* user info */}
          <div className="flex items-center justify-start gap-3">
            {isSignedIn ? (
              <UserButton
                appearance={{ elements: { avatarBox: 'w-12 h-12' } }}
              />
            ) : (
              <FaUserCircle size={50} />
            )}
            <div>
              <h1>Hello, {user?.firstName || 'Guest'}</h1>
              {isSignedIn && (
                <h1 className="text-sm text-slate-500">Premium User</h1>
              )}
            </div>
          </div>

          {/* links */}
          <nav className="mt-12">
            <ul className="flex flex-col gap-7 text-2xl font-semibold">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeNav}
                  className="cursor-pointer"
                >
                  <li>{item.label}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        {/* login na ho to buttons neeche */}
        {!isSignedIn && (
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </>
  )
}

export default ResponsiveMenu