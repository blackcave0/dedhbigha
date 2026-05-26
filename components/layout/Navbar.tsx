'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Search,
  Menu,
  Heart,
  User,
  ChevronDown,
  Building2,
  MapPin,
  LogOut,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { useAuth } from '@/store/auth'
import MobileNav from './MobileNav'

const navItems = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'New Projects', href: '/new-projects' },
  { label: 'Commercial', href: '/commercial' },
]

const userMenuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Saved', href: '/dashboard/saved', icon: Heart },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Navbar() {
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setScrolled] = useState(false)
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'
  const showBg = isScrolled || !isHome

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showBg
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${showBg ? 'bg-primary-500' : 'bg-white/20'}`}>
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className={`font-heading text-xl font-bold tracking-tight transition-colors ${
                showBg ? 'text-primary-500' : 'text-white'
              }`}>
                Dedh<span className={showBg ? 'text-accent-gold' : 'text-gold-400'}>Bigha</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? showBg
                        ? 'bg-primary-50 text-primary-600'
                        : 'bg-white/15 text-white'
                      : showBg
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/agents"
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  showBg
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <User className="h-4 w-4" />
                Agents
              </Link>

              <Link
                href="/dashboard/saved"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  showBg
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="Saved properties"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      showBg
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                        <div className="border-b border-gray-100 px-4 pb-2 mb-1">
                          <p className="text-sm font-semibold text-primary-500">{user.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <item.icon className="h-4 w-4 text-gray-400" />
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 pt-1 mt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    showBg
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors lg:hidden ${
                  showBg
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileOpen} onClose={() => setMobileOpen(false)} isScrolled={showBg} />
    </>
  )
}