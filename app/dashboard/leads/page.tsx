'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { useLeads } from '@/lib/hooks'

const ITEMS_PER_PAGE = 10

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'LOST', label: 'Lost' },
]

const statusBadge: Record<string, 'info' | 'warning' | 'success' | 'default' | 'danger'> = {
  NEW: 'info',
  CONTACTED: 'warning',
  QUALIFIED: 'success',
  CLOSED: 'default',
  LOST: 'danger',
}

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const { data: leads, isLoading } = useLeads()

  const filtered = useMemo(() => {
    if (!leads) return []
    let result = [...leads]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.includes(q) ||
          false
      )
    }
    if (statusFilter) {
      result = result.filter((l) => l.status === statusFilter)
    }
    return result
  }, [leads, search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId)
    // TODO: implement lead status update mutation
    await new Promise((r) => setTimeout(r, 300))
    setUpdatingId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Leads</h1>
        <p className="text-sm text-navy-500">
          Manage inquiries and leads from potential buyers
        </p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search leads..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {isLoading ? (
          <div className="divide-y divide-navy-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="60%" />
                </div>
              </div>
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <MessageCircle className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">
              No leads yet
            </h3>
            <p className="text-sm text-navy-500">
              {search || statusFilter
                ? 'Try adjusting your search or filters'
                : 'Leads will appear here when buyers inquire about your properties'}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((lead) => (
                    <tr key={lead.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                            {lead.name?.charAt(0).toUpperCase() ?? '?'}
                          </div>
                          <span className="text-sm font-medium text-navy-900">
                            {lead.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-navy-600">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-navy-600">
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-700">
                        {lead.propertyId ? lead.propertyId.slice(0, 8) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusBadge[lead.status as string] ?? 'default'} size="sm">
                          {lead.status as string}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-500">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Select
                          options={statusOptions.slice(1)}
                          value={lead.status as string}
                          onChange={(e) => handleStatusUpdate(lead.id!, e.target.value)}
                          containerClassName="w-36"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((lead) => (
                <div key={lead.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                        {lead.name?.charAt(0).toUpperCase() ?? '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{lead.name}</p>
                        <p className="text-xs text-navy-400">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>
                    <Badge variant={statusBadge[lead.status as string] ?? 'default'} size="sm">
                      {lead.status as string}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-navy-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {lead.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {lead.phone}
                    </div>
                    <p className="text-navy-700">
                      Property ID: {lead.propertyId ?? '—'}
                    </p>
                  </div>
                  <Select
                    options={statusOptions.slice(1)}
                    value={lead.status as string}
                    onChange={(e) => handleStatusUpdate(lead.id!, e.target.value)}
                    containerClassName="w-full"
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3">
                <p className="text-sm text-navy-500">
                  Page {page} of {totalPages}
                </p>
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
