import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// aaj se kitne din baad ki tareekh, e.g. "Thu, Oct 15"
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
    <div className="space-y-4 mt-2 rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer object-contain bg-white"
          onClick={goToProduct}
        />

        <div className="space-y-2">
          <h1
            onClick={goToProduct}
            className="font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 cursor-pointer md:w-full w-55"
          >
            {product.title}
          </h1>

          <p className="font-semibold flex items-center md:text-lg text-sm gap-1">
            $<span className="md:text-4xl text-3xl">{product.price}</span>
            {discount > 0 && <span>({discount}% off)</span>}
          </p>

          <p className="text-sm">
            FREE delivery{' '}
            <span className="font-semibold">{getDate(3)}</span>
            <br />
            Or fastest delivery{' '}
            <span className="font-semibold">{getDate(1)}</span>
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