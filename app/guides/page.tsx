'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, ArrowRight, Clock, User,
  Search, Tag, AlertTriangle,
  Home, Scale, FileText, Calculator, Shield,
  Eye,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const categories = [
  { id: 'all', label: 'All Articles', icon: BookOpen, color: 'from-primary-400 to-primary-500' },
  { id: 'buying', label: 'Buying Guides', icon: Home, color: 'from-emerald-400 to-emerald-500' },
  { id: 'rental', label: 'Rental Guides', icon: FileText, color: 'from-blue-400 to-blue-500' },
  { id: 'legal', label: 'Legal Guides', icon: Scale, color: 'from-purple-400 to-purple-500' },
  { id: 'loan', label: 'Home Loan Guides', icon: Calculator, color: 'from-amber-400 to-amber-500' },
  { id: 'scam', label: 'Scam Alerts', icon: AlertTriangle, color: 'from-red-400 to-red-500' },
]

const featuredArticle = {
  id: 1,
  title: 'How to Handle Tenants Who Refuse to Vacate Property',
  excerpt: 'Learn the legal process and practical steps to handle tenants who refuse to vacate your property. From notice periods to legal recourse.',
  category: 'legal',
  author: 'Legal Team',
  readTime: '8 min read',
  image: 'https://picsum.photos/seed/guide-featured/1200/600',
  date: 'May 15, 2026',
}

const articles = [
  { id: 2, title: 'First-Time Home Buyer Guide: Complete Step-by-Step Process', excerpt: 'Everything you need to know as a first-time home buyer in India.', category: 'buying', author: 'Property Experts', readTime: '12 min', image: 'https://picsum.photos/seed/guide2/800/500', date: 'May 12, 2026' },
  { id: 3, title: 'Understanding Rental Agreements: Key Clauses and Terms', excerpt: 'A comprehensive guide to understanding rental agreements.', category: 'rental', author: 'Legal Team', readTime: '10 min', image: 'https://picsum.photos/seed/guide3/800/500', date: 'May 10, 2026' },
  { id: 4, title: 'Home Loan Approval Process: Tips for Quick Sanction', excerpt: 'Navigate the home loan approval process with confidence.', category: 'loan', author: 'Finance Team', readTime: '7 min', image: 'https://picsum.photos/seed/guide4/800/500', date: 'May 8, 2026' },
  { id: 5, title: 'Common Property Scams and How to Avoid Them', excerpt: 'Stay protected from property fraud with these essential tips.', category: 'scam', author: 'Safety Team', readTime: '9 min', image: 'https://picsum.photos/seed/guide5/800/500', date: 'May 5, 2026' },
  { id: 6, title: 'Property Valuation Guide: How to Price Your Home Right', excerpt: 'Learn how to accurately value your property for sale or rent.', category: 'buying', author: 'Market Analysts', readTime: '6 min', image: 'https://picsum.photos/seed/guide6/800/500', date: 'May 3, 2026' },
  { id: 7, title: 'Tenant Rights in Uttar Pradesh: Complete Guide', excerpt: 'Know your rights as a tenant in Uttar Pradesh.', category: 'rental', author: 'Legal Team', readTime: '11 min', image: 'https://picsum.photos/seed/guide7/800/500', date: 'Apr 30, 2026' },
  { id: 8, title: 'Home Loan Interest Rates: Fixed vs Floating Rate', excerpt: 'Compare fixed and floating interest rates for home loans.', category: 'loan', author: 'Finance Team', readTime: '5 min', image: 'https://picsum.photos/seed/guide8/800/500', date: 'Apr 28, 2026' },
  { id: 9, title: 'Legal Documentation for Property Purchase in India', excerpt: 'Complete guide to legal documents required for property purchase.', category: 'legal', author: 'Legal Team', readTime: '10 min', image: 'https://picsum.photos/seed/guide9/800/500', date: 'Apr 25, 2026' },
]

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getCategoryInfo = (id: string) => categories.find(c => c.id === id) || categories[0]

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const isFeaturedVisible = activeCategory === 'all' || activeCategory === featuredArticle.category
  const showFeatured = isFeaturedVisible &&
    (featuredArticle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     featuredArticle.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[60vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="absolute top-10 left-10 w-40 h-40 border-[20px] border-gold-400/10 rounded-full" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 px-4 py-2 mb-6"
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <BookOpen className="h-3 w-3" /> News & Guides
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white max-w-3xl">
                Property Knowledge{' '}
                <span className="text-gold-400">Hub</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
                Expert guides, legal insights, and market updates to help you make informed property decisions.
              </p>
              {/* Search */}
              <div className="mt-8 max-w-md relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CATEGORIES ═══ */}
        <section className="py-8 px-6 lg:px-12 bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="mx-auto max-w-7xl flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ═══ FEATURED ═══ */}
        {showFeatured && (
          <section className="pt-12 pb-8 px-6 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white border border-gray-200 overflow-hidden group cursor-pointer"
                style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden min-h-[300px]">
                    <img src={featuredArticle.image} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-gradient-to-r ${getCategoryInfo(featuredArticle.category).color} text-white`}
                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                      >
                        {getCategoryInfo(featuredArticle.category).label}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featuredArticle.readTime}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary-500 leading-snug mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1.5">
                        <User className="h-3 w-3" /> {featuredArticle.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-500 group-hover:gap-2 transition-all">
                        Read Full Article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* ═══ ARTICLES GRID ═══ */}
        <section className="py-12 px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-500">No articles found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                    style={{ clipPath: i % 3 === 0 ? 'polygon(0 0, 100% 0, 100% 100%, 14px 100%)' : i % 3 === 1 ? 'polygon(14px 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)' }}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 inline-flex items-center gap-1 bg-gradient-to-r ${getCategoryInfo(article.category).color} text-white`}
                          style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                        >
                          {getCategoryInfo(article.category).label}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-primary-500 leading-snug mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400 flex items-center gap-1.5">
                          <User className="h-3 w-3" /> {article.author}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 group-hover:text-gold-500 transition-colors group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ SUBSCRIBE ═══ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 overflow-hidden text-center p-10 sm:p-14 lg:p-20"
              style={{ clipPath: 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
              <div className="relative z-10 max-w-xl mx-auto">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Stay Informed</h2>
                <p className="mt-4 text-lg text-white/50">Get the latest property guides, market updates, and scam alerts delivered to your inbox.</p>
                <div className="mt-8 flex gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold-400/50"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                  />
                  <button
                    className="px-6 py-3 bg-gold-400 text-primary-900 font-bold text-sm hover:bg-gold-500 transition-all whitespace-nowrap"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                  >
                    Subscribe
                  </button>
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
