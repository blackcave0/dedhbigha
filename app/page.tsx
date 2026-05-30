'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search, MapPin, Bed, Bath, Square, ArrowRight,
  Building2, Home, Key, Shield, Users, TrendingUp,
  CandlestickChart, Camera, FileText, CheckCircle,
  Star, HelpCircle, ChevronDown, BarChart3, BadgeCheck,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const lucknowAreas = [
  'Gomti Nagar', 'Gomti Nagar Extension', 'Shaheed Path',
  'Sushant Golf City', 'Hazratganj', 'Aliganj', 'Indira Nagar',
  'Jankipuram', 'Vrindavan Yojna', 'Faizabad Road',
  'Mahanagar', 'Rajajipuram', 'Alambagh', 'Kanpur Road', 'Sitapur Road',
]

const featuredProjects = [
  { id: 1, name: 'Sushant Golf City', location: 'Sector A, Gomti Nagar', types: '2, 3, 4 BHK', price: '₹ 45 Lac onwards', image: 'https://picsum.photos/seed/lp1/900/1100', possession: 'Dec 2025' },
  { id: 2, name: 'Eldeco Greens', location: 'Shaheed Path', types: '3, 4 BHK', price: '₹ 68 Lac onwards', image: 'https://picsum.photos/seed/lp2/900/1100', possession: 'Jun 2026' },
  { id: 3, name: 'Ajnara Indra Nagar', location: 'Sector J, Indira Nagar', types: '2, 3 BHK', price: '₹ 38 Lac onwards', image: 'https://picsum.photos/seed/lp3/900/1100', possession: 'Ready to Move' },
  { id: 4, name: 'Paras Tierea', location: 'Faizabad Road', types: '2, 3, 4 BHK', price: '₹ 52 Lac onwards', image: 'https://picsum.photos/seed/lp4/900/1100', possession: 'Mar 2027' },
  { id: 5, name: 'Sikka Karmic Greens', location: 'Sushant Golf City', types: '3 BHK', price: '₹ 75 Lac onwards', image: 'https://picsum.photos/seed/lp5/900/1100', possession: 'Dec 2026' },
]

const newLaunches = [
  { id: 6, name: 'Ganga Suncity', location: 'Faizabad Road', types: '2, 3 BHK', price: '₹ 42 Lac onwards', image: 'https://picsum.photos/seed/nl1/900/1100', status: 'Just Launched', possession: 'Dec 2027', investment: 'High Potential' },
  { id: 7, name: 'Tata Promont', location: 'Shaheed Path', types: '3, 4 BHK', price: '₹ 85 Lac onwards', image: 'https://picsum.photos/seed/nl2/900/1100', status: 'Pre-Launch', possession: 'Jun 2028', investment: 'Premium' },
  { id: 8, name: 'Godrej Woods', location: 'Gomti Nagar Ext', types: '2, 3, 4 BHK', price: '₹ 65 Lac onwards', image: 'https://picsum.photos/seed/nl3/900/1100', status: 'New Launch', possession: 'Mar 2027', investment: 'High Potential' },
  { id: 9, name: 'Sobha City', location: 'Sushant Golf City', types: '3, 4 BHK', price: '₹ 92 Lac onwards', image: 'https://picsum.photos/seed/nl4/900/1100', status: 'Just Launched', possession: 'Sep 2027', investment: 'Premium' },
]

const recentProperties = [
  { id: 10, title: '3BHK Apartment in Gomti Nagar', location: 'Sector 7, Gomti Nagar Extension', price: '₹ 72 Lac', beds: 3, baths: 2, area: '1,650 sqft', image: 'https://picsum.photos/seed/rp1/900/1100', type: 'Buy', furnished: 'Semi' },
  { id: 11, title: '4BHK Independent House', location: 'Hazratganj, Lucknow', price: '₹ 1.8 Cr', beds: 4, baths: 3, area: '2,800 sqft', image: 'https://picsum.photos/seed/rp2/900/1100', type: 'Buy', furnished: 'Full' },
  { id: 12, title: '2BHK Flat in Indira Nagar', location: 'Sector 19, Indira Nagar', price: '₹ 38 Lac', beds: 2, baths: 2, area: '1,100 sqft', image: 'https://picsum.photos/seed/rp3/900/1100', type: 'Buy', furnished: 'Semi' },
  { id: 13, title: '1BHK Fully Furnished', location: 'Aliganj, Lucknow', price: '₹ 18K/mo', beds: 1, baths: 1, area: '650 sqft', image: 'https://picsum.photos/seed/rp4/900/1100', type: 'Rent', furnished: 'Full' },
  { id: 14, title: '3BHK Near Shaheed Path', location: 'Shaheed Path, Lucknow', price: '₹ 55 Lac', beds: 3, baths: 2, area: '1,450 sqft', image: 'https://picsum.photos/seed/rp5/900/1100', type: 'Buy', furnished: 'Semi' },
  { id: 15, title: '2BHK Apartment for Rent', location: 'Gomti Nagar', price: '₹ 22K/mo', beds: 2, baths: 2, area: '1,050 sqft', image: 'https://picsum.photos/seed/rp6/900/1100', type: 'Rent', furnished: 'Full' },
]

const trendingAreas = [
  { name: 'Gomti Nagar', price: '₹ 45 Lac - ₹ 2.5 Cr', growth: '+12%', listings: '1,200+' },
  { name: 'Sushant Golf City', price: '₹ 55 Lac - ₹ 3 Cr', growth: '+15%', listings: '850+' },
  { name: 'Shaheed Path', price: '₹ 35 Lac - ₹ 1.8 Cr', growth: '+18%', listings: '700+' },
  { name: 'Vrindavan Yojna', price: '₹ 28 Lac - ₹ 1.2 Cr', growth: '+10%', listings: '600+' },
  { name: 'Amar Shaheed Path', price: '₹ 30 Lac - ₹ 1.5 Cr', growth: '+14%', listings: '500+' },
  { name: 'Faizabad Road', price: '₹ 25 Lac - ₹ 1 Cr', growth: '+11%', listings: '900+' },
]

const ownerProperties = [
  { id: 16, title: '3BHK in Gomti Nagar Ext', location: 'Sector 7, Gomti Nagar', price: '₹ 68 Lac', beds: 3, baths: 2, area: '1,550 sqft', image: 'https://picsum.photos/seed/op1/900/1100', category: 'Apartment' },
  { id: 17, title: '2BHK in Aliganj', location: 'Sector H, Aliganj', price: '₹ 35 Lac', beds: 2, baths: 1, area: '980 sqft', image: 'https://picsum.photos/seed/op2/900/1100', category: 'Apartment' },
  { id: 18, title: '4BHK Villa in Mahanagar', location: 'Mahanagar Colony', price: '₹ 1.5 Cr', beds: 4, baths: 3, area: '2,400 sqft', image: 'https://picsum.photos/seed/op3/900/1100', category: 'Independent House' },
  { id: 19, title: '3BHK Independent House', location: 'Rajajipuram', price: '₹ 85 Lac', beds: 3, baths: 2, area: '1,800 sqft', image: 'https://picsum.photos/seed/op4/900/1100', category: 'Independent House' },
]

const preferredAgents = [
  { id: 1, name: 'Rakesh Verma', agency: 'Verma Realty', phone: '+91 98765 43210', image: 'https://picsum.photos/seed/ag1/100/100', area: 'Gomti Nagar', exp: '12 years' },
  { id: 2, name: 'Neha Gupta', agency: 'Gupta Properties', phone: '+91 98765 43211', image: 'https://picsum.photos/seed/ag2/100/100', area: 'Indira Nagar', exp: '8 years' },
  { id: 3, name: 'Vikram Singh', agency: 'Singh & Associates', phone: '+91 98765 43212', image: 'https://picsum.photos/seed/ag3/100/100', area: 'Hazratganj', exp: '15 years' },
  { id: 4, name: 'Anjali Mishra', agency: 'Mishra Realty', phone: '+91 98765 43213', image: 'https://picsum.photos/seed/ag4/100/100', area: 'Shaheed Path', exp: '6 years' },
]

const services = [
  { icon: Home, title: 'Buy Property', desc: 'Verified properties with complete legal support across Lucknow' },
  { icon: Key, title: 'Sell Property', desc: 'List your property and reach serious buyers instantly' },
  { icon: CandlestickChart, title: 'Property Valuation', desc: 'Get accurate market valuation for your property' },
  { icon: Building2, title: 'Home Loan Assistance', desc: 'Easy financing options from trusted banks' },
  { icon: Shield, title: 'Legal Verification', desc: 'Documentation, verification & closing assistance' },
  { icon: Search, title: 'Interior Consultation', desc: 'Expert interior design advice for your new home' },
]

const propertyTypes = ['Flat', 'Villa', 'Plot', 'Commercial']

const bhkOptions = [
  { label: '1 BHK', beds: '1' },
  { label: '2 BHK', beds: '2' },
  { label: '3 BHK', beds: '3' },
  { label: '4+ BHK', beds: '4' },
  { label: 'Villa', beds: 'villa' },
]

const advisorTypes = [
  { id: 'owner', label: 'Owner Direct', desc: 'No brokerage', icon: Key },
  { id: 'agent', label: 'Verified Agent', desc: 'Local expert', icon: Users },
  { id: 'builder', label: 'Builder Sales', desc: 'Project specialist', icon: Building2 },
  { id: 'investor', label: 'Investment Advisor', desc: 'ROI-focused', icon: TrendingUp },
]

const moveInOptions = [
  { id: 'now', label: 'Move In Now', desc: 'Urgently looking' },
  { id: '6months', label: 'Within 6 Months', desc: 'Planning soon' },
  { id: 'year', label: 'Next Year', desc: 'No rush' },
  { id: 'exploring', label: 'Just Exploring', desc: 'Browsing options' },
]

const exploreAreas = [
  'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Aliganj', 'Mahanagar',
  'Rajajipuram', 'Sitapur Road', 'Kanpur Road', 'Hazratganj',
  'Shaheed Path', 'Jankipuram', 'Vrindavan Yojna', 'Faizabad Road',
  'Sushant Golf City', 'Gomti Nagar Extension',
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBHK, setSelectedBHK] = useState<string | null>(null)
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null)
  const [selectedMoveIn, setSelectedMoveIn] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [propertyType, setPropertyType] = useState('')
  const [budget, setBudget] = useState('')
  const [recentFilter, setRecentFilter] = useState('All')
  const [ownerFilter, setOwnerFilter] = useState('All')
  const [moveInTimeline, setMoveInTimeline] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = lucknowAreas.filter(a =>
    a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const recentFilters = ['All', 'Buy', 'Rent', 'Ready to Move', 'Furnished']
  const ownerFilters = ['All', 'Apartment', 'Independent House', 'Villa']

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-primary-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 opacity-90" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 lg:opacity-100">
            <img
              src="https://picsum.photos/seed/lucknow-hero/1200/1400"
              alt="Premium Lucknow property"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-500/60 to-transparent lg:bg-gradient-to-r lg:from-primary-500 lg:via-primary-500/40 lg:to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 py-20 lg:py-24">
            <div className="max-w-2xl lg:max-w-[55%]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-300 mb-5">
                  <MapPin className="h-4 w-4" />
                  Lucknow&apos;s Trusted Real Estate Platform
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-white tracking-tight">
                  Find Your Perfect
                  <br />
                  <span className="text-gold-400">Home in Lucknow</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                  Explore verified properties, new launches, and trusted local advisors across Lucknow&apos;s finest neighbourhoods.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 bg-white rounded-xl shadow-2xl shadow-primary-900/30 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search locality, project, or landmark..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          setShowSuggestions(true)
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="w-full h-11 pl-10 pr-3 bg-gray-50 rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                      {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-100 shadow-lg z-20 py-1 max-h-48 overflow-y-auto">
                          {filteredSuggestions.map((area) => (
                            <button
                              key={area}
                              onClick={() => {
                                setSearchQuery(area)
                                setShowSuggestions(false)
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                            >
                              <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              {area}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="h-11 px-3 rounded-lg bg-gray-50 text-gray-700 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary-500/20 cursor-pointer"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="h-11 px-3 rounded-lg bg-gray-50 text-gray-700 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary-500/20 cursor-pointer"
                    >
                      <option value="">Budget</option>
                      <option value="20">Under ₹ 20 Lac</option>
                      <option value="50">₹ 20 - 50 Lac</option>
                      <option value="100">₹ 50 Lac - 1 Cr</option>
                      <option value="200">₹ 1 - 2 Cr</option>
                      <option value="500">₹ 2 Cr+</option>
                    </select>
                    <Link href="/search">
                      <button className="h-11 px-6 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-all flex items-center gap-2 shadow-lg shadow-primary-500/25 whitespace-nowrap w-full sm:w-auto justify-center">
                        <Search className="h-4 w-4" />
                        Search
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium mr-1">BHK:</span>
                    {bhkOptions.map((bhk) => (
                      <button
                        key={bhk.label}
                        onClick={() => setSelectedBHK(selectedBHK === bhk.label ? null : bhk.label)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedBHK === bhk.label
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {bhk.label}
                      </button>
                    ))}
                    <span className="mx-2 w-px h-5 bg-gray-200" />
                    <span className="text-xs text-gray-500 font-medium mr-1">Move in:</span>
                    {['Now', '6 Mo', '1 Yr'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setMoveInTimeline(moveInTimeline === t ? '' : t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          moveInTimeline === t
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════ BHK CHOICE ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Find by BHK Type
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Select your preferred configuration
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {bhkOptions.map((bhk, i) => (
                <motion.button
                  key={bhk.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedBHK(selectedBHK === bhk.label ? null : bhk.label)}
                  className={`group relative px-8 py-5 rounded-xl font-medium text-sm transition-all min-w-[120px] ${
                    selectedBHK === bhk.label
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:shadow-sm'
                  }`}
                >
                  <span className="font-heading text-lg font-bold block">{bhk.label}</span>
                  <span className={`text-xs mt-1 block ${selectedBHK === bhk.label ? 'text-white/70' : 'text-gray-400'}`}>
                    {bhk.beds === 'villa' ? 'Luxury living' : `${bhk.beds} Bedroom`}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ ADVISOR TYPE ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Choose Your Property Advisor
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Find the right expert for your property journey
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {advisorTypes.map((adv, i) => (
                <motion.button
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedAdvisor(selectedAdvisor === adv.id ? null : adv.id)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl text-center transition-all ${
                    selectedAdvisor === adv.id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-[#F7F6F3] text-gray-700 hover:bg-gold-50 hover:border-gold-200 border border-transparent'
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    selectedAdvisor === adv.id ? 'bg-white/20' : 'bg-primary-100'
                  }`}>
                    <adv.icon className={`h-5 w-5 ${selectedAdvisor === adv.id ? 'text-white' : 'text-primary-500'}`} />
                  </div>
                  <div>
                    <span className="font-heading text-base font-bold block">{adv.label}</span>
                    <span className={`text-xs mt-1 block ${selectedAdvisor === adv.id ? 'text-white/70' : 'text-gray-400'}`}>{adv.desc}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MOVE-IN INTENT ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                When Are You Planning to Move?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Helps us recommend properties that match your timeline
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {moveInOptions.map((opt, i) => (
                <motion.button
                  key={opt.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedMoveIn(selectedMoveIn === opt.id ? null : opt.id)}
                  className={`px-6 py-4 rounded-xl font-medium text-sm transition-all min-w-[160px] ${
                    selectedMoveIn === opt.id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:shadow-sm'
                  }`}
                >
                  <span className="font-heading text-base font-bold block">{opt.label}</span>
                  <span className={`text-xs mt-1 block ${selectedMoveIn === opt.id ? 'text-white/70' : 'text-gray-400'}`}>{opt.desc}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURED PROJECTS ═══════════ */}
        <section className="py-6 sm:py-20 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-4 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-primary-500">
                  Featured Projects
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-2">Premium highlighted projects in Lucknow</p>
              </motion.div>
              <Link href="/search?featured=true" className="text-xs sm:text-sm font-medium text-primary-500 shrink-0">
                See All
              </Link>
            </div>
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {featuredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-[170px] sm:w-[280px] shrink-0 snap-start rounded-xl overflow-hidden bg-white sm:bg-[#F7F6F3] border border-gray-100 sm:border-0 cursor-pointer"
                >
                  <div className="h-28 sm:h-40 overflow-hidden bg-gray-100 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 text-primary-500">Featured</span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <p className="text-sm sm:text-base font-bold text-primary-500">{p.price}</p>
                    <h3 className="text-[12px] sm:text-sm font-semibold text-navy-900 truncate">{p.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">{p.location}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{p.types}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ NEW LAUNCHES ═══════════ */}
        <section className="py-6 sm:py-20 px-6 lg:px-12 bg-[#F7F6F3]">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-4 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-primary-500">
                  New Launches
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-2">Recently launched projects in Lucknow</p>
              </motion.div>
              <Link href="/search?launched=true" className="hidden sm:block text-xs sm:text-sm font-medium text-primary-500 shrink-0">
                View All Launches
              </Link>
            </div>
            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {featuredProjects.map((p) => (
                <div key={p.id} className="w-[170px] shrink-0 snap-start rounded-xl overflow-hidden bg-white border border-gray-100 cursor-pointer">
                  <div className="h-28 overflow-hidden bg-gray-100 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">NEW</span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-[12px] font-semibold text-navy-900 truncate">{p.name}</h3>
                    <p className="text-[10px] text-gray-500 truncate">{p.location}</p>
                    <p className="text-xs font-bold text-primary-500 mt-0.5">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProjects.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] lg:text-xs font-medium px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full bg-emerald-500 text-white">NEW</span>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="font-heading text-base lg:text-lg font-bold text-navy-900">{p.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 shrink-0" />{p.location}</p>
                    <div className="flex items-center justify-between mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200">
                      <span className="text-[11px] lg:text-xs text-gray-500">{p.types}</span>
                      <span className="font-heading text-sm lg:text-base font-bold text-primary-500 shrink-0 ml-3">{p.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RECENT PROPERTIES ═══════════ */}
        <section className="py-6 sm:py-20 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 sm:mb-8"
            >
              <h2 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-primary-500">
                Recent Properties
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-2">Latest listings in Lucknow</p>
            </motion.div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8">
              {recentFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setRecentFilter(f)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    recentFilter === f
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentProperties.filter(p => recentFilter === 'All' || p.type === recentFilter || (recentFilter === 'Ready to Move' && p.furnished === 'Full') || (recentFilter === 'Furnished' && p.furnished === 'Full')).slice(0, 6).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-[#F7F6F3] rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="h-28 sm:h-auto sm:aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 text-primary-500">{p.type}</span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <p className="text-xs sm:text-sm font-bold text-primary-500">{p.price}</p>
                    <h3 className="text-[12px] sm:text-sm font-semibold text-navy-900 leading-snug line-clamp-2">{p.title}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate mt-0.5">{p.location}</p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-200 text-[10px] sm:text-xs text-gray-500">
                      {p.beds > 0 && <span className="flex items-center gap-0.5 sm:gap-1"><Bed className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{p.beds}</span>}
                      <span className="flex items-center gap-0.5 sm:gap-1"><Bath className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{p.baths}</span>
                      <span className="flex items-center gap-0.5 sm:gap-1 ml-auto"><Square className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{p.area.replace(/,?\s*sqft/, '')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                View All Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ TRENDING IN LUCKNOW ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Trending Localities in Lucknow
              </h2>
              <p className="mt-2 text-sm text-gray-500">Most sought-after neighbourhoods</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trendingAreas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/search?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group block relative overflow-hidden rounded-xl bg-white border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading text-base font-bold text-primary-500 group-hover:text-primary-600 transition-colors">{area.name}</h3>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">{area.growth}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{area.price}</span>
                      <span className="text-gray-400 text-xs">{area.listings} listings</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ POPULAR OWNER PROPERTIES ═══════════ */}
        <section className="py-6 sm:py-20 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 sm:mb-8"
            >
              <h2 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-primary-500">
                Popular Owner Properties
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-2">Direct from owners — no brokerage</p>
            </motion.div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8">
              {ownerFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setOwnerFilter(f)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    ownerFilter === f
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {ownerProperties.filter(p => ownerFilter === 'All' || p.category === ownerFilter).map((p) => (
                <div key={p.id} className="w-[170px] shrink-0 snap-start rounded-xl overflow-hidden bg-white border border-gray-100 cursor-pointer">
                  <div className="h-28 overflow-hidden bg-gray-100 relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">Owner Listed</span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-primary-500">{p.price}</p>
                    <h3 className="text-[12px] font-semibold text-navy-900 truncate">{p.title}</h3>
                    <p className="text-[10px] text-gray-500 truncate">{p.location}</p>
                    <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-gray-100 text-[10px] text-gray-500">
                      <span>{p.beds} BHK</span>
                      <span className="ml-auto">{p.area.replace(/,?\s*sqft/, '')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ownerProperties.filter(p => ownerFilter === 'All' || p.category === ownerFilter).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-[#F7F6F3] rounded-xl overflow-hidden hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                      <span className="text-[10px] lg:text-xs font-medium px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full bg-green-100 text-green-700">Owner Listed</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="min-w-0">
                        <h3 className="font-heading text-[13px] sm:text-sm font-bold text-primary-500 leading-snug truncate">{p.title}</h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 flex items-center gap-1 truncate"><MapPin className="h-3 w-3 shrink-0" />{p.location}</p>
                      </div>
                      <p className="font-heading text-sm sm:text-base font-bold text-primary-500 shrink-0 whitespace-nowrap">{p.price}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 text-[11px] sm:text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Bed className="h-3 w-3" />{p.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{p.baths}</span>
                      <span className="flex items-center gap-1"><Square className="h-3 w-3" />{p.area.replace(/,?\s*sqft/, '')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <Link
                href="/search?owner=true"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                View All Owner Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ PREFERRED AGENTS ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Preferred Agents in Lucknow
              </h2>
              <p className="mt-2 text-sm text-gray-500">Connect with verified local property experts</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {preferredAgents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={agent.image} alt={agent.name} className="h-12 w-12 rounded-full object-cover bg-gray-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-sm font-bold text-primary-500">{agent.name}</h3>
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-500">
                          <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{agent.agency}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{agent.area} · {agent.exp}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${agent.phone}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full h-9 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors text-sm font-medium"
                  >
                    {agent.phone}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ OUR SERVICES ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Our Services
              </h2>
              <p className="mt-2 text-sm text-gray-500">Everything you need for your property journey</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 rounded-xl bg-[#F7F6F3] p-5 hover:bg-gold-50 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-primary-500">{s.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ EXPLORE BY AREA ═══════════ */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-500">
                Explore by Area
              </h2>
              <p className="mt-2 text-sm text-gray-500">Find properties across Lucknow&apos;s neighbourhoods</p>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {exploreAreas.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/search?area=${area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:shadow-sm transition-all"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary-400" />
                    {area}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY LIST WITH US — redesigned ═══════════ */}
        <section className="relative overflow-hidden bg-primary-500 py-0">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gold-400/10 to-transparent" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-10 items-center min-h-[500px]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 py-16 lg:py-20"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 mb-5">
                  For Property Owners
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-white">
                  Why List Your Property
                  <br />
                  <span className="text-gold-400">on DedhBigha?</span>
                </h2>
                <p className="mt-4 text-base text-white/50 leading-relaxed max-w-sm">
                  Join thousands of property owners who trust us to find the right buyers and tenants.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/post-property"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Post Property Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/for-sellers"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
              <div className="lg:col-span-3 py-16 lg:py-20">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: TrendingUp, title: 'Faster Sales', desc: 'Get your property in front of serious buyers and tenants.', accent: 'from-amber-400/20 to-amber-500/10' },
                    { icon: Users, title: 'Verified Leads', desc: 'Receive inquiries from genuine, pre-verified prospects.', accent: 'from-blue-400/20 to-blue-500/10' },
                    { icon: MapPin, title: 'Better Visibility', desc: 'Featured placement in location-based searches.', accent: 'from-emerald-400/20 to-emerald-500/10' },
                    { icon: Shield, title: 'Free Listing Option', desc: 'Start free — upgrade to premium for more exposure.', accent: 'from-purple-400/20 to-purple-500/10' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className={`group relative overflow-hidden bg-gradient-to-br ${item.accent} bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all`}
                      style={{ clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 100%, 16px 100%)' : 'polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)' }}
                    >
                      <div className="p-6">
                        <div className="flex h-9 w-9 items-center justify-center bg-gold-400/20 text-gold-400 mb-3" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <h3 className="font-heading text-sm font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gold-400/5 rounded-full blur-xl" />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="sm:col-span-2"
                  >
                    <Link
                      href="/post-property"
                      className="group flex items-center justify-between gap-4 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 hover:bg-white/10 transition-all"
                      style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
                    >
                      <div>
                        <p className="text-sm font-bold text-gold-400">Ready to list?</p>
                        <p className="text-xs text-white/50">It takes less than 10 minutes</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gold-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ UPLOAD PROPERTY IN 3 STEPS — redesigned ═══════════ */}
        <section className="relative py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-gold-400 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Simple Process</span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-500 mt-4 leading-[1.1]">
                  Upload Your Property
                  <br />
                  <span className="text-gold-500">in 3 Simple Steps</span>
                </h2>
                <p className="mt-4 text-base text-gray-400 leading-relaxed max-w-md">
                  List your property in minutes, not hours. Our streamlined process makes it easy.
                </p>
                <div className="mt-8">
                  <Link
                    href="/post-property"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    Start Listing
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400 via-primary-200 to-transparent hidden lg:block" />
                <div className="space-y-8">
                  {[
                    { num: '01', icon: FileText, title: 'Add Property Details', desc: 'Fill in your property type, location, price, and key specifications. Our smart form guides you through every field.', color: 'from-amber-400 to-amber-500' },
                    { num: '02', icon: Camera, title: 'Upload Photos', desc: 'Add high-quality photos to attract more buyers and tenants. Drag-and-drop interface makes it effortless.', color: 'from-blue-400 to-blue-500' },
                    { num: '03', icon: CheckCircle, title: 'Publish Listing', desc: 'Review everything, click publish, and start receiving inquiries from interested buyers and tenants instantly.', color: 'from-emerald-400 to-emerald-500' },
                  ].map((step, i) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      className="group relative flex gap-5 pl-0 lg:pl-16"
                    >
                      <div className="hidden lg:flex absolute left-6 top-0 w-5 h-5 rounded-full bg-white border-2 border-primary-200 items-center justify-center -translate-x-1/2 group-hover:border-gold-400 transition-colors z-10">
                        <div className="w-2 h-2 rounded-full bg-primary-200 group-hover:bg-gold-400 transition-colors" />
                      </div>
                      <div className={`shrink-0 flex h-14 w-14 items-center justify-center bg-gradient-to-br ${step.color} text-white`}
                        style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[11px] font-bold text-gold-500 tracking-widest">{step.num}</span>
                          <h3 className="font-heading text-base font-bold text-primary-500">{step.title}</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ STATISTICS — redesigned ═══════════ */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                DedhBigha by the <span className="text-gold-400">Numbers</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { value: '2,500+', label: 'Active Listings', suffix: 'properties listed' },
                { value: '500+', label: 'Verified Sellers', suffix: 'trusted partners' },
                { value: '100+', label: 'Weekly New Listings', suffix: 'added every week' },
                { value: '10,000+', label: 'Total Inquiries', suffix: 'and counting' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8 text-center hover:bg-white/10 transition-all ${i % 2 === 0 ? 'lg:-translate-y-2' : 'lg:translate-y-2'}`}
                    style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                  >
                    <p className="font-heading text-3xl lg:text-5xl font-bold text-gold-400 tracking-tight">{stat.value}</p>
                    <p className="text-sm font-semibold text-white mt-2">{stat.label}</p>
                    <p className="text-xs text-white/40 mt-1">{stat.suffix}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ — redesigned ═══════════ */}
        <section className="relative py-20 lg:py-28 px-6 lg:px-12">
          <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-primary-200 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Got Questions?</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-500 mt-4 leading-[1.1]">
                  Frequently Asked
                  <br />
                  <span className="text-gold-500">Questions</span>
                </h2>
                <p className="mt-4 text-base text-gray-400 leading-relaxed">
                  Everything you need to know about DedhBigha. Can&apos;t find what you&apos;re looking for?
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-gold-500 transition-colors group"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <div className="lg:col-span-3">
                <div className="space-y-2">
                  {[
                    { q: 'How do I post a property?', a: 'Click on "Post Property" button anywhere on the site, fill in your property details, upload photos, and publish. It takes just a few minutes to list your property.' },
                    { q: 'Is listing free?', a: 'Yes, basic listing on DedhBigha is completely free. You can upgrade to a Premium plan for featured placement, more photos, and advanced features.' },
                    { q: 'What is a verified property?', a: 'A verified property is one where we have confirmed the details, photos, and ownership documents. Verified listings get a trust badge and better visibility.' },
                    { q: 'How do premium plans work?', a: 'Premium plans give your listing featured placement, higher visibility in search results, more photos, priority support, and detailed analytics. Choose from our annual plan.' },
                    { q: 'How can I contact buyers or tenants?', a: 'Once your property is listed, interested buyers and tenants can send you inquiries directly through the platform. You can manage all communication from your dashboard.' },
                  ].map((faq, i) => (
                    <motion.div
                      key={faq.q}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className={`group w-full text-left transition-all duration-300 ${
                          openFaq === i
                            ? 'bg-primary-500 shadow-lg shadow-primary-500/20'
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                        }`}
                        style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                      >
                        <div className="flex items-center justify-between px-5 py-4">
                          <div className="flex items-center gap-3 pr-4">
                            <span className={`flex h-7 w-7 items-center justify-center text-xs font-bold shrink-0 ${
                              openFaq === i ? 'bg-gold-400 text-primary-900' : 'bg-primary-100 text-primary-500'
                            }`} style={{ clipPath: 'polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)' }}>
                              {i + 1}
                            </span>
                            <span className={`text-sm font-semibold ${openFaq === i ? 'text-white' : 'text-primary-500'}`}>
                              {faq.q}
                            </span>
                          </div>
                          <div className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                            <div className={`flex h-6 w-6 items-center justify-center ${openFaq === i ? 'bg-gold-400' : 'bg-gray-100'}`}
                              style={{ clipPath: 'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)' }}
                            >
                              <ChevronDown className={`h-3 w-3 ${openFaq === i ? 'text-primary-900' : 'text-gray-500'}`} />
                            </div>
                          </div>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                          <div className="px-5 pl-14">
                            <p className={`text-sm leading-relaxed ${openFaq === i ? 'text-white/70' : ''}`}>{faq.a}</p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
      </main>

      <Footer />
    </div>
  )
}