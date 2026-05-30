'use client'

import Link from 'next/link'
import {
  Building2,
  MessageCircle,
  Heart,
  Eye,
  ListChecks,
  ArrowRight,
  PlusCircle,
  Clock,
  FileText,
  Users,
  Handshake,
  Package,
  Star,
  BarChart3,
  CheckCircle,
  User,
  Settings,
  List,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/store/auth'
import { useDashboardStats } from '@/lib/hooks'
import type { UserRole } from '@/store/auth'

interface Section {
  label: string
  href: string
  icon: LucideIcon
  color: string
  bg: string
}

const roleSections: Record<UserRole, Section[]> = {
  BUYER: [
    { label: 'Saved Properties', href: '/dashboard/saved', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'My Inquiries', href: '/dashboard/inquiries', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'My Reviews', href: '/dashboard/reviews', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Profile', href: '/dashboard/profile', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-navy-600', bg: 'bg-navy-100' },
  ],
  OWNER: [
    { label: 'My Properties', href: '/dashboard/properties', icon: Building2, color: 'text-navy-600', bg: 'bg-navy-100' },
    { label: 'Add Property', href: '/dashboard/properties/add', icon: PlusCircle, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Agreements', href: '/dashboard/agreements', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Profile', href: '/dashboard/profile', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-navy-600', bg: 'bg-navy-100' },
  ],
  DEALER: [
    { label: 'My Listings', href: '/dashboard/listings', icon: List, color: 'text-navy-600', bg: 'bg-navy-100' },
    { label: 'Add Listing', href: '/dashboard/listings/add', icon: PlusCircle, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Clients', href: '/dashboard/clients', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Deals', href: '/dashboard/deals', icon: Handshake, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Profile', href: '/dashboard/profile', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-navy-600', bg: 'bg-navy-100' },
  ],
  BUILDER: [
    { label: 'My Projects', href: '/dashboard/projects', icon: Building2, color: 'text-navy-600', bg: 'bg-navy-100' },
    { label: 'Add Project', href: '/dashboard/projects/add', icon: PlusCircle, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Inventory', href: '/dashboard/inventory', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Team', href: '/dashboard/team', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Profile', href: '/dashboard/profile', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-navy-600', bg: 'bg-navy-100' },
  ],
  ADMIN: [
    { label: 'Users', href: '/dashboard/users', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Properties', href: '/dashboard/properties', icon: Building2, color: 'text-navy-600', bg: 'bg-navy-100' },
    { label: 'Approvals', href: '/dashboard/approvals', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Reports', href: '/dashboard/reports', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-navy-600', bg: 'bg-navy-100' },
    { label: 'Admin Panel', href: '/admin', icon: LayoutDashboard, color: 'text-red-600', bg: 'bg-red-50' },
  ],
}

const recentActivity = [
  { action: 'New lead received for Luxury Villa', time: '5 minutes ago' },
  { action: 'Property "3BHK Apartment" was viewed 12 times', time: '1 hour ago' },
  { action: 'Lead status updated to QUALIFIED', time: '3 hours ago' },
  { action: 'Property "Commercial Space" was saved by 3 users', time: '1 day ago' },
  { action: 'New inquiry for "Farm House"', time: '2 days ago' },
]

function StatsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} padding="md">
          <Skeleton variant="text" width="120px" />
          <Skeleton variant="text" width="60px" className="mt-2 !h-8" />
        </Card>
      ))}
    </>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()

  const role = user?.role ?? 'BUYER'
  const sections = roleSections[role] ?? roleSections.BUYER

  const statCards = [
    {
      label: 'Total Properties',
      value: stats?.totalProperties ?? 0,
      icon: Building2,
      color: 'text-primary-500',
      bg: 'bg-primary-50',
    },
    {
      label: 'Total Leads',
      value: stats?.totalLeads ?? 0,
      icon: MessageCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Views',
      value: stats?.totalViews ?? 0,
      icon: Eye,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Active Listings',
      value: stats?.activeListings ?? 0,
      icon: ListChecks,
      color: 'text-accent-gold',
      bg: 'bg-yellow-50',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-navy-900">
          Welcome back, {user?.name ?? 'User'}
          <span className="ml-3 inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-primary-700 align-middle">
            {user?.role ?? 'BUYER'}
          </span>
        </h1>
        <p className="text-sm text-navy-500">
          Here&apos;s what&apos;s happening with your properties today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          <StatsSkeleton />
        ) : (
          statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} padding="md" hoverable>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-navy-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-navy-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-navy-900 mb-3">
          {role === 'ADMIN' ? 'Admin Dashboard' : 'Dashboard Sections'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-navy-200 bg-white p-4 text-center transition-all hover:border-primary-500 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`rounded-lg p-2.5 ${section.bg}`}>
                  <Icon className={`h-5 w-5 ${section.color}`} />
                </div>
                <span className="text-xs font-semibold text-navy-800 leading-tight">
                  {section.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-900">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>
          <div className="space-y-0">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-navy-100 py-3 last:border-0"
              >
                <div className="rounded-full bg-navy-100 p-2">
                  <Clock className="h-4 w-4 text-navy-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy-700">{activity.action}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold text-navy-900 mb-1">
            Quick Stats
          </h2>
          <p className="text-xs text-navy-400 mb-4">At a glance overview</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2.5">
              <span className="text-sm text-navy-600">Properties</span>
              <span className="text-sm font-bold text-navy-900">{stats?.totalProperties ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2.5">
              <span className="text-sm text-navy-600">Leads</span>
              <span className="text-sm font-bold text-navy-900">{stats?.totalLeads ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2.5">
              <span className="text-sm text-navy-600">Views</span>
              <span className="text-sm font-bold text-navy-900">{stats?.totalViews ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2.5">
              <span className="text-sm text-navy-600">Active</span>
              <span className="text-sm font-bold text-navy-900">{stats?.activeListings ?? 0}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
