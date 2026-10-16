import { Link } from 'react-router-dom'
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const MidBanner = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
          {/* Ambient lighting glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Zap className="w-3.5 h-3.5 fill-blue-400" />
              <span>LIMITED TIME TECH EVENT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Upgrade Your Setup with Next-Gen Devices & Accessories
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover verified premium electronics, smart accessories, and cutting-edge audio gear. Enjoy free express shipping on all orders today.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Certified Authentic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Fast 48h Dispatch
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Secure Checkout
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
              >
                Explore Deals & Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MidBanner