

import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const getDate = (daysAhead) => {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const discount = Math.round(product.discountPercentage || 0)
  const goToProduct = () => navigate(`/products/${product.id}`)

  return (
    <div className="mt-2 rounded-md">
      <div className="bg-gray-100 flex gap-3 md:gap-7 items-center p-2 rounded-md">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="md:h-60 md:w-60 h-28 w-28 shrink-0 rounded-md cursor-pointer object-contain bg-white"
          onClick={goToProduct}
        />

        <div className="space-y-2 min-w-0 flex-1">
          <h1
            onClick={goToProduct}
            className="font-bold md:text-xl text-base line-clamp-3 hover:text-red-400 cursor-pointer"
          >
            {product.title}
          </h1>

          <p className="font-semibold flex items-center flex-wrap md:text-lg text-sm gap-1">
            $<span className="md:text-4xl text-2xl">{product.price}</span>
            {discount > 0 && <span>({discount}% off)</span>}
          </p>

          <p className="text-xs md:text-sm">
            FREE delivery <span className="font-semibold">{getDate(3)}</span>
            <br />
            Or fastest delivery <span className="font-semibold">{getDate(1)}</span>
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView