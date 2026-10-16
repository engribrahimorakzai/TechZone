import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { getData } from '../context/DataContext'

const Carosel = () => {
  const { data, loading, error, fetchAllProducts } = getData()
  const navigate = useNavigate()

  if (loading || error || !data || data.length === 0) {
    return (
      <div className="min-h-[460px] md:min-h-[540px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center text-white gap-4 px-4 text-center">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-300">Loading premium electronics...</p>
          </div>
        )}
        {error && (
          <div className="max-w-md p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <p className="text-red-400 text-base font-medium mb-3">Unable to fetch products: {error}</p>
            <button
              onClick={fetchAllProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-slate-950">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        className="w-full"
      >
        {data.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center">
              {/* Subtle tech background glow */}
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Headline and Content */}
                  <div className="space-y-4 sm:space-y-6 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="uppercase tracking-wider">Premium Selection • 2026 Edition</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight lg:leading-tight">
                      {item.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 max-w-xl line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">
                        PKR {item.price}
                        {item.discountPercentage && (
                          <span className="ml-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full align-middle">
                            {Math.round(item.discountPercentage)}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
                      <button
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
                      >
                        Shop Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate('/products')}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm sm:text-base font-semibold px-5 py-3 rounded-xl backdrop-blur-xs transition cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> 1-Year Official Warranty
                      </span>
                      <span>•</span>
                      <span>Free Express Shipping</span>
                    </div>
                  </div>

                  {/* Right Column: Product Image Showcase */}
                  <div className="flex justify-center items-center relative z-10">
                    <div className="relative group cursor-pointer" onClick={() => navigate(`/products/${item.id}`)}>
                      {/* Ambient pedestal glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />

                      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 flex items-center justify-center border border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain filter drop-shadow-xl"
                        />

                        {/* Floating Brand Tag */}
                        {item.brand && (
                          <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-slate-700">
                            {item.brand}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carosel