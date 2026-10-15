import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
// import Loading from '../assets/Loading4.webm'
import Loading from '../assets/Loading.gif'
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
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    )
  }

  const discount = Math.round(product.discountPercentage || 0)
  const originalPrice = Math.round(product.price + (product.price * discount) / 100)

  return (
    <div className="px-4 pb-4 md:px-0">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* product image */}
        <div className="w-full">
          <img
            src={activeImage}
            alt={product.title}
            className="rounded-2xl w-full aspect-square object-contain bg-gray-100"
          />
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-contain bg-gray-100 rounded-md cursor-pointer border-2 ${
                  activeImage === img ? 'border-red-500' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* product details */}
        <div className="flex flex-col gap-6">
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">
            {product.title}
          </h1>

          <div className="text-gray-700 uppercase">
            {product.brand ? `${product.brand} / ` : ''}
            {product.category}
          </div>

          <p className="text-xl text-red-500 font-bold flex items-center gap-3 flex-wrap">
            ${product.price}
            {discount > 0 && (
              <>
                <span className="line-through text-gray-700">${originalPrice}</span>
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-base">
                  {discount}% discount
                </span>
              </>
            )}
          </p>

          <p className="text-gray-600">{product.description}</p>

          {/* quantity selector */}
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

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToCart(product, quantity)}
              className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer"
            >
              <IoCartOutline className="w-6 h-6" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct