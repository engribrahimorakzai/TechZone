

import { createContext, useContext, useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem))
  }, [cartItem])

  const addToCart = (product, quantity = 1) => {
    setCartItem((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })

    // toast notification
    toast(' Product added to cart', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItem((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const deleteItem = (id) => {
    setCartItem((prev) => prev.filter((item) => item.id !== id))
    toast(' Product removed from cart', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })
  }

  const clearCart = () => setCartItem([])

  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)