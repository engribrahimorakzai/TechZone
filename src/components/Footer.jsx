import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Send,
} from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                TZ
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Tech<span className="text-blue-500">Zone</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Your premier destination for verified next-generation electronics, high-performance computing, smart accessories, and premium audio.
            </p>

            <div className="space-y-2 text-xs sm:text-sm pt-1">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>F10 Islamabad Pakistan </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Email: engribrahimkhanokz@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Phone: 03335391919</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedinIn, href: 'https://github.com/engribrahimorakzai' },
                { icon: FaGithub, href: 'https://github.com/engribrahimorakzai/TechZone' },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Shop & Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/products" className="hover:text-blue-400 transition">
                  All Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/smartphones" className="hover:text-blue-400 transition">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="hover:text-blue-400 transition">
                  Laptops & PC
                </Link>
              </li>
              <li>
                <Link to="/category/mobile-accessories" className="hover:text-blue-400 transition">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Support & Trust
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About TechZone
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">
                  Contact Support
                </Link>
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Order Tracking
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Warranty & Returns
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Stay Connected
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Subscribe to get exclusive tech drops, VIP deals, and weekly release updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-slate-500 block">
                🔒 We respect your privacy. Unsubscribe anytime.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">TechZone</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> 256-Bit SSL Encrypted
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <CreditCard className="w-4 h-4 text-blue-500" /> Verified Payment Gateway
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer