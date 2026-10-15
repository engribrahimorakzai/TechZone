
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { getData } from '../context/DataContext'

const Carosel = () => {
  const { data, loading, error, fetchAllProducts } = getData()
  const navigate = useNavigate()

  if (loading || error || !data || data.length === 0) {
    return (
      <div className="h-96 md:h-150 bg-[#0f0c29] flex flex-col items-center justify-center text-white gap-4 px-4 text-center">
        {loading && <p className="text-xl">Loading products...</p>}
        {error && (
          <>
            <p className="text-red-400 text-xl">Data load nahi hua: {error}</p>
            <button
              onClick={fetchAllProducts}
              className="bg-red-500 px-4 py-2 rounded-md cursor-pointer"
            >
              try again
            </button>
          </>
        )}
        {!loading && !error && <p className="text-xl"></p>}
      </div>
    )
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay, Navigation]}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop
      slidesPerView={1}
    >
      {data.slice(0, 7).map((item) => (
        <SwiperSlide key={item.id}>
          <div className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 justify-center items-center h-150 px-4 pb-8 md:pb-0">
              {/* text */}
              <div className="space-y-3 md:space-y-6 text-center md:text-left md:w-1/2 lg:w-125">
                <h3 className="text-red-500 font-semibold font-sans text-xs md:text-sm">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase line-clamp-3 text-white">
                  {item.title}
                </h1>
                <p className="line-clamp-2 md:line-clamp-3 text-gray-400 text-sm md:text-base">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="bg-linear-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Shop Now
                </button>
              </div>

              {/* image */}
              <div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain bg-white p-4 md:p-6 hover:scale-105 transition-all shadow-2xl shadow-red-400"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carosel