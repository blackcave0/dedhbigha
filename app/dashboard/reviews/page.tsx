'use client'

import { useState, useMemo } from 'react'
import { Star, Building2, Trash2, ThumbsUp, Search, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const reviews = [
  { id: '1', property: '3BHK Luxury Apartment', rating: 5, text: 'Great property, exactly as described. The owner was very cooperative and the transaction was smooth.', date: '15 May 2026', status: 'Published' },
  { id: '2', property: '4BHK Independent Villa', rating: 4, text: 'Beautiful villa with good amenities. Location is excellent. Minor issues with parking.', date: '10 May 2026', status: 'Published' },
  { id: '3', property: 'Commercial Space', rating: 5, text: 'Perfect location for my business. Good visibility and foot traffic.', date: '5 May 2026', status: 'Pending' },
  { id: '4', property: 'Plot 1200 sqft - Gomti Nagar', rating: 3, text: 'Decent plot of land. Good location but price was slightly above market rate.', date: '28 Apr 2026', status: 'Published' },
  { id: '5', property: '2BHK Flat - Indira Nagar', rating: 4, text: 'Nice apartment in a well-maintained society. Good connectivity to main road.', date: '20 Apr 2026', status: 'Pending' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Published', label: 'Published' },
  { value: 'Pending', label: 'Pending' },
]

export default function ReviewsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    let result = [...reviews]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((r) => r.property.toLowerCase().includes(q) || r.text.toLowerCase().includes(q))
    }
    if (statusFilter) result = result.filter((r) => r.status === statusFilter)
    return result
  }, [search, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">My Reviews</h1>
          <p className="text-sm text-navy-500">Reviews you&apos;ve written for properties</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Write a Review</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search reviews..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <Star className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No reviews yet</h3>
            <p className="text-sm text-navy-500">Your reviews for properties will appear here.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <Card key={review.id} padding="md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900">{review.property}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant={review.status === 'Published' ? 'success' : 'warning'} size="sm">{review.status}</Badge>
              </div>
              <p className="text-sm text-navy-600 leading-relaxed">{review.text}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy-100">
                <p className="text-xs text-navy-400">{review.date}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" leftIcon={<ThumbsUp className="h-3.5 w-3.5" />}>Helpful</Button>
                  <Button variant="ghost" size="sm" leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-500" />} onClick={() => setDeleteId(review.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Review" size="sm">
        <p className="text-sm text-navy-600 mb-4">Are you sure you want to delete this review? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => setDeleteId(null)}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
