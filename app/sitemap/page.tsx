'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Home, Search, Building2, Users,
  FileText, Shield, Info, Phone,
  ShoppingBag, Key, Crown, BookOpen,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const groups = [
  {
    title: 'Main Pages',
    icon: Home,
    links: [
      { label: 'Home', href: '/' },
      { label: 'Buy Property', href: '/buy' },
      { label: 'Rent Property', href: '/rent' },
      { label: 'Search Properties', href: '/search' },
      { label: 'Post Property', href: '/post-property' },
    ],
  },
  {
    title: 'Information',
    icon: Info,
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'For Sellers', href: '/for-sellers' },
      { label: 'For Tenants', href: '/for-tenants' },
      { label: 'Agents', href: '/agents' },
    ],
  },
  {
    title: 'Resources',
    icon: BookOpen,
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Guides & Articles', href: '/guides' },
      { label: 'Pricing & Plans', href: '/pricing' },
      { label: 'Verified Properties', href: '/verified' },
      { label: 'Trust & Safety', href: '/safety' },
    ],
  },
  {
    title: 'Legal',
    icon: Shield,
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
  {
    title: 'Account',
    icon: Users,
    links: [
      { label: 'Login / Register', href: '/auth' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Saved Properties', href: '/dashboard/saved' },
      { label: 'Settings', href: '/dashboard/settings' },
    ],
  },
  {
    title: 'Property Types',
    icon: Building2,
    links: [
      { label: 'Flats / Apartments', href: '/buy?type=flat-apartment' },
      { label: 'Villas / Houses', href: '/buy?type=villa-house' },
      { label: 'Plots / Land', href: '/buy?type=plot-land' },
      { label: 'Commercial', href: '/buy?type=commercial' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative py-28 lg:py-36 bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                <span className="text-gold-400">Sitemap</span>
              </h1>
              <p className="mt-4 text-white/50">Explore all pages on DedhBigha</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, i) => {
                const Icon = group.icon
                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white border border-gray-200 p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center bg-primary-100 text-primary-500"
                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="font-heading text-sm font-bold text-primary-500 uppercase tracking-wider">{group.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
