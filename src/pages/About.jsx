import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const stats = [
  { label: 'Verified Devices Sold', value: '50,000+' },
  { label: 'Customer Satisfaction', value: '99.4%' },
  { label: 'Authorized Tech Brands', value: '150+' },
  { label: 'Support Response Time', value: '< 15 mins' },
]

const values = [
  {
    icon: Award,
    title: 'Certified Authenticity',
    description:
      'Every gadget and electronic component is sourced directly from certified original manufacturers with factory warranties.',
  },
  {
    icon: Zap,
    title: 'High-Performance Tech',
    description:
      'We curate the finest computing, mobile, and audio gear engineered for creators, gamers, and modern professionals.',
  },
  {
    icon: ShieldCheck,
    title: 'Buyer Protection',
    description:
      'Every order is backed by comprehensive 30-day return guarantees and end-to-end encrypted payment security.',
  },
  {
    icon: Users,
    title: 'Customer-Centric Care',
    description:
      'Our dedicated team of hardware enthusiasts is available 24/7 to help you configure, troubleshoot, and pick the right device.',
  },
]

const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 sm:py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT TECHZONE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Powering Your World with Next-Generation Electronics
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded with a passion for innovation, <strong className="text-slate-900 dark:text-white">TechZone</strong> is an authorized electronics retailer bringing cutting-edge technology, smart home devices, and computing essentials directly to your doorstep.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1 transition-colors duration-200"
            >
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors duration-200">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Mission
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Making Premium Technology Seamless & Accessible
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We bridge the gap between premium global electronics and enthusiasts worldwide. Our platform eliminates counterfeit risks by providing guaranteed genuine products, transparent pricing, and rapid express delivery.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Our Vision
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Shaping Tomorrow's Digital Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              As technology rapidly transforms every aspect of daily life, TechZone aims to remain the most trusted platform for discovering, evaluating, and purchasing breakthrough electronics.
            </p>
          </div>
        </div>

        {/* Core Pillars / Values */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Customers Trust TechZone
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Engineered from the ground up for a safe, modern online shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs space-y-4 transition-colors duration-200">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Ready to Upgrade Your Tech Experience?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Explore thousands of cutting-edge electronics, audio devices, and computer accessories with free delivery today.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              Start Exploring Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About