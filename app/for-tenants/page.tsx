'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, ArrowRight, MapPin, Users, Shield, CheckCircle,
  Scale, FileText, HelpCircle, AlertTriangle, Lock,
  Home, Building,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const resources = [
  {
    icon: Search, color: 'bg-primary-500',
    title: 'Rental Search Guide',
    desc: 'Learn how to find the perfect rental property in Lucknow.',
    items: ['Best areas for rent in Lucknow', 'How to set a rental budget', 'Questions to ask before renting', 'Rental agreement checklist'],
  },
  {
    icon: Scale, color: 'bg-gold-500',
    title: 'Tenant Rights & Responsibilities',
    desc: 'Know what landlords can and cannot do.',
    items: ['Rights under Indian tenancy laws', 'Security deposit regulations', 'Maintenance responsibilities', 'Notice period requirements'],
  },
  {
    icon: FileText, color: 'bg-primary-500',
    title: 'Rental Agreement Basics',
    desc: 'Key clauses, duration, and termination explained.',
    items: ['Essential clauses in rent agreement', 'Duration and renewal terms', 'Stamp duty and registration', 'Termination conditions'],
  },
  {
    icon: HelpCircle, color: 'bg-gold-500',
    title: 'Frequently Asked Questions',
    desc: 'Answers to common renting questions.',
    items: ['How much deposit is normal?', 'Can landlord increase rent anytime?', 'What if repairs are not done?', 'How to break a lease early?'],
  },
  {
    icon: AlertTriangle, color: 'bg-primary-500',
    title: 'Scam Prevention Tips',
    desc: 'Identify and avoid common rental scams.',
    items: ['Fake listing red flags', 'Never pay before viewing', 'Verify property ownership', 'Use secure payment methods'],
  },
  {
    icon: Lock, color: 'bg-gold-500',
    title: 'Safety Guidelines',
    desc: 'Stay safe when moving into a new rental.',
    items: ['Inspect locks and security', 'Document property condition', 'Emergency contact list', 'Neighbourhood safety check'],
  },
]

const areas = [
  { name: 'Gomti Nagar', range: '₹12K - ₹25K', count: '450+ listings', tag: 'Premium' },
  { name: 'Hazratganj', range: '₹15K - ₹35K', count: '320+ listings', tag: 'Premium' },
  { name: 'Aliganj', range: '₹8K - ₹18K', count: '280+ listings', tag: 'Affordable' },
  { name: 'Indira Nagar', range: '₹10K - ₹22K', count: '390+ listings', tag: 'Popular' },
]

export default function ForTenantsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        {/* ═══ HERO — centered bold ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-500/5 to-white pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-500/3 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 bg-gold-500/10 px-4 py-2">
                For Tenants &amp; Renters
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-500 mt-6 leading-[1.05]">
                Find Your Perfect
                <br />
                <span className="text-gold-500">Rental Home</span>
              </h1>
              <p className="mt-5 text-lg text-gray-500 max-w-lg mx-auto">
                Your complete resource for finding and renting the perfect property in Lucknow. From search tips to legal guidance.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/search?type=rent"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-all"
                >
                  Search Rentals <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-400 transition-all"
                >
                  Read Guides
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
                { icon: MapPin, label: '2,500+ properties' },
                { icon: Users, label: '10,000+ happy tenants' },
                { icon: Shield, label: 'Verified listings' },
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

        {/* ═══ QUICK STATS ═══ */}
        <section className="py-10 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { num: '2,500+', label: 'Rental Listings' },
                { num: '50+', label: 'Localities' },
                { num: '10K+', label: 'Happy Tenants' },
                { num: '4.8★', label: 'User Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-primary-500">{s.num}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ KNOWLEDGE HUB — 2-col wide cards ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Knowledge Hub</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-2">Everything You Need to Know</h2>
              <p className="mt-3 text-gray-500">Curated resources to help you find, evaluate, and secure the perfect rental in Lucknow.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {resources.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className={`h-1 w-full ${r.color}`} />
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`flex h-11 w-11 items-center justify-center ${r.color} text-white`}>
                        <r.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-primary-500">{r.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{r.desc}</p>
                    <ul className="space-y-2">
                      {r.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ POPULAR AREAS ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-primary-50/50">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Popular Areas</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-2">Where to Rent in Lucknow</h2>
              <p className="mt-3 text-gray-500 max-w-lg">Most sought-after localities with average rental ranges.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 p-6 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary-100 text-primary-500">
                      <Building className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 ${area.tag === 'Premium' ? 'bg-gold-100 text-gold-600' : area.tag === 'Affordable' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {area.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500">{area.name}</h3>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Rent</span>
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

        {/* ═══ STEPS — vertical timeline ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Your Journey</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-2">How to Rent in 4 Steps</h2>
            </motion.div>
            <div className="relative">
              <div className="hidden sm:block absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />
              {[
                { icon: Search, title: 'Search & Filter', desc: 'Browse thousands of rental properties using smart filters for budget, area, and BHK type.' },
                { icon: MapPin, title: 'Visit & Inspect', desc: 'Schedule visits to shortlisted properties. Inspect condition and neighborhood carefully.' },
                { icon: FileText, title: 'Agreement & Deposit', desc: 'Review the rental agreement, negotiate terms, and complete the documentation.' },
                { icon: Home, title: 'Move In', desc: 'Complete formalities, get the keys, and move into your new home.' },
              ].map((step, i) => (
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

        {/* ═══ TIPS ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-primary-50/50">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Pro Tips</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-2">Rental Tips for New Tenants</h2>
              <p className="mt-3 text-gray-500 max-w-lg">Essential advice from experienced renters to help you avoid common mistakes.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Always visit the property in person before paying any deposit.',
                'Verify the property owner identity through property tax receipts.',
                'Read the rental agreement thoroughly before signing.',
                'Document the property condition with photos at move-in.',
                'Keep a copy of the signed rental agreement and receipts.',
                'Know the emergency contacts in your neighborhood.',
              ].map((tip, i) => (
                <motion.div
                  key={tip}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-white border border-gray-200 p-5 hover:border-primary-200 transition-all"
                >
                  <span className="flex h-7 w-7 items-center justify-center bg-primary-100 text-primary-500 text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-6xl">
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
                  <span className="text-gold-400">Perfect Home?</span>
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
