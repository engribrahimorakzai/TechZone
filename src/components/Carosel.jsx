import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { getData } from '../context/DataContext'

const Carosel = () => {
  const { data, loading, error, fetchAllProducts } = getData()

  // loading 
  if (loading || error || !data || data.length === 0) {
    return (
      <div className="h-150 bg-[#0f0c29] flex flex-col items-center justify-center text-white gap-4">
        {loading && <p className="text-xl">Loading products...</p>}
        {error && (
          <>
            <p className="text-red-400 text-xl">Data are not available: {error}</p>
            <button
              onClick={fetchAllProducts}
              className="bg-red-500 px-4 py-2 rounded-md cursor-pointer"
            >
              try again
            </button>
          </>
        )}
        {!loading && !error && <p>Koi product nahi mila</p>}
      </div>
    )
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay, Navigation]}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      slidesPerView={1}
    >
      {data.slice(0, 7).map((item) => (
        <SwiperSlide key={item.id}>
          <div className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="flex gap-10 justify-center h-150 items-center px-4">
              {/* Left: text */}
              <div className="space-y-6">
                <h3 className="text-red-500 font-semibold font-sans text-sm">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="text-4xl font-bold uppercase line-clamp-3 md:w-125 text-white">
                  {item.title}
                </h1>
                <p className="md:w-125 line-clamp-3 text-gray-400 pr-7">
                  {item.description}
                </p>
                <button className="bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
                  Shop Now
                </button>
              </div>

              {/* Right: image */}
              <div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-full w-96 h-96 object-contain bg-white p-6 hover:scale-105 transition-all shadow-2xl shadow-red-400"
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