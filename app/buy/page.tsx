'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, ArrowRight, MapPin, Home, Building,
  Grid3x3, Warehouse, Shield, TrendingUp,
  CheckCircle, ChevronRight,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const propertyTypes = [
  { icon: Home, label: 'Flat/Apartment', count: '1,200+', color: 'from-blue-500 to-blue-600' },
  { icon: Building, label: 'Villa/House', count: '850+', color: 'from-emerald-500 to-emerald-600' },
  { icon: Grid3x3, label: 'Plot/Land', count: '600+', color: 'from-amber-500 to-amber-600' },
  { icon: Warehouse, label: 'Commercial', count: '400+', color: 'from-purple-500 to-purple-600' },
]

const areas = [
  { name: 'Gomti Nagar', range: '₹80L - ₹3.5Cr', count: '320+', tag: 'Premium' },
  { name: 'Hazratganj', range: '₹1Cr - ₹5Cr', count: '280+', tag: 'Premium' },
  { name: 'Indira Nagar', range: '₹60L - ₹2Cr', count: '450+', tag: 'Popular' },
  { name: 'Shaheed Path', range: '₹50L - ₹1.8Cr', count: '380+', tag: 'Growing' },
]

const steps = [
  { num: '1', title: 'Browse & Shortlist', desc: 'Explore properties using smart filters for budget, area, and type.' },
  { num: '2', title: 'Visit & Inspect', desc: 'Schedule site visits and inspect properties thoroughly.' },
  { num: '3', title: 'Negotiate & Verify', desc: 'Negotiate price and verify all legal documents.' },
  { num: '4', title: 'Close & Move In', desc: 'Complete the sale deed and move into your new home.' },
]

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-screen flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-900" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] -translate-y-1/2 border-[50px] border-gold-400/5 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-32 pb-16 lg:pt-40 lg:pb-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-8"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <TrendingUp className="h-3 w-3" /> Buy Property in Lucknow
              </div>
              <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold leading-[0.9] text-white tracking-tight">
                Find Your
                <br />
                <span className="text-gold-400">Dream Home</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/40 max-w-xl leading-relaxed">
                Browse thousands of verified properties for sale in Lucknow. From luxury apartments to independent houses.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/search"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                  style={{ clipPath: 'polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)' }}
                >
                  <Search className="h-4 w-4" /> Search Properties <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/for-sellers"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                  style={{ clipPath: 'polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)' }}
                >
                  I Want to Sell
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 max-w-2xl"
            >
              {[
                { num: '3,000+', label: 'Properties Listed' },
                { num: '50+', label: 'Localities' },
                { num: '95%', label: 'Verified Listings' },
                { num: '4.8★', label: 'User Rating' },
              ].map((s) => (
                <div key={s.label} className="bg-primary-500/80 backdrop-blur-sm p-5">
                  <p className="text-2xl font-bold text-gold-400">{s.num}</p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Property Types</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">What Are You Looking For?</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {propertyTypes.map((type, i) => (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/search?type=${type.label.toLowerCase().replace('/', '-')}`}
                    className="group block bg-white border border-gray-200 p-6 hover:shadow-lg transition-all"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center bg-gradient-to-br ${type.color} text-white mb-4`}
                      style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                    >
                      <type.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-500">{type.label}</h3>
                    <p className="text-sm text-gray-400 mt-1">{type.count} listings</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Popular Areas</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Best Areas to Buy in Lucknow</h2>
              <p className="mt-3 text-gray-400 max-w-lg">Most sought-after localities with average price ranges.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#F7F6F3] border border-gray-200 p-6 hover:border-primary-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary-100 text-primary-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 ${area.tag === 'Premium' ? 'bg-gold-100 text-gold-600' : area.tag === 'Popular' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {area.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500">{area.name}</h3>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Price</span>
                      <span className="font-semibold text-gray-800">{area.range}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Listings</span>
                      <span className="font-semibold text-gray-800">{area.count}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Your Journey</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">How to Buy in 4 Steps</h2>
            </motion.div>
            <div className="relative">
              <div className="hidden sm:block absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pb-12 last:pb-0"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center bg-primary-500 text-white shadow-md">
                    <span className="text-lg font-bold">{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider">Step {step.num}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-500">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-primary-50/50">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Why Choose Us</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Buy with Confidence</h2>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: 'Verified Properties', desc: 'All listings are verified for accurate details and legal status.' },
                { icon: CheckCircle, title: 'Legal Assistance', desc: 'Expert legal support for title verification and documentation.' },
                { icon: TrendingUp, title: 'Best Deals', desc: 'Get the best prices with our market insights and negotiation support.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center bg-white border border-gray-200 p-8 hover:shadow-md transition-all"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-primary-100 text-primary-500 mx-auto mb-4"
                    style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden"
              style={{ clipPath: 'polygon(28px 0, 100% 0, calc(100% - 28px) 100%, 0 100%)' }}
            >
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/5 to-transparent" />
              <div className="relative px-10 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
                    Ready to Find
                    <br />
                    <span className="text-gold-400">Your Dream Home?</span>
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-white/40 max-w-md leading-relaxed">
                    Start browsing thousands of verified properties in Lucknow today.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/search"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Browse Properties <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
