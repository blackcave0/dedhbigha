'use client'

import { useState, useMemo } from 'react'
import { Search, MessageCircle, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'CLOSED', label: 'Closed' },
]

const statusBadge: Record<string, 'warning' | 'info' | 'success'> = {
  PENDING: 'warning',
  CONTACTED: 'info',
  CLOSED: 'success',
}

const inquiriesData = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', property: '3BHK Luxury Apartment', status: 'PENDING', date: '28 May 2026' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', property: '4BHK Independent Villa', status: 'CONTACTED', date: '27 May 2026' },
  { id: '3', name: 'Amit Verma', email: 'amit@example.com', phone: '+91 98765 43212', property: 'Commercial Space', status: 'CLOSED', date: '25 May 2026' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 98765 43213', property: '2BHK Flat', status: 'PENDING', date: '24 May 2026' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', property: 'Plot 1500 sqft', status: 'CONTACTED', date: '23 May 2026' },
  { id: '6', name: 'Neha Kapoor', email: 'neha@example.com', phone: '+91 98765 43215', property: 'Penthouse - Gomti Nagar', status: 'PENDING', date: '22 May 2026' },
  { id: '7', name: 'Rohit Joshi', email: 'rohit@example.com', phone: '+91 98765 43216', property: 'Shop - Hazratganj', status: 'CONTACTED', date: '21 May 2026' },
  { id: '8', name: 'Ananya Singh', email: 'ananya@example.com', phone: '+91 98765 43217', property: 'Duplex - Shaheed Path', status: 'CLOSED', date: '20 May 2026' },
  { id: '9', name: 'Arun Kumar', email: 'arun@example.com', phone: '+91 98765 43218', property: 'Land - Sultanpur Road', status: 'PENDING', date: '19 May 2026' },
  { id: '10', name: 'Deepika Mishra', email: 'deepika@example.com', phone: '+91 98765 43219', property: '3BHK - Gomti Nagar Extension', status: 'CONTACTED', date: '18 May 2026' },
]

export default function InquiriesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const isLoading = false

  const filtered = useMemo(() => {
    let result = [...inquiriesData]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.property.toLowerCase().includes(q)
      )
    }
    if (statusFilter) result = result.filter((i) => i.status === statusFilter)
    return result
  }, [search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">My Inquiries</h1>
        <p className="text-sm text-navy-500">Manage inquiries from potential buyers and tenants</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search inquiries..."
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
            {[1, 2, 3].map((i) => (
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
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No inquiries yet</h3>
            <p className="text-sm text-navy-500">
              {search || statusFilter ? 'Try adjusting your filters' : 'Inquiries will appear here when someone shows interest in your property'}
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
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((inq) => (
                    <tr key={inq.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                            {inq.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-navy-900">{inq.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-navy-600">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[160px]">{inq.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-navy-600">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{inq.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-700">{inq.property}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusBadge[inq.status] ?? 'default'} size="sm">{inq.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-500">{inq.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a href={`tel:${inq.phone}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                        <a href={`mailto:${inq.email}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <a href={`/dashboard/messages?inquiry=${inq.id}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((inq) => (
                <div key={inq.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{inq.name}</p>
                        <p className="text-xs text-navy-400">{inq.date}</p>
                      </div>
                    </div>
                    <Badge variant={statusBadge[inq.status] ?? 'default'} size="sm">{inq.status}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-navy-500">
                    <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {inq.email}</div>
                    <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {inq.phone}</div>
                    <p className="text-navy-700">Property: {inq.property}</p>
                  </div>
                  <div className="flex gap-1 pt-1">
                    <a href={`tel:${inq.phone}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a href={`mailto:${inq.email}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    <a href={`/dashboard/messages?inquiry=${inq.id}`} className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 hover:text-navy-700 transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3">
                <p className="text-sm text-navy-500">Page {page} of {totalPages}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} leftIcon={<ChevronLeft className="h-4 w-4" />}>Previous</Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} rightIcon={<ChevronRight className="h-4 w-4" />}>Next</Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
