'use client'

import { useState, useMemo } from 'react'
import { Package, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const ITEMS_PER_PAGE = 10

const inventory = [
  { id: '1', item: '3BHK Flat - Block A', project: 'Green Valley', status: 'AVAILABLE', price: '₹85L' },
  { id: '2', item: '2BHK Flat - Block B', project: 'Green Valley', status: 'AVAILABLE', price: '₹65L' },
  { id: '3', item: 'Commercial Shop - Ground', project: 'Green Valley', status: 'BOOKED', price: '₹1.2Cr' },
  { id: '4', item: '4BHK Villa - Phase 1', project: 'Lakeview', status: 'AVAILABLE', price: '₹2.5Cr' },
  { id: '5', item: '3BHK Villa - Phase 1', project: 'Lakeview', status: 'SOLD', price: '₹1.8Cr' },
  { id: '6', item: 'Penthouse - Tower A', project: 'Green Valley', status: 'AVAILABLE', price: '₹1.5Cr' },
  { id: '7', item: '2BHK Flat - Tower B', project: 'Green Valley', status: 'AVAILABLE', price: '₹72L' },
  { id: '8', item: '3BHK Flat - Lakeview East', project: 'Lakeview', status: 'BOOKED', price: '₹95L' },
  { id: '9', item: 'Studio Apartment - Tower A', project: 'Green Valley', status: 'AVAILABLE', price: '₹45L' },
  { id: '10', item: 'Commercial Shop - First Floor', project: 'Green Valley', status: 'AVAILABLE', price: '₹85L' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'SOLD', label: 'Sold' },
]

const statusBadge: Record<string, 'success' | 'warning' | 'info'> = {
  AVAILABLE: 'success',
  BOOKED: 'warning',
  SOLD: 'info',
}

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...inventory]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((i) => i.item.toLowerCase().includes(q) || i.project.toLowerCase().includes(q))
    }
    if (statusFilter) result = result.filter((i) => i.status === statusFilter)
    return result
  }, [search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Inventory</h1>
          <p className="text-sm text-navy-500">Manage your project inventory and unit availability</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add Unit</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search inventory..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-10 w-10 text-navy-300 mb-3" />
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No inventory found</h3>
            <p className="text-sm text-navy-500">Add units to your projects to track inventory.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Unit</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((item) => (
                    <tr key={item.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">{item.item}</td>
                      <td className="px-4 py-3 text-sm text-navy-500">{item.project}</td>
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">{item.price}</td>
                      <td className="px-4 py-3"><Badge variant={statusBadge[item.status] ?? 'default'} size="sm">{item.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((item) => (
                <div key={item.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div><p className="text-sm font-medium text-navy-900">{item.item}</p><p className="text-xs text-navy-500">{item.project}</p></div>
                    <Badge variant={statusBadge[item.status] ?? 'default'} size="sm">{item.status}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-primary-500">{item.price}</p>
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
