'use client'

import Link from 'next/link'
import {
  Building2,
  MessageCircle,
  Heart,
  TrendingUp,
  Eye,
  ListChecks,
  ArrowRight,
  PlusCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/store/auth'
import { useDashboardStats } from '@/lib/hooks'

const quickActions = [
  {
    label: 'Post Property',
    href: '/post-property',
    icon: PlusCircle,
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    label: 'View Leads',
    href: '/dashboard/leads',
    icon: MessageCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Saved Properties',
    href: '/dashboard/saved',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    label: 'All Properties',
    href: '/dashboard/properties',
    icon: Building2,
    color: 'text-navy-600',
    bg: 'bg-navy-100',
  },
]

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
          <h2 className="text-lg font-semibold text-navy-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center gap-3 rounded-lg border border-navy-200 p-3 transition-colors hover:border-primary-500 hover:bg-primary-50">
                    <div className={`rounded-lg p-2 ${action.bg}`}>
                      <Icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="text-sm font-medium text-navy-700">
                      {action.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-navy-400" />
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
