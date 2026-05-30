'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, User, LogOut, Building2, Heart, Search } from 'lucide-react'
import { useAuth } from '@/store/auth'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  isScrolled?: boolean
}

const navLinks = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'For Sellers', href: '/for-sellers' },
  { label: 'For Tenants', href: '/for-tenants' },
  { label: 'Services', href: '/services' },
  { label: 'Guides', href: '/guides' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Agents', href: '/agents' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
]

export default function MobileNav({ isOpen, onClose, isScrolled }: MobileNavProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    onClose()
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                  <Home className="h-4 w-4 text-white" />
                </div>
                <span className="font-heading text-xl font-bold text-primary-500">
                  Dedh<span className="text-accent-gold">Bigha</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isAuthenticated && user && (
              <div className="border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-primary-500">{user.name}</p>
                    <p className="truncate text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-b border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Navigate</p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <p className="mb-2 mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Property Types</p>
              {['Flat/Apartment', 'Villa/House', 'Plot/Land', 'Commercial'].map((type) => (
                <Link
                  key={type}
                  href={`/buy?type=${type.toLowerCase().replace('/', '-')}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <Building2 className="h-4 w-4 text-gray-400" />
                  {type}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 p-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/saved"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Heart className="h-4 w-4" />
                    Saved
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth"
                    onClick={onClose}
                    className="flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login / Register
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}