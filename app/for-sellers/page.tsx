'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  TrendingUp, ArrowRight, CheckCircle, Crown,
  MessageCircle, ChevronRight, Star, Shield,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const heroStats = [
  { num: '2,500+', label: 'Properties Listed' },
  { num: '95%', label: 'Genuine Inquiries' },
  { num: '3x', label: 'More Views' },
  { num: '48hr', label: 'Avg. Response' },
]

const benefits = [
  { stat: '10,000+', label: 'Monthly Visitors', desc: 'Active buyers and tenants browsing listings every month.', color: 'from-blue-500 to-blue-700' },
  { stat: '95%', label: 'Genuine Inquiries', desc: 'Of all inquiries come from verified, serious prospects.', color: 'from-emerald-500 to-emerald-700' },
  { stat: '3x', label: 'More Views', desc: 'Listings get compared to standard platforms.', color: 'from-amber-400 to-amber-600' },
  { stat: '48hr', label: 'Avg. Response', desc: 'Average time to first serious inquiry after listing.', color: 'from-violet-500 to-violet-700' },
]

const steps = [
  { num: '1', title: 'Add Property Details', desc: 'Fill in type, location, price, and specs.' },
  { num: '2', title: 'Upload Photos', desc: 'Add high-quality images to attract buyers.' },
  { num: '3', title: 'Publish Listing', desc: 'Review and go live in minutes.' },
]

const testimonials = [
  { name: 'Amit Sharma', role: 'Property Owner, Gomti Nagar', text: 'Listed my 3BHK and got genuine buyers within a week. The premium plan was worth every rupee.', rating: 5 },
  { name: 'Priya Singh', role: 'Real Estate Agent', text: 'DedhBigha has become my primary platform for listings. Great visibility and excellent support.', rating: 5 },
  { name: 'Rajesh Verma', role: 'Builder, Shaheed Path', text: 'The project listings feature helped us reach the right audience for our new launch.', rating: 5 },
]

function DiagonalGrid({ className }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-grid" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
    </svg>
  )
}

export default function ForSellersPage() {
  const [tIdx, setTIdx] = useState(0)

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        {/* ═══ HERO — full-screen typographic ═══ */}
        <section className="relative min-h-screen flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-900" />
          <div className="text-white/5">
            <DiagonalGrid />
          </div>
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] -translate-y-1/2 border-[50px] border-gold-400/5 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 border-[30px] border-white/[0.03] rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-32 pb-16 lg:pt-40 lg:pb-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-8"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <TrendingUp className="h-3 w-3" /> For Property Owners &amp; Agents
              </div>
              <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold leading-[0.9] text-white tracking-tight">
                Sell or
                <br />
                <span className="text-gold-400">Rent Faster</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/40 max-w-xl leading-relaxed">
                Join 2,500+ property owners listing on Lucknow&apos;s fastest growing real estate platform.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/post-property"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                  style={{ clipPath: 'polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)' }}
                >
                  Post Your Property <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                  style={{ clipPath: 'polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)' }}
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 max-w-2xl"
            >
              {heroStats.map((s) => (
                <div key={s.label} className="bg-primary-500/80 backdrop-blur-sm p-5">
                  <p className="text-2xl font-bold text-gold-400">{s.num}</p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ BY THE NUMBERS — color-blocked ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">By the Numbers</span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3 leading-[1.05]">
                  Data That
                  <br />
                  <span className="text-gold-500">Speaks</span>
                </h2>
                <p className="mt-4 text-base text-gray-400 leading-relaxed">Every number represents real results for property owners like you.</p>
              </motion.div>
              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`relative overflow-hidden ${i % 2 === 0 ? 'sm:-translate-y-2' : 'sm:translate-y-2'}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-90`} />
                    <div className="relative p-6 sm:p-7 h-full flex flex-col justify-between">
                      <p className="text-4xl font-bold text-white">{b.stat}</p>
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">{b.label}</p>
                        <p className="text-xs text-white/50 mt-2 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS — connected journey ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white overflow-hidden">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Simple Process</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Start in 3 Steps</h2>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-0 relative">
              <div className="hidden lg:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-gold-400 via-primary-300 to-gold-400" />
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center lg:px-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-primary-500 text-white text-lg font-bold relative z-10"
                    style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary-500 mt-6 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING — comparison explorer ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Pricing</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Pick Your Plan</h2>
              <p className="mt-3 text-base text-gray-400 max-w-lg mx-auto">Free to start. Premium to dominate.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] mb-0 rounded-t-lg overflow-hidden">
                <div className="p-4" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 text-center bg-white border border-gray-200 border-r-0"
                >
                  <Shield className="h-6 w-6 mx-auto text-primary-500" />
                  <p className="text-sm font-bold text-primary-500 mt-1 uppercase tracking-wider">Free</p>
                  <p className="text-3xl font-bold text-primary-500 mt-2">₹0</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">forever</p>
                  <div className="mt-4">
                    <Link
                      href="/post-property"
                      className="block w-full py-2.5 text-xs font-bold text-primary-500 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
                      style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                    >
                      Start Free
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  className="p-5 text-center bg-gradient-to-b from-gold-50 to-white border-2 border-gold-400 relative z-10"
                >
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-gold-400 to-gold-500 text-primary-900 text-[10px] font-bold uppercase tracking-[0.15em] mb-3 shadow-md"
                    style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                  >
                    ★ Most Popular
                  </span>
                  <Crown className="h-6 w-6 mx-auto text-gold-500" />
                  <p className="text-sm font-bold text-gold-600 mt-1 uppercase tracking-wider">Premium</p>
                  <p className="text-3xl font-bold text-primary-500 mt-2">₹999</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">per year</p>
                  <div className="mt-4">
                    <Link
                      href="/post-property"
                      className="block w-full py-2.5 text-xs font-bold text-primary-900 bg-gold-400 hover:bg-gold-500 transition-colors text-center"
                      style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                    >
                      Go Premium →
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
                {[
                  { feat: 'Standard Listing', free: true, premium: true },
                  { feat: 'Up to 5 Photos', free: true, premium: true },
                  { feat: 'Listing Visibility', free: 'Basic', premium: 'Featured' },
                  { feat: 'Customer Support', free: 'Email', premium: 'Priority' },
                  { feat: 'Listing Analytics', free: false, premium: true },
                  { feat: 'Verified Badge', free: false, premium: true },
                ].map((row, i) => (
                  <motion.div
                    key={row.feat}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`grid grid-cols-[1.3fr_1fr_1fr] items-center transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-primary-50/60`}
                  >
                    <div className="p-4 pl-6 flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary-100 text-primary-500 text-[10px] font-bold"
                        style={{ clipPath: 'polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="text-sm font-semibold text-primary-500">{row.feat}</span>
                    </div>
                    <div className="p-4 text-center border-l border-gray-100">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center bg-green-100 text-green-600 rounded-full">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center bg-gray-100 text-gray-300 rounded-full">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </span>
                        )
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{row.free}</span>
                      )}
                    </div>
                    <div className="p-4 text-center border-l border-gray-100">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center bg-gold-100 text-gold-600 rounded-full">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center bg-gray-100 text-gray-300 rounded-full">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </span>
                        )
                      ) : (
                        <span className="text-sm font-medium text-gold-600">{row.premium}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-gold-500 transition-colors group"
                >
                  View detailed pricing &amp; full feature list <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ TRUSTED BY — rotating testimonial ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Trusted By</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">What Sellers Say</h2>
            </motion.div>
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-6xl font-heading text-gold-300 leading-none mb-4 select-none">&ldquo;</div>
                  <p className="text-xl sm:text-2xl text-primary-500 font-heading leading-relaxed italic">
                    {testimonials[tIdx].text}
                  </p>
                  <div className="flex justify-center gap-1 mt-6">
                    {Array.from({ length: testimonials[tIdx].rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-bold text-primary-500">{testimonials[tIdx].name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{testimonials[tIdx].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === tIdx ? 'w-8 bg-gold-400' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden"
              style={{ clipPath: 'polygon(28px 0, 100% 0, calc(100% - 28px) 100%, 0 100%)' }}
            >
              <div className="text-white/5">
                <DiagonalGrid />
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/5 to-transparent" />
              <div className="relative px-10 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
                    Ready to List
                    <br />
                    <span className="text-gold-400">Your Property?</span>
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-white/40 max-w-md leading-relaxed">
                    Join thousands of property owners who trust DedhBigha. Post your first listing for free.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/post-property"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Post Property Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    <MessageCircle className="h-4 w-4" /> Talk to Us
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
