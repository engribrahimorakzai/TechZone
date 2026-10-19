import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import CategoryProducts from './pages/CategoryProducts'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/NotFound'
// import ChatBot from './components/ChatBot'

// Auto-scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App = () => {
  const [location, setLocation] = useState(null)
  const [openDropdown, setOpcenDropdown] = useState(false)

  const getLoction = () => {
    setOpcenDropdown(false)

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        try {
          const res = await axios.get(url)
          setLocation(res.data.address)
        } catch (error) {
          console.error('Failed to reverse geocode location:', error)
        }
      },
      (err) => {
        console.warn('Location permission denied or unavailable:', err.message)
      }
    )
  }

  useEffect(() => {
    getLoction()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
        <Navbar
          location={location}
          getLoction={getLoction}
          openDropdown={openDropdown}
          setOpcenDropdown={setOpcenDropdown}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/cart"
              element={<Cart location={location} getLocation={getLoction} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
      {/* <ChatBot /> */}
    </BrowserRouter>
  )
}

export default App