'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Target, Eye, Heart, Shield,
  Users, Star, TrendingUp,
  ArrowRight, Building2,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const stats = [
  { num: '3,000+', label: 'Properties Listed' },
  { num: '50,000+', label: 'Happy Users' },
  { num: '500+', label: 'Trusted Agents' },
  { num: '4.8★', label: 'Average Rating' },
]

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'We believe in complete transparency in every transaction. All listings are verified.' },
  { icon: Users, title: 'Community First', desc: 'Built for Lucknow, by Lucknow. We understand the local market like no one else.' },
  { icon: Star, title: 'Quality Listings', desc: 'Every property listed on our platform meets strict quality and authenticity standards.' },
  { icon: Heart, title: 'Customer Success', desc: 'Your satisfaction is our success. We go the extra mile for every user.' },
]

const team = [
  { name: 'Amit Verma', role: 'Founder & CEO', initial: 'AV' },
  { name: 'Priya Singh', role: 'Head of Operations', initial: 'PS' },
  { name: 'Rahul Sharma', role: 'CTO', initial: 'RS' },
  { name: 'Neha Gupta', role: 'Head of Sales', initial: 'NG' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[70vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute top-20 right-20 w-64 h-64 border-[30px] border-gold-400/10 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                About{' '}
                <span className="text-gold-400">DedhBigha</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Lucknow&apos;s most trusted real estate platform, connecting property owners with genuine buyers and tenants.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 p-10 sm:p-14 lg:p-16"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Our Story</span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-3 leading-[1.1]">
                    Making Property Transactions Simple & Trustworthy
                  </h2>
                  <div className="mt-6 space-y-4 text-gray-500 leading-relaxed">
                    <p>
                      DedhBigha was founded with a simple mission: make real estate transactions in Lucknow transparent, 
                      efficient, and trustworthy. We saw how traditional property dealings were plagued with 
                      misinformation, middlemen, and lack of transparency.
                    </p>
                    <p>
                      Today, we are Lucknow&apos;s fastest growing real estate platform with thousands of verified 
                      properties and a community of trusted agents, builders, and property owners.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-[#F7F6F3] p-6 text-center"
                    >
                      <p className="text-3xl font-bold text-primary-500">{s.num}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Our Mission</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">What Drives Us</h2>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 sm:p-10"
                style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
              >
                <Target className="h-8 w-8 text-gold-400 mb-4" />
                <h3 className="font-heading text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  To revolutionize the real estate experience in Lucknow by providing a trusted, 
                  transparent, and technology-driven platform that connects property owners with 
                  genuine buyers and tenants.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gold-400 to-gold-600 p-8 sm:p-10"
                style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
              >
                <Eye className="h-8 w-8 text-primary-900 mb-4" />
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">Our Vision</h3>
                <p className="text-primary-900/70 leading-relaxed text-sm">
                  To become India&apos;s most trusted real estate marketplace, setting new standards 
                  for transparency, verification, and user experience in property transactions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Our Values</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">What We Stand For</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 p-6 hover:shadow-md transition-all text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-primary-100 text-primary-500 mx-auto mb-4"
                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                  >
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Our Team</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary-500 mt-3">Meet the People Behind DedhBigha</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-500 text-xl font-bold mx-auto">
                    {member.initial}
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mt-4">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
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
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden text-center p-10 sm:p-14 lg:p-20"
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="relative z-10">
                <Building2 className="h-12 w-12 text-gold-400 mx-auto mb-6" />
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Join the DedhBigha Community</h2>
                <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
                  Whether you are buying, selling, or renting, we are here to help you make the right move.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/auth"
                    className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-700 font-bold text-sm hover:bg-gray-100 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Contact Us
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
