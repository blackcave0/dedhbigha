'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, ArrowRight, MapPin, Home, Building,
  Grid3x3, Warehouse, Shield, CheckCircle,
  FileText, Clock, Users,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const propertyTypes = [
  { icon: Home, label: 'Flat/Apartment', count: '1,800+', color: 'from-blue-500 to-blue-600' },
  { icon: Building, label: 'Independent House', count: '600+', color: 'from-emerald-500 to-emerald-600' },
  { icon: Grid3x3, label: 'PG/Co-living', count: '300+', color: 'from-amber-500 to-amber-600' },
  { icon: Warehouse, label: 'Commercial', count: '200+', color: 'from-purple-500 to-purple-600' },
]

const areas = [
  { name: 'Gomti Nagar', rent: '₹12K - ₹25K', count: '450+', tag: 'Premium' },
  { name: 'Indira Nagar', rent: '₹8K - ₹18K', count: '390+', tag: 'Popular' },
  { name: 'Hazratganj', rent: '₹15K - ₹35K', count: '320+', tag: 'Premium' },
  { name: 'Aliganj', rent: '₹8K - ₹15K', count: '280+', tag: 'Affordable' },
]

const steps = [
  { icon: Search, title: 'Search & Filter', desc: 'Browse thousands of rental properties using smart filters for budget and area.' },
  { icon: MapPin, title: 'Visit & Inspect', desc: 'Schedule visits and inspect the property condition thoroughly.' },
  { icon: FileText, title: 'Agreement & Deposit', desc: 'Review rental agreement, negotiate terms, and complete documentation.' },
  { icon: Home, title: 'Move In', desc: 'Complete formalities, get the keys, and move into your new home.' },
]

export default function RentPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-500/5 to-white pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-500/3 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 bg-gold-500/10 px-4 py-2">
                Rent Property in Lucknow
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-500 mt-6 leading-[1.05]">
                Find Your Perfect
                <br />
                <span className="text-gold-500">Rental Home</span>
              </h1>
              <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto">
                Browse thousands of rental properties in Lucknow. From budget-friendly apartments to luxury villas.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/search?type=rent"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-all"
                >
                  <Search className="h-4 w-4" /> Search Rentals <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/for-tenants"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-400 transition-all"
                >
                  Tenant Resources
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4"
            >
              {[
                { icon: MapPin, label: '3,200+ rental listings' },
                { icon: Users, label: '15,000+ happy tenants' },
                { icon: Shield, label: 'Verified properties' },
                { icon: Clock, label: 'Fast move-in process' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="flex h-8 w-8 items-center justify-center bg-primary-100 text-primary-500">
                    <s.icon className="h-4 w-4" />
                  </span>
                  {s.label}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Rental Types</span>
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
                    href={`/search?type=rent&propertyType=${type.label.toLowerCase().replace('/', '-')}`}
                    className="group block bg-[#F7F6F3] border border-gray-200 p-6 hover:border-primary-200 hover:shadow-sm transition-all"
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

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-primary-50/50">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Popular Areas</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Best Areas to Rent in Lucknow</h2>
              <p className="mt-3 text-gray-500 max-w-lg">Most sought-after rental localities with average rent ranges.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 p-6 hover:border-primary-200 transition-all"
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
                      <span className="text-gray-500">Avg. Rent</span>
                      <span className="font-semibold text-gray-800">{area.rent}</span>
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

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Your Journey</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">How to Rent in 4 Steps</h2>
            </motion.div>
            <div className="relative">
              <div className="hidden sm:block absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pb-12 last:pb-0"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center bg-primary-500 text-white shadow-md">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider">Step {i + 1}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-500">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-primary-50/50">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Why Rent with Us</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Rent with Confidence</h2>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: 'Verified Listings', desc: 'All rental listings are verified for accuracy and authenticity.' },
                { icon: CheckCircle, title: 'No Broker Fee', desc: 'Connect directly with property owners. No middlemen, no hidden fees.' },
                { icon: FileText, title: 'Rental Agreement Support', desc: 'Get expert guidance on rental agreements and tenant rights.' },
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

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary-500"
            >
              <div className="px-10 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24 text-center">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
                  Ready to Find Your
                  <br />
                  <span className="text-gold-400">Perfect Rental?</span>
                </h2>
                <p className="mt-4 text-lg text-white/60 max-w-lg mx-auto">
                  Start browsing thousands of rental properties in Lucknow right now.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/search?type=rent"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                  >
                    Browse Rentals <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                  >
                    Get Help
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
