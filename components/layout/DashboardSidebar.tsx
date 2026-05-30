'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Heart,
  Star,
  User,
  Settings,
  Building2,
  PlusCircle,
  MessageCircle,
  FileText,
  List,
  Users,
  Handshake,
  Package,
  CheckCircle,
  BarChart3,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react'
import type { UserRole } from '@/store/auth'
import { useAuth } from '@/store/auth'

interface MenuItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const menuByRole: Record<UserRole, MenuItem[]> = {
  BUYER: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Saved Properties', href: '/dashboard/saved', icon: Heart },
    { label: 'My Inquiries', href: '/dashboard/inquiries', icon: MessageCircle },
    { label: 'My Reviews', href: '/dashboard/reviews', icon: Star },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  OWNER: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Properties', href: '/dashboard/properties', icon: Building2 },
    { label: 'Add Property', href: '/dashboard/properties/add', icon: PlusCircle },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle },
    { label: 'Agreements', href: '/dashboard/agreements', icon: FileText },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  DEALER: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', href: '/dashboard/listings', icon: List },
    { label: 'Add Property', href: '/dashboard/listings/add', icon: PlusCircle },
    { label: 'Clients', href: '/dashboard/clients', icon: Users },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle },
    { label: 'Deals', href: '/dashboard/deals', icon: Handshake },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  BUILDER: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Projects', href: '/dashboard/projects', icon: Building2 },
    { label: 'Add Project', href: '/dashboard/projects/add', icon: PlusCircle },
    { label: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle },
    { label: 'Team', href: '/dashboard/team', icon: Users },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Users', href: '/dashboard/users', icon: Users },
    { label: 'Properties', href: '/dashboard/properties', icon: Building2 },
    { label: 'Approvals', href: '/dashboard/approvals', icon: CheckCircle },
    { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
}

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const menuItems = menuByRole[user?.role ?? 'BUYER']

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* User Info */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div className={`min-w-0 flex-1 ${isCollapsed ? 'hidden' : 'block'}`}>
            <p className="truncate text-sm font-semibold text-navy-900">{user?.name ?? 'User'}</p>
            <p className="truncate text-xs capitalize text-gray-500">
              {user?.role?.toLowerCase() ?? 'buyer'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-navy-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${active ? 'text-primary-500' : ''}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className={`border-t border-gray-100 p-3 ${isCollapsed ? 'text-center' : ''}`}>
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden border-t border-gray-100 p-3 text-gray-400 transition-colors hover:text-navy-900 lg:block"
      >
        <ChevronLeft
          className={`mx-auto h-5 w-5 transition-transform duration-200 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-20 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-navy-900" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <span className="font-heading text-lg font-bold text-navy-900">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-full flex-col border-r border-gray-200 bg-white transition-all duration-200 lg:flex ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
