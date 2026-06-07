'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2, Scale, FileText, Calculator,
  Sofa, Construction, Package, PaintBucket,
  Truck, ArrowRight, ChevronRight, Grid3x3,
  Phone, Star, Clock, Shield,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const services = [
  {
    icon: Building2, title: 'Housing Loans', color: 'from-blue-500 to-blue-600',
    desc: 'Get the best home loan offers from leading banks and NBFCs. We help you compare interest rates, process applications, and secure quick approvals.',
    features: ['Compare interest rates', 'Quick pre-approval', 'Minimal documentation', 'Expert guidance'],
    stat: '8+ partner banks',
  },
  {
    icon: Scale, title: 'Legal Assistance', color: 'from-purple-500 to-purple-600',
    desc: 'Expert legal support for property transactions. From title verification to contract drafting, our legal partners ensure complete peace of mind.',
    features: ['Title verification', 'Contract drafting', 'Due diligence', 'Dispute resolution'],
    stat: '500+ cases handled',
  },
  {
    icon: FileText, title: 'Documentation Support', color: 'from-amber-500 to-amber-600',
    desc: 'Hassle-free documentation services for all your property needs. We handle the paperwork so you can focus on what matters.',
    features: ['Sale deed preparation', 'Registration assistance', 'Tax documentation', 'NOC processing'],
    stat: '98% accuracy rate',
  },
  {
    icon: Calculator, title: 'Property Valuation', color: 'from-green-500 to-green-600',
    desc: 'Accurate market valuation of properties by certified valuers. Get the right price for buying, selling, or investment decisions.',
    features: ['Market analysis', 'Certified valuation', 'Investment advice', 'Comparative analysis'],
    stat: '2,000+ valuations',
  },
  {
    icon: Sofa, title: 'Interior Design', color: 'from-pink-500 to-pink-600',
    desc: 'Transform your space with professional interior design services. From consultation to complete execution, we connect you with the best designers.',
    features: ['Design consultation', 'Space planning', 'Execution support', 'Budget optimization'],
    stat: '50+ design partners',
  },
  {
    icon: Truck, title: 'Packers & Movers', color: 'from-orange-500 to-orange-600',
    desc: 'Reliable moving services for a smooth transition to your new home. Verified packers and movers with transparent pricing.',
    features: ['Verified partners', 'Transparent pricing', 'Insurance coverage', 'Timely service'],
    stat: '1,000+ moves completed',
  },
  {
    icon: Construction, title: 'Construction Work', color: 'from-red-500 to-red-600',
    desc: 'Expert construction services for residential and commercial projects. From foundation to finishing, our partners deliver quality craftsmanship on time and within budget.',
    features: ['Civil & structural work', 'Project management', 'Renovation & remodeling', 'Building extensions'],
    stat: '200+ projects',
  },
  {
    icon: Package, title: 'Building Material', color: 'from-orange-500 to-orange-600',
    desc: 'Source high-quality building materials at competitive prices. We connect you with trusted suppliers for everything from bricks to finishing materials.',
    features: ['Bricks & cement', 'Sand & aggregate', 'Steel & TMT', 'Finishing materials'],
    stat: '50+ suppliers',
  },
  {
    icon: PaintBucket, title: 'Wall and Home Painting', color: 'from-teal-500 to-teal-600',
    desc: 'Professional painting and waterproofing services for a fresh, beautiful home. Choose from a wide range of colors, textures, and premium finishes.',
    features: ['Interior & exterior painting', 'Texture & wallpaper', 'Waterproofing', 'Custom color designs'],
    stat: '1,500+ rooms',
  },
  {
    icon: Grid3x3, title: 'Marble and Tiles Work', color: 'from-cyan-500 to-cyan-600',
    desc: 'Premium marble and tile installation, repair, and polishing services. Enhance your spaces with expert craftsmanship and the finest materials.',
    features: ['Marble & granite flooring', 'Ceramic & vitrified tiles', 'Kitchen & bathroom tiling', 'Polishing & restoration'],
    stat: '300+ installations',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[70vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute -top-40 -right-40 w-96 h-96 border-[50px] border-gold-400/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 border-[30px] border-white/5 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <Building2 className="h-3 w-3" /> Services
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Complete Property
                <br />
                <span className="text-gold-400">Solutions</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                From home loans to interior design, we connect you with trusted service providers for all your property needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ SERVICES GRID ═══ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-white border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
                  style={{ clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 100%, 16px 100%)' : 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${s.color}`} />
                  <div className="p-6">
                    <div className={`flex h-11 w-11 items-center justify-center bg-gradient-to-br ${s.color} text-white mb-4`}
                      style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                    >
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-500 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-1.5 mb-4">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <ChevronRight className="h-3 w-3 text-primary-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gold-600">{s.stat}</span>
                      <button className="text-xs font-semibold text-primary-500 hover:text-gold-500 transition-colors inline-flex items-center gap-1">
                        Get Started <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY US ═══ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Why Trust Us</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">Why Use Our Service Partners?</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Verified Partners', desc: 'All service providers are thoroughly verified for quality and reliability.' },
                { icon: Clock, title: 'Quick Turnaround', desc: 'Fast response times and efficient service delivery for all your needs.' },
                { icon: Phone, title: 'Dedicated Support', desc: 'Personal assistance throughout your service engagement.' },
                { icon: Building2, title: 'End-to-End Service', desc: 'Complete solutions from start to finish, no matter the requirement.' },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center p-6 bg-[#F7F6F3] border border-gray-100"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-primary-100 text-primary-500 mx-auto mb-4"
                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                  >
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden"
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
              <div className="relative p-10 sm:p-14 lg:p-20 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Looking for a Service Partner?</h2>
                  <p className="mt-4 text-lg text-white/50">We&apos;ll connect you with the best service providers for your property needs.</p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Get in Touch <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
