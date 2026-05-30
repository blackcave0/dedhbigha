'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, AlertTriangle, CheckCircle, BadgeCheck,
  Flag, Search, Lock, Users, ArrowRight,
  FileWarning, Eye, Phone, FileText,
  Fingerprint,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const scams = [
  {
    icon: FileWarning, color: 'from-red-400 to-red-500',
    title: 'Fake Property Listings',
    desc: 'Listings with unrealistically low prices or stock photos. Always verify the property exists before making any payment.',
    tips: ['Cross-check prices with market rates', 'Request a video call to see the property', 'Visit the property in person', 'Reverse search property photos'],
  },
  {
    icon: AlertTriangle, color: 'from-orange-400 to-orange-500',
    title: 'Advance Fee Fraud',
    desc: 'Scammers asking for advance payment for booking, documentation, or processing fees. Never pay before seeing the property.',
    tips: ['Never pay before property visit', 'Be wary of urgent payment demands', 'Verify the owner identity', 'Use secure payment methods'],
  },
  {
    icon: FileText, color: 'from-purple-400 to-purple-500',
    title: 'Fake Documents',
    desc: 'Fake sale deeds, title documents, or identity proofs used to deceive buyers. Always verify documents through proper channels.',
    tips: ['Verify title deed at sub-registrar', 'Check property tax receipts', 'Verify seller identity with ID proof', 'Use legal expert for verification'],
  },
  {
    icon: Users, color: 'from-blue-400 to-blue-500',
    title: 'Impersonation Scams',
    desc: 'Scammers posing as property owners, agents, or builders. Verify identities before engaging in any transaction.',
    tips: ['Ask for ID proof', 'Verify with the society/colony', 'Check agent credentials on DedhBigha', 'Cross-check builder reputation'],
  },
]

const safeTips = [
  { icon: Search, title: 'Research Thoroughly', desc: 'Research the property, locality, and market rates before making any decision.' },
  { icon: Eye, title: 'Verify in Person', desc: 'Always visit the property in person before making any payment.' },
  { icon: FileText, title: 'Legal Verification', desc: 'Get all property documents verified by a legal professional.' },
  { icon: Phone, title: 'Use Verified Contacts', desc: 'Only contact owners and agents through verified numbers on DedhBigha.' },
  { icon: Lock, title: 'Secure Payments', desc: 'Use traceable payment methods and avoid cash for large transactions.' },
  { icon: BadgeCheck, title: 'Check Verification Status', desc: 'Look for verified badges on DedhBigha for trusted transactions.' },
]

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[65vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute top-10 right-10 w-48 h-48 border-[24px] border-gold-400/10 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <Shield className="h-3 w-3" /> Trust & Safety
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Stay Safe on{' '}
                <span className="text-gold-400">DedhBigha</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Your safety is our priority. Learn how to identify scams, transact safely, and report suspicious activity.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Stay Alert</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">Common Scam Alerts</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {scams.map((scam, i) => (
                <motion.div
                  key={scam.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all p-6"
                  style={{ clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 100%, 16px 100%)' : 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center bg-gradient-to-br ${scam.color} text-white`}
                      style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                    >
                      <scam.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-bold text-primary-500 mb-2">{scam.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">{scam.desc}</p>
                      <div className="grid sm:grid-cols-2 gap-1.5">
                        {scam.tips.map((tip) => (
                          <div key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Guidelines</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">Safe Transaction Tips</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeTips.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-[#F7F6F3] p-5 border border-gray-100 hover:bg-primary-50 hover:border-primary-200 transition-all"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%)' }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-100 text-primary-500"
                    style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                  >
                    <tip.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-primary-500">{tip.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Report</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4">How to Report</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { num: '1', title: 'Identify Suspicious Activity', desc: 'Look for red flags like unrealistic prices or pressure tactics.' },
                { num: '2', title: 'Gather Evidence', desc: 'Collect screenshots, messages, and other evidence.' },
                { num: '3', title: 'Report to DedhBigha', desc: 'Use our reporting feature or contact our support team.' },
                { num: '4', title: 'File Legal Complaint', desc: 'If you suspect fraud, file a complaint with the local police.' },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-red-400 to-red-500 text-white text-lg font-bold mx-auto"
                    style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary-500 mt-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
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
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden"
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
              <div className="relative p-10 sm:p-14 lg:p-20 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Report a Listing</h2>
                  <p className="mt-4 text-lg text-white/50">If you come across a suspicious listing, report it immediately. Our team will review within 24 hours.</p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    <Flag className="h-4 w-4" /> Report Now
                  </Link>
                  <Link
                    href="/verified"
                    className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Learn About Verification
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
