'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, Star, Phone, Mail, MapPin,
  ArrowRight, Users, BadgeCheck,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const agents = [
  { name: 'Ankit Gupta', firm: 'Gupta Realty', area: 'Gomti Nagar', rating: 4.9, deals: 120, phone: '+91 98765 43210', email: 'ankit@guptarealty.com', verified: true, initial: 'AG' },
  { name: 'Sneha Verma', firm: 'Verma Properties', area: 'Hazratganj', rating: 4.8, deals: 95, phone: '+91 98765 43211', email: 'sneha@vermaproperties.com', verified: true, initial: 'SV' },
  { name: 'Rahul Mishra', firm: 'Mishra & Co.', area: 'Indira Nagar', rating: 4.7, deals: 78, phone: '+91 98765 43212', email: 'rahul@mishraco.com', verified: true, initial: 'RM' },
  { name: 'Priya Singh', firm: 'Singh Estates', area: 'Aliganj', rating: 4.9, deals: 150, phone: '+91 98765 43213', email: 'priya@singhestates.com', verified: true, initial: 'PS' },
  { name: 'Vikram Yadav', firm: 'Yadav Realty', area: 'Shaheed Path', rating: 4.6, deals: 65, phone: '+91 98765 43214', email: 'vikram@yadavrealty.com', verified: false, initial: 'VY' },
  { name: 'Neha Kapoor', firm: 'Kapoor Housing', area: 'Gomti Nagar', rating: 4.8, deals: 110, phone: '+91 98765 43215', email: 'neha@kapoorhousing.com', verified: true, initial: 'NK' },
]

export default function AgentsPage() {
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('')

  const filtered = agents.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.firm.toLowerCase().includes(search.toLowerCase())
    const matchesArea = !area || a.area === area
    return matchesSearch && matchesArea
  })

  const areas = [...new Set(agents.map((a) => a.area))]

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[55vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <Users className="h-3 w-3" /> Trusted Agents
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Find a{' '}
                <span className="text-gold-400">Trusted Agent</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Connect with verified real estate agents and property experts in Lucknow.
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
              className="bg-white border border-gray-200 p-6 mb-10"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agents or firms..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="border border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All Areas</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No agents found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white border border-gray-200 p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-500 text-lg font-bold">
                        {agent.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading text-base font-bold text-primary-500">{agent.name}</h3>
                          {agent.verified && <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500">{agent.firm}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                          <span className="text-sm font-semibold text-gray-800">{agent.rating}</span>
                          <span className="text-xs text-gray-400">({agent.deals} deals)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3" /> {agent.area}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" /> Email
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500">Are You an Agent?</h2>
              <p className="mt-3 text-gray-500 max-w-lg mx-auto">Join DedhBigha and get access to verified leads and powerful tools to grow your business.</p>
              <div className="mt-8">
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-all"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                >
                  Register as Agent <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
