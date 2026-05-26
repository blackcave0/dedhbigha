'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { Modal } from '@/components/ui/Modal'
import { useProperties, useDeleteProperty } from '@/lib/hooks'
import { useAuth } from '@/store/auth'
import type { Property } from '@/lib/types'



const statusVariant: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  SOLD: 'info',
  INACTIVE: 'default',
}

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SOLD', label: 'Sold' },
  { value: 'INACTIVE', label: 'Inactive' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'views', label: 'Most Viewed' },
]

const ITEMS_PER_PAGE = 8

export default function PropertiesPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useProperties({ page, limit: ITEMS_PER_PAGE, status: statusFilter || undefined })
  const deleteMutation = useDeleteProperty()

  const properties = data?.properties ?? []
  const totalCount = data?.totalCount ?? data?.total ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const filtered = useMemo(() => {
    const list = (properties ?? []) as (Property & { status?: string; views?: number; leads?: number })[]
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q) ||
        p.price?.toString().includes(q),
    )
  }, [properties, search])

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteMutation.mutateAsync(deleteId)
    setDeleteId(null)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">My Properties</h1>
          <p className="text-sm text-navy-500">
            Manage your property listings
          </p>
        </div>
        <Link href="/post-property">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add New Property</Button>
        </Link>
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
          <div className="w-full sm:w-44">
            <Select
              options={sortOptions}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {isLoading ? (
          <div className="divide-y divide-navy-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton variant="rectangular" width={64} height={48} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="30%" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <Building2 className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">
              No properties found
            </h3>
            <p className="text-sm text-navy-500 mb-4">
              {search || statusFilter
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first property'}
            </p>
            {!search && !statusFilter && (
              <Link href="/post-property">
                <Button leftIcon={<Plus className="h-4 w-4" />}>Add New Property</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Views</th>
                    <th className="px-4 py-3 text-center">Leads</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {filtered.map((property) => (
                    <tr key={property.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-navy-200">
                            {property.images?.[0] ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Building2 className="h-5 w-5 text-navy-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-navy-900 truncate max-w-[200px] lg:max-w-[300px]">
                              {property.title}
                            </p>
                            <p className="text-xs text-navy-400">
                              {property.city}{property.state ? `, ${property.state}` : ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-navy-900">
                        {property.price ? formatPrice(property.price) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={statusVariant[property.status as string] ?? 'default'}
                          size="sm"
                        >
                          {property.status as string}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-navy-600">
                          <Eye className="h-3.5 w-3.5" />
                          {property.views ?? 0}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-navy-600">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {property.leads ?? 0}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-500" />}
                            onClick={() => setDeleteId(property.id ?? null)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {filtered.map((property) => (
                <div key={property.id ?? property.title} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-navy-200">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Building2 className="h-6 w-6 text-navy-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900">{property.title}</p>
                      <p className="text-xs text-navy-400">
                        {property.city}{property.state ? `, ${property.state}` : ''}
                      </p>
                      <p className="text-sm font-semibold text-primary-500 mt-1">
                        {property.price ? formatPrice(property.price) : '—'}
                      </p>
                    </div>
                    <Badge variant={statusVariant[property.status as string] ?? 'default'} size="sm">
                      {property.status as string}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-navy-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {property.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" /> {property.leads ?? 0}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" leftIcon={<Edit3 className="h-3.5 w-3.5" />}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-500" />}
                        onClick={() => setDeleteId(property.id ?? null)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
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

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Property"
        size="sm"
      >
        <p className="text-sm text-navy-600 mb-4">
          Are you sure you want to delete this property? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={deleteMutation.isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
