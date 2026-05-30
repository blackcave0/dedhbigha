'use client'

import { useState, useMemo } from 'react'
import { CheckCircle, XCircle, Search, Building2, ChevronLeft, ChevronRight, Eye, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

const ITEMS_PER_PAGE = 8

const approvals = [
  { id: '1', property: '3BHK Luxury Apartment', owner: 'Rahul Sharma', type: 'New Listing', status: 'PENDING', date: '28 May 2026' },
  { id: '2', property: '4BHK Villa', owner: 'Priya Patel', type: 'Price Change', status: 'PENDING', date: '27 May 2026' },
  { id: '3', property: 'Commercial Space', owner: 'Amit Verma', type: 'New Listing', status: 'APPROVED', date: '25 May 2026' },
  { id: '4', property: 'Plot 1500 sqft', owner: 'Sneha Gupta', type: 'Verification', status: 'REJECTED', date: '24 May 2026' },
  { id: '5', property: '2BHK Flat', owner: 'Vikram Singh', type: 'New Listing', status: 'PENDING', date: '26 May 2026' },
  { id: '6', property: 'Penthouse - Gomti Nagar', owner: 'Neha Kapoor', type: 'New Listing', status: 'PENDING', date: '22 May 2026' },
  { id: '7', property: 'Shop - Hazratganj', owner: 'Rohit Joshi', type: 'Price Change', status: 'APPROVED', date: '21 May 2026' },
  { id: '8', property: 'Duplex - Shaheed Path', owner: 'Ananya Singh', type: 'Verification', status: 'PENDING', date: '20 May 2026' },
  { id: '9', property: 'Land - Sultanpur Road', owner: 'Arun Kumar', type: 'New Listing', status: 'REJECTED', date: '19 May 2026' },
  { id: '10', property: '3BHK - Gomti Nagar Ext', owner: 'Deepika Mishra', type: 'Price Change', status: 'PENDING', date: '18 May 2026' },
]

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
]

const statusBadge: Record<string, 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
}

export default function ApprovalsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [viewId, setViewId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = [...approvals]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((a) => a.property.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q))
    }
    if (filter) result = result.filter((a) => a.status === filter)
    return result
  }, [search, filter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const viewed = approvals.find((a) => a.id === viewId)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Approvals</h1>
          <p className="text-sm text-navy-500">Review and manage property listing approvals</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={filterOptions} value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1) }} />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="h-10 w-10 text-navy-300 mb-3" />
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No approvals found</h3>
            <p className="text-sm text-navy-500">All caught up! No pending approvals.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((item) => (
                    <tr key={item.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">{item.property}</td>
                      <td className="px-4 py-3 text-sm text-navy-500">{item.owner}</td>
                      <td className="px-4 py-3 text-sm text-navy-500">{item.type}</td>
                      <td className="px-4 py-3"><Badge variant={statusBadge[item.status] ?? 'default'} size="sm">{item.status}</Badge></td>
                      <td className="px-4 py-3 text-sm text-navy-500">{item.date}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="h-3.5 w-3.5" />} onClick={() => setViewId(item.id)}>Review</Button>
                          {item.status === 'PENDING' && (
                            <>
                              <Button variant="ghost" size="sm" leftIcon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}>Approve</Button>
                              <Button variant="ghost" size="sm" leftIcon={<XCircle className="h-3.5 w-3.5 text-red-500" />}>Reject</Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-navy-900">{item.property}</p>
                      <p className="text-xs text-navy-500">{item.owner}</p>
                    </div>
                    <Badge variant={statusBadge[item.status] ?? 'default'} size="sm">{item.status}</Badge>
                  </div>
                  <div className="flex justify-between text-xs text-navy-500">
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                  {item.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" leftIcon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}>Approve</Button>
                      <Button variant="outline" size="sm" className="flex-1" leftIcon={<XCircle className="h-3.5 w-3.5 text-red-500" />}>Reject</Button>
                    </div>
                  )}
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

      <Modal isOpen={!!viewId} onClose={() => setViewId(null)} title="Review Details" size="md">
        {viewed && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-navy-500">Property:</span><p className="font-medium text-navy-900">{viewed.property}</p></div>
              <div><span className="text-navy-500">Owner:</span><p className="font-medium text-navy-900">{viewed.owner}</p></div>
              <div><span className="text-navy-500">Type:</span><p className="font-medium text-navy-900">{viewed.type}</p></div>
              <div><span className="text-navy-500">Date:</span><p className="font-medium text-navy-900">{viewed.date}</p></div>
            </div>
            {viewed.status === 'PENDING' && (
              <div className="border-t border-navy-100 pt-4 flex justify-end gap-3">
                <Button variant="outline" leftIcon={<XCircle className="h-4 w-4 text-red-500" />}>Reject</Button>
                <Button leftIcon={<CheckCircle className="h-4 w-4" />}>Approve</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
