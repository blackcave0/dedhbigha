'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Building2,
  Clock,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

interface Property {
  id: string
  title: string
  owner: string
  price: string
  status: 'VERIFIED' | 'PENDING' | 'REJECTED'
  submittedDate: string
  image?: string
}

const mockProperties: Property[] = [
  { id: '1', title: '3BHK Luxury Apartment in Powai', owner: 'Rahul Sharma', price: '₹1.2 Cr', status: 'VERIFIED', submittedDate: '2026-05-26' },
  { id: '2', title: '4BHK Independent Villa', owner: 'Priya Patel', price: '₹2.5 Cr', status: 'PENDING', submittedDate: '2026-05-25' },
  { id: '3', title: 'Commercial Space in MG Road', owner: 'Amit Kumar', price: '₹85 L', status: 'PENDING', submittedDate: '2026-05-24' },
  { id: '4', title: 'Plot in Electronic City', owner: 'Sneha Reddy', price: '₹45 L', status: 'REJECTED', submittedDate: '2026-05-23' },
  { id: '5', title: '2BHK Flat for Rent', owner: 'Vikram Singh', price: '₹25K/mo', status: 'VERIFIED', submittedDate: '2026-05-22' },
  { id: '6', title: 'Farm House on Highway', owner: 'Ananya Gupta', price: '₹1.8 Cr', status: 'PENDING', submittedDate: '2026-05-21' },
  { id: '7', title: 'Penthouse with Sea View', owner: 'Rohit Verma', price: '₹3.2 Cr', status: 'VERIFIED', submittedDate: '2026-05-20' },
  { id: '8', title: 'Studio Apartment', owner: 'Neha Joshi', price: '₹35 L', status: 'REJECTED', submittedDate: '2026-05-19' },
  { id: '9', title: 'Duplex in Golf Course Road', owner: 'Deepak Nair', price: '₹1.5 Cr', status: 'PENDING', submittedDate: '2026-05-18' },
  { id: '10', title: 'Warehouse for Lease', owner: 'Kavita Desai', price: '₹60 L', status: 'VERIFIED', submittedDate: '2026-05-17' },
  { id: '11', title: 'Row House in Wakad', owner: 'Rahul Sharma', price: '₹75 L', status: 'PENDING', submittedDate: '2026-05-16' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'VERIFIED', label: 'Verified' },
  { value: 'REJECTED', label: 'Rejected' },
]

const statusBadge: Record<string, 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  VERIFIED: 'success',
  REJECTED: 'danger',
}

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [properties, setProperties] = useState(mockProperties)

  const filtered = useMemo(() => {
    let result = [...properties]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.owner.toLowerCase().includes(q),
      )
    }
    if (statusFilter) result = result.filter((p) => p.status === statusFilter)
    return result
  }, [properties, search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const updateStatus = (id: string, status: 'VERIFIED' | 'REJECTED') => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Property Moderation</h1>
        <p className="text-sm text-navy-500">Verify and manage all property listings</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search properties..."
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
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <Building2 className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No properties found</h3>
            <p className="text-sm text-navy-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((property) => (
                    <tr key={property.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-navy-900">{property.title}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-600">{property.owner}</td>
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">{property.price}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusBadge[property.status]} size="sm">
                          {property.status === 'PENDING' && (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {property.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-500">
                        {new Date(property.submittedDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {property.status === 'PENDING' ? (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              leftIcon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}
                              onClick={() => updateStatus(property.id, 'VERIFIED')}
                            >
                              Verify
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              leftIcon={<XCircle className="h-3.5 w-3.5 text-red-500" />}
                              onClick={() => updateStatus(property.id, 'REJECTED')}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : property.status === 'VERIFIED' ? (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="danger" size="sm">
                            <XCircle className="mr-1 h-3 w-3" />
                            Rejected
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((property) => (
                <div key={property.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900">{property.title}</p>
                      <p className="text-xs text-navy-400">{property.owner}</p>
                    </div>
                    <Badge variant={statusBadge[property.status]} size="sm">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary-500">{property.price}</p>
                      <p className="text-xs text-navy-400">
                        {new Date(property.submittedDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    {property.status === 'PENDING' && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}
                          onClick={() => updateStatus(property.id, 'VERIFIED')}
                        >
                          Verify
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<XCircle className="h-3.5 w-3.5 text-red-500" />}
                          onClick={() => updateStatus(property.id, 'REJECTED')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
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
