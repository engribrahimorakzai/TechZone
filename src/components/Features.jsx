import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    text: 'Free Express Shipping',
    subtext: 'Free delivery on all tech orders over PKR 5,000',
  },
  {
    icon: ShieldCheck,
    text: '2-Year Official Warranty',
    subtext: '100% genuine guaranteed products',
  },
  {
    icon: RefreshCw,
    text: '30-Day Hassle-Free Returns',
    subtext: 'Quick refunds and easy replacement',
  },
  {
    icon: Headphones,
    text: '24/7 Tech Expert Support',
    subtext: 'Dedicated technical assistance anytime',
  },
]

const Features = () => {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{feature.text}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{feature.subtext}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features