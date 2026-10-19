import { createContext, useContext, useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify'
import { useCart } from './CartContext'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const { addToCart } = useCart()
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    } catch (err) {
      console.error('Failed to save wishlist to localStorage:', err)
    }
  }, [wishlist])

  const isInWishlist = (id) => wishlist.some((item) => item.id === id)

  const toggleWishlist = (product) => {
    if (!product || !product.id) return

    const exists = wishlist.some((item) => item.id === product.id)
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id))
      toast.info(`"${product.title?.slice(0, 22) || 'Product'}..." removed from wishlist`, {
        toastId: `wishlist-${product.id}`,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      })
    } else {
      setWishlist((prev) => [...prev, product])
      toast.success(`"${product.title?.slice(0, 22) || 'Product'}..." saved to wishlist `, {
        toastId: `wishlist-${product.id}`,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      })
    }
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
    toast.info('Item removed from wishlist', {
      toastId: `wishlist-remove-${id}`,
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
  }

  const moveToCart = (product) => {
    if (!product) return
    addToCart(product, 1)
    setWishlist((prev) => prev.filter((item) => item.id !== product.id))
  }

  const moveAllToCart = () => {
    if (wishlist.length === 0) return
    wishlist.forEach((product) => {
      addToCart(product, 1)
    })
    setWishlist([])
    toast.success('All wishlist items moved to cart!', {
      toastId: 'wishlist-move-all',
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
      transition: Bounce,
    })
  }

  const clearWishlist = () => {
    setWishlist([])
    toast.info('Wishlist cleared', {
      toastId: 'wishlist-clear-all',
      position: 'top-right',
      autoClose: 2500,
      theme: 'colored',
      transition: Bounce,
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        moveAllToCart,
        clearWishlist,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
