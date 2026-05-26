'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  Settings,
  Shield,
  ChevronLeft,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/store/auth'
import { cn } from '@/lib/utils'

const adminMenu = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-navy-800/50 px-4 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className={cn('min-w-0 flex-1', isCollapsed && 'hidden')}>
          <p className="text-sm font-bold text-white">Admin Panel</p>
          <p className="text-xs text-navy-400">DedhBigha</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {adminMenu.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-white',
                    isCollapsed && 'justify-center',
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className={cn('border-t border-navy-800/50 p-3', isCollapsed && 'text-center')}>
        <button
          onClick={logout}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10',
            isCollapsed && 'justify-center',
          )}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden border-t border-navy-800/50 p-3 text-navy-500 transition-colors hover:text-white lg:block"
      >
        <ChevronLeft
          className={cn(
            'mx-auto h-5 w-5 transition-transform duration-200',
            isCollapsed && 'rotate-180',
          )}
        />
      </button>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 shadow-lg lg:hidden"
        aria-label="Open admin sidebar"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

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
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy-900 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-navy-800/50 px-4 py-3">
                <span className="font-heading text-lg font-bold text-white">Admin</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 hover:bg-navy-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'hidden h-full flex-col border-r border-navy-800/50 bg-navy-900 transition-all duration-200 lg:flex',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-navy-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-navy-50 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
