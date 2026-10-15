import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useCart } from '../context/CartContext'
import emptyCart from '../assets/empty-cart.png'

const HANDLING_CHARGE = 5

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem, totalPrice } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    address: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
  })

  // user ya location aate hi fields khud bhar jayen
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.fullName ?? prev.name,
      address: location?.county || location?.city || location?.town || prev.address,
      state: location?.state ?? prev.state,
      postcode: location?.postcode ?? prev.postcode,
      country: location?.country ?? prev.country,
    }))
  }, [user, location])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  if (cartItem.length === 0) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-150">
        <h1 className="text-red-500/80 font-bold text-5xl text-center">
          Oh no! Your cart is empty
        </h1>
        <img src={emptyCart} alt="" className="w-100" />
        <button
          onClick={() => navigate('/products')}
          className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

      {/* cart items */}
      <div className="mt-10">
        {cartItem.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 rounded-md object-contain bg-white"
              />
              <div>
                <h1 className="md:w-75 line-clamp-2">{item.title}</h1>
                <p className="text-red-500 font-semibold text-lg">${item.price}</p>
              </div>
            </div>

            <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="cursor-pointer"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="cursor-pointer"
              >
                +
              </button>
            </div>

            <span
              onClick={() => deleteItem(item.id)}
              className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl cursor-pointer"
            >
              <FaRegTrashAlt className="text-red-500 text-2xl" />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
        {/* delivery info */}
        <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
          <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>

          <div className="flex flex-col space-y-1">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 rounded-md bg-white"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="p-2 rounded-md bg-white"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full gap-5">
            <div className="flex flex-col space-y-1 w-full">
              <label>State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter your state"
                className="p-2 rounded-md w-full bg-white"
                value={form.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label>PostCode</label>
              <input
                type="text"
                name="postcode"
                placeholder="Enter your postcode"
                className="p-2 rounded-md w-full bg-white"
                value={form.postcode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="flex flex-col space-y-1 w-full">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="Enter your country"
                className="p-2 rounded-md w-full bg-white"
                value={form.country}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label>Phone No</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your Number"
                className="p-2 rounded-md w-full bg-white"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
            Submit
          </button>

          <div className="flex items-center justify-center w-full text-gray-700">
            ---------OR-----------
          </div>

          <div className="flex justify-center">
            <button
              onClick={getLocation}
              className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
            >
              Detect Location
            </button>
          </div>
        </div>

        {/* bill details */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
          <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>

          <div className="flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-gray-700">
              <LuNotebookText /> Items total
            </h1>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-gray-700">
              <MdDeliveryDining /> Delivery Charge
            </h1>
            <p className="text-red-500 font-semibold">
              <span className="text-gray-600 line-through">$25</span> FREE
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-gray-700">
              <GiShoppingBag /> Handling Charge
            </h1>
            <p className="text-red-500 font-semibold">${HANDLING_CHARGE}</p>
          </div>

          <hr className="text-gray-200 mt-2" />

          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-lg">Grand total</h1>
            <p className="font-semibold text-lg">
              ${(totalPrice + HANDLING_CHARGE).toFixed(2)}
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-gray-700 mb-3 mt-7">
              Apply Promo Code
            </h1>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter code"
                className="p-2 rounded-md w-full border border-gray-200"
              />
              <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                Apply
              </button>
            </div>
          </div>

          <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart