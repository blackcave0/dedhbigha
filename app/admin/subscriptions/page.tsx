'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

interface Subscription {
  id: string
  user: string
  plan: string
  price: string
  startDate: string
  endDate: string
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'TRIAL'
}

const mockSubscriptions: Subscription[] = [
  { id: '1', user: 'Rahul Sharma', plan: 'Premium Annual', price: '₹12,000', startDate: '2026-01-15', endDate: '2027-01-15', status: 'ACTIVE' },
  { id: '2', user: 'Priya Patel', plan: 'Basic Monthly', price: '₹999', startDate: '2026-04-20', endDate: '2026-05-20', status: 'EXPIRED' },
  { id: '3', user: 'Amit Kumar', plan: 'Professional', price: '₹4,999', startDate: '2026-03-10', endDate: '2026-09-10', status: 'ACTIVE' },
  { id: '4', user: 'Sneha Reddy', plan: 'Premium Annual', price: '₹12,000', startDate: '2025-12-01', endDate: '2026-12-01', status: 'ACTIVE' },
  { id: '5', user: 'Vikram Singh', plan: 'Free Trial', price: '₹0', startDate: '2026-05-01', endDate: '2026-06-01', status: 'TRIAL' },
  { id: '6', user: 'Ananya Gupta', plan: 'Basic Monthly', price: '₹999', startDate: '2026-02-15', endDate: '2026-03-15', status: 'CANCELLED' },
  { id: '7', user: 'Rohit Verma', plan: 'Professional', price: '₹4,999', startDate: '2026-04-01', endDate: '2026-10-01', status: 'ACTIVE' },
  { id: '8', user: 'Neha Joshi', plan: 'Enterprise', price: '₹24,999', startDate: '2026-01-01', endDate: '2026-12-31', status: 'ACTIVE' },
  { id: '9', user: 'Deepak Nair', plan: 'Free Trial', price: '₹0', startDate: '2026-05-10', endDate: '2026-06-10', status: 'TRIAL' },
  { id: '10', user: 'Kavita Desai', plan: 'Basic Monthly', price: '₹999', startDate: '2026-05-15', endDate: '2026-06-15', status: 'ACTIVE' },
  { id: '11', user: 'Rajesh Khanna', plan: 'Premium Annual', price: '₹12,000', startDate: '2025-11-15', endDate: '2026-11-15', status: 'ACTIVE' },
  { id: '12', user: 'Meera Iyer', plan: 'Professional', price: '₹4,999', startDate: '2025-08-20', endDate: '2026-02-20', status: 'EXPIRED' },
]

const planOptions = [
  { value: '', label: 'All Plans' },
  { value: 'Free Trial', label: 'Free Trial' },
  { value: 'Basic Monthly', label: 'Basic Monthly' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Premium Annual', label: 'Premium Annual' },
  { value: 'Enterprise', label: 'Enterprise' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'TRIAL', label: 'Trial' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

const statusBadge: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'default'> = {
  ACTIVE: 'success',
  TRIAL: 'info',
  EXPIRED: 'danger',
  CANCELLED: 'default',
}

function SubscriptionStatusBadge({ status }: { status: string }) {
  const label = status === 'TRIAL' ? 'Free Trial' : status
  return (
    <Badge variant={statusBadge[status] ?? 'default'} size="sm">
      {label}
    </Badge>
  )
}

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...mockSubscriptions]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.user.toLowerCase().includes(q) ||
          s.plan.toLowerCase().includes(q),
      )
    }
    if (planFilter) result = result.filter((s) => s.plan === planFilter)
    if (statusFilter) result = result.filter((s) => s.status === statusFilter)
    return result
  }, [search, planFilter, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Subscriptions</h1>
        <p className="text-sm text-navy-500">Manage all user subscriptions and plans</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search subscriptions..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={planOptions}
              value={planFilter}
              onChange={(e) => { setPlanFilter(e.target.value); setPage(1) }}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <CreditCard className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No subscriptions found</h3>
            <p className="text-sm text-navy-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">End Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((sub) => (
                    <tr key={sub.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                            {sub.user.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-navy-900">{sub.user}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-700">{sub.plan}</td>
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">{sub.price}</td>
                      <td className="px-4 py-3 text-sm text-navy-500">
                        {new Date(sub.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-500">
                        {new Date(sub.endDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <SubscriptionStatusBadge status={sub.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((sub) => (
                <div key={sub.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                        {sub.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{sub.user}</p>
                        <p className="text-xs text-navy-400">{sub.plan}</p>
                      </div>
                    </div>
                    <SubscriptionStatusBadge status={sub.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-navy-500">
                    <span>Price: <strong className="text-navy-900">{sub.price}</strong></span>
                    <span>Ends: {new Date(sub.endDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}</span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3">
                <p className="text-sm text-navy-500">Page {page} of {totalPages}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
