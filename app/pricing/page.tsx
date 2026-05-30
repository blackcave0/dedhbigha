'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle, Crown, Shield,
  ArrowRight, Star, Zap, BarChart3,
  Image, MessageCircle, TrendingUp,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const plans = [
  {
    name: 'Free', price: '₹0', period: 'forever',
    desc: 'List your property and reach buyers at no cost.',
    icon: Shield,
    features: [
      { text: 'Standard Property Listing', included: true },
      { text: 'Up to 5 Photos', included: true },
      { text: 'Basic Search Visibility', included: true },
      { text: 'Email Support', included: true },
      { text: 'Featured Placement', included: false },
      { text: 'Listing Analytics', included: false },
      { text: 'Verified Badge', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Premium', price: '₹999', period: '/year',
    desc: 'Maximum exposure and priority features for serious sellers.',
    icon: Crown,
    features: [
      { text: 'Featured Placement', included: true },
      { text: 'Higher Visibility in Search', included: true },
      { text: 'Up to 20 Photos', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Listing Analytics Dashboard', included: true },
      { text: 'Verified Owner Badge', included: true },
      { text: 'Standard Property Listing', included: true },
      { text: 'Email Support', included: true },
    ],
    cta: 'Upgrade to Premium',
    popular: true,
  },
]

const comparisons = [
  { feature: 'Property Listing', free: '1 Listing', premium: 'Up to 5 Listings' },
  { feature: 'Photos per Listing', free: '5 Photos', premium: '20 Photos' },
  { feature: 'Search Visibility', free: 'Standard', premium: 'Featured & Priority' },
  { feature: 'Verified Badge', free: false, premium: true },
  { feature: 'Listing Analytics', free: false, premium: true },
  { feature: 'Customer Support', free: 'Email', premium: 'Priority (Phone + Chat)' },
  { feature: 'Lead Alerts', free: 'Basic', premium: 'Instant Notifications' },
  { feature: 'Social Media Promotion', free: false, premium: true },
]

const benefits = [
  { icon: Star, title: 'Featured Placement', desc: 'Your properties appear at the top of search results and category pages.' },
  { icon: TrendingUp, title: '5x More Views', desc: 'Premium listings get significantly more visibility compared to standard listings.' },
  { icon: Image, title: 'Up to 20 Photos', desc: 'Showcase your property with more high-quality photos to attract buyers.' },
  { icon: BarChart3, title: 'Listing Analytics', desc: 'Track views, inquiries, and engagement on your listings with detailed insights.' },
  { icon: MessageCircle, title: 'Priority Support', desc: 'Dedicated support line for premium members with faster response times.' },
  { icon: Zap, title: '3x Faster Sales', desc: 'Premium listings sell faster thanks to enhanced visibility and trust signals.' },
]

function DiagonalGrid({ className }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pdg" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pdg)" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[60vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-900" />
          <div className="text-white/5"><DiagonalGrid /></div>
          <div className="absolute top-20 -right-32 w-[400px] h-[400px] border-[40px] border-gold-400/5 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <Crown className="h-3 w-3" /> Pricing & Plans
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Pick Your{' '}
                <span className="text-gold-400">Perfect Plan</span>
              </h1>
              <p className="mt-5 text-lg text-white/40 max-w-xl mx-auto">Start free. Upgrade when you need more.</p>
            </motion.div>
          </div>
        </section>

        {/* ═══ PLANS — spec sheet layout ═══ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-12 relative z-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-6 items-stretch">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  <div className={`h-full bg-white ${plan.popular ? 'border-2 border-gold-400 shadow-xl shadow-gold-500/10' : 'border border-gray-200 shadow-sm'}`}>
                    {plan.popular && (
                      <div className="px-6 pt-5 pb-0">
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-gold-400 to-gold-500 text-primary-900 text-xs font-bold shadow-md"
                          style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                        >
                          <Star className="h-3 w-3" /> MOST POPULAR
                        </span>
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`flex h-10 w-10 items-center justify-center ${plan.popular ? 'bg-gold-100 text-gold-500' : 'bg-primary-100 text-primary-500'}`}
                          style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                        >
                          <plan.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-primary-500">{plan.name}</h3>
                          <p className="text-xs text-gray-400">{plan.desc}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="font-heading text-4xl font-bold text-primary-500">{plan.price}</span>
                        <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                      </div>
                      <ul className="mt-6 space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f.text} className="flex items-start gap-2.5 text-sm">
                            {f.included ? (
                              <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${plan.popular ? 'text-gold-500' : 'text-green-500'}`} />
                            ) : (
                              <span className="flex h-4 w-4 shrink-0 mt-0.5 items-center justify-center">
                                <span className="h-2 w-2 rounded-full bg-gray-200" />
                              </span>
                            )}
                            <span className={f.included ? 'text-gray-700' : 'text-gray-400'}>{f.text}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/post-property"
                        className={`mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 font-bold text-sm transition-all ${
                          plan.popular
                            ? 'bg-gold-400 text-primary-900 hover:bg-gold-500'
                            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                        }`}
                        style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                      >
                        {plan.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BENEFITS — feature grid with offset ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Premium Benefits</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">What You Get</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-[#F7F6F3] p-6 border border-gray-100 hover:border-gold-300 hover:bg-gold-50/50 transition-all group ${i % 3 === 1 ? 'sm:translate-y-4' : ''} ${i % 3 === 2 ? 'sm:-translate-y-2' : ''}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-gradient-to-br from-gold-100 to-amber-50 text-gold-500 mb-4 group-hover:from-gold-400 group-hover:to-gold-500 group-hover:text-white transition-all"
                    style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                  >
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-primary-500">{b.title}</h3>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPARISON — visual feature tracks ═══ */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Compare</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Side by Side</h2>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-primary-500 text-white mb-0">
                <div className="p-4 pl-6"><span className="text-xs font-semibold uppercase tracking-wider">Feature</span></div>
                <div className="p-4 text-center border-l border-white/10"><span className="text-xs font-semibold uppercase tracking-wider">Free</span></div>
                <div className="p-4 text-center border-l border-white/10"><span className="text-xs font-semibold uppercase tracking-wider text-gold-400">Premium</span></div>
              </div>
              <div className="border border-t-0 border-gray-200">
                {comparisons.map((row, i) => (
                  <motion.div
                    key={row.feature}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={`grid grid-cols-[1fr_1fr_1fr] items-center transition-colors hover:bg-primary-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <div className="p-4 pl-6">
                      <span className="text-sm font-medium text-gray-700">{row.feature}</span>
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
                        <span className="text-sm text-gray-500">{row.free}</span>
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
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="text-white/5"><DiagonalGrid /></div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/5 to-transparent" />
              <div className="relative px-10 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
                    Ready to Get
                    <br />
                    <span className="text-gold-400">Started?</span>
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-white/40 max-w-md leading-relaxed">
                    Join thousands of property owners who trust DedhBigha. Post your first listing free.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/post-property"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Post Property Free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/for-sellers"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Learn More
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
