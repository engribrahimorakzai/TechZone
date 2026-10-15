
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import Breadcrums from '../components/Breadcrums'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setProduct(null)
        const res = await axios.get(`https://dummyjson.com/products/${id}`)
        setProduct(res.data)
        setActiveImage(res.data.images?.[0] || res.data.thumbnail)
        setQuantity(1)
      } catch (error) {
        console.log(error)
      }
    }
    getSingleProduct()
  }, [id])

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const discount = Math.round(product.discountPercentage || 0)
  const originalPrice = Math.round(product.price + (product.price * discount) / 100)

  return (
    <div className="px-4 pb-6">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* images */}
        <div className="w-full min-w-0">
          <img
            src={activeImage}
            alt={product.title}
            className="rounded-2xl w-full aspect-square object-contain bg-gray-100"
          />
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 md:w-20 md:h-20 shrink-0 object-contain bg-gray-100 rounded-md cursor-pointer border-2 ${
                  activeImage === img ? 'border-red-500' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col gap-4 md:gap-6 min-w-0">
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">
            {product.title}
          </h1>

          <div className="text-gray-700 uppercase text-sm md:text-base">
            {product.brand ? `${product.brand} / ` : ''}
            {product.category}
          </div>

          <p className="text-xl text-red-500 font-bold flex items-center gap-3 flex-wrap">
            ${product.price}
            {discount > 0 && (
              <>
                <span className="line-through text-gray-700">${originalPrice}</span>
                <span className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                  {discount}% discount
                </span>
              </>
            )}
          </p>

          <p className="text-gray-600 text-sm md:text-base">{product.description}</p>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={() => addToCart(product, quantity)}
            className="w-full sm:w-auto px-6 flex gap-2 justify-center py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer"
          >
            <IoCartOutline className="w-6 h-6" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct