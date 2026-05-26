'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Building2,
  CreditCard,
  TrendingUp,
  DollarSign,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Properties', value: '3,567', change: '+8%', icon: Building2, color: 'text-primary-500', bg: 'bg-primary-50' },
  { label: 'Subscriptions', value: '342', change: '+5%', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Revenue (MTD)', value: '₹4.2L', change: '+18%', icon: DollarSign, color: 'text-accent-gold', bg: 'bg-yellow-50' },
]

const recentUsers = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'OWNER', status: 'Active', date: '26 May 2026' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', role: 'BUYER', status: 'Active', date: '25 May 2026' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', role: 'DEALER', status: 'Inactive', date: '24 May 2026' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'BUILDER', status: 'Active', date: '23 May 2026' },
]

const recentProperties = [
  { id: '1', title: '3BHK Luxury Apartment', owner: 'Rahul Sharma', price: '₹1.2 Cr', status: 'VERIFIED', date: '26 May 2026' },
  { id: '2', title: '4BHK Villa in Whitefield', owner: 'Priya Patel', price: '₹2.5 Cr', status: 'PENDING', date: '25 May 2026' },
  { id: '3', title: 'Commercial Space', owner: 'Amit Kumar', price: '₹85 L', status: 'VERIFIED', date: '24 May 2026' },
  { id: '4', title: 'Plot in Electronic City', owner: 'Sneha Reddy', price: '₹45 L', status: 'REJECTED', date: '23 May 2026' },
]

const statusBadge: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  ACTIVE: 'success',
  Active: 'success',
  Inactive: 'default',
  VERIFIED: 'success',
  PENDING: 'warning',
  REJECTED: 'danger',
}

export default function AdminDashboardPage() {
  const isLoading = false

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <p className="text-sm text-navy-500">
          Overview of your platform
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padding="md" hoverable>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-navy-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                  <p className="text-xs font-medium text-green-600">{stat.change} this month</p>
                </div>
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-900">Recent Users</h2>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Role</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="text-sm">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-navy-900">{u.name}</p>
                      <p className="text-xs text-navy-400">{u.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-navy-600">{u.role}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={statusBadge[u.status] ?? 'default'} size="sm">
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-navy-500">{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-900">Recent Properties</h2>
            <Link href="/admin/properties">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                  <th className="pb-2 pr-4">Property</th>
                  <th className="pb-2 pr-4">Owner</th>
                  <th className="pb-2 pr-4">Price</th>
                  <th className="pb-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {recentProperties.map((p) => (
                  <tr key={p.id} className="text-sm">
                    <td className="py-3 pr-4 font-medium text-navy-900">{p.title}</td>
                    <td className="py-3 pr-4 text-navy-600">{p.owner}</td>
                    <td className="py-3 pr-4 text-navy-900">{p.price}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={statusBadge[p.status] ?? 'default'} size="sm">
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-900">Quick Actions</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/users">
            <div className="flex items-center gap-3 rounded-lg border border-navy-200 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50">
              <div className="rounded-lg bg-blue-50 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-navy-700">Manage Users</span>
            </div>
          </Link>
          <Link href="/admin/properties">
            <div className="flex items-center gap-3 rounded-lg border border-navy-200 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50">
              <div className="rounded-lg bg-primary-50 p-2">
                <CheckCircle className="h-5 w-5 text-primary-500" />
              </div>
              <span className="text-sm font-medium text-navy-700">Verify Properties</span>
            </div>
          </Link>
          <Link href="/admin/subscriptions">
            <div className="flex items-center gap-3 rounded-lg border border-navy-200 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50">
              <div className="rounded-lg bg-green-50 p-2">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-navy-700">Subscriptions</span>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="flex items-center gap-3 rounded-lg border border-navy-200 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50">
              <div className="rounded-lg bg-navy-100 p-2">
                <TrendingUp className="h-5 w-5 text-navy-600" />
              </div>
              <span className="text-sm font-medium text-navy-700">View Reports</span>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  )
}
