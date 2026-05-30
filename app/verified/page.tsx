'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, CheckCircle, BadgeCheck, Users,
  Home, TrendingUp, Star, ArrowRight,
  Fingerprint, Award, FileCheck,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const types = [
  {
    icon: BadgeCheck, color: 'from-blue-400 to-blue-500',
    title: 'Verified Seller',
    desc: 'Sellers who have completed identity verification and have a track record of genuine listings.',
    items: ['Identity verified', 'Listings reviewed', 'Contact confirmed', 'Trust badge'],
  },
  {
    icon: Users, color: 'from-emerald-400 to-emerald-500',
    title: 'Verified Buyer',
    desc: 'Buyers with verified identity and genuine interest in property transactions.',
    items: ['Identity verified', 'Financial capability', 'Serious inquiries', 'Priority access'],
  },
  {
    icon: Home, color: 'from-amber-400 to-amber-500',
    title: 'Verified Property',
    desc: 'Properties that have been verified for accurate details, legal status, and ownership.',
    items: ['Title verified', 'Photos authenticated', 'Legal check done', 'Accurate details'],
  },
]

const benefits = [
  { icon: BadgeCheck, title: 'Trust Badge', desc: 'Get a verified badge that builds trust with potential buyers and tenants.' },
  { icon: TrendingUp, title: 'Better Visibility', desc: 'Verified listings appear higher in search results and get more views.' },
  { icon: Star, title: 'Quality Leads', desc: 'Serious buyers prefer verified listings, leading to better quality inquiries.' },
  { icon: Shield, title: 'Fraud Protection', desc: 'Verification helps protect against fraudulent listings and builds marketplace trust.' },
]

export default function VerifiedPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[70vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute top-20 right-20 w-64 h-64 border-[30px] border-gold-400/10 rounded-full" />
          <div className="absolute bottom-10 left-10 w-40 h-40 border-[20px] border-white/5 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <Shield className="h-3 w-3" /> Trust & Verification
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Verified by{' '}
                <span className="text-gold-400">DedhBigha</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Our verification system builds trust and ensures a safe property marketplace for everyone.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Verification Types</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">Three Levels of Trust</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {types.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all p-6"
                  style={{ clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 100%, 16px 100%)' : 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
                >
                  <div className={`flex h-11 w-11 items-center justify-center bg-gradient-to-br ${v.color} text-white mb-4`}
                    style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                  >
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary-500 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{v.desc}</p>
                  <ul className="space-y-1.5">
                    {v.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Benefits</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">Why Get Verified?</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-green-50 text-green-500 mx-auto mb-4"
                    style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}
                  >
                    <b.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Process</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">How It Works</h2>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { num: '1', icon: FileCheck, title: 'Submit Documents', desc: 'Upload your identity proof and property documents securely through the platform.' },
                { num: '2', icon: Fingerprint, title: 'Verification Process', desc: 'Our team reviews and verifies your documents within 24-48 hours.' },
                { num: '3', icon: Award, title: 'Get Verified', desc: 'Receive your verification badge and enjoy enhanced credibility and visibility.' },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-green-400 to-green-500 text-white text-xl font-bold mx-auto"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary-500 mt-5 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  {i < 2 && <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-green-300 to-transparent" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-green-600 via-green-700 to-primary-700 overflow-hidden text-center p-10 sm:p-14 lg:p-20"
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
              <div className="relative z-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Get Verified Today</h2>
                <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">Build trust and stand out in the marketplace. Start your verification process now.</p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/auth"
                    className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-700 font-bold text-sm hover:bg-gray-100 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Verify Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/safety"
                    className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Trust & Safety Guide
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
