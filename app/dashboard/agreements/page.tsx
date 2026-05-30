'use client'

import { useState } from 'react'
import { FileText, Download, Eye, Search, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

const agreements = [
  { id: '1', title: 'Rental Agreement - 3BHK Apartment', tenant: 'Rahul Sharma', property: '3BHK Luxury Apartment', status: 'ACTIVE', date: '01 Jan 2026', endDate: '31 Dec 2026' },
  { id: '2', title: 'Leave & License - Commercial', tenant: 'Amit Verma', property: 'Commercial Space', status: 'ACTIVE', date: '15 Mar 2026', endDate: '14 Mar 2027' },
  { id: '3', title: 'Rental Agreement - 2BHK Flat', tenant: 'Priya Patel', property: '2BHK Flat, Indira Nagar', status: 'EXPIRING', date: '01 Jun 2025', endDate: '31 May 2026' },
  { id: '4', title: 'Rental Agreement - Villa', tenant: 'Vikram Singh', property: '4BHK Villa', status: 'EXPIRED', date: '01 Jan 2025', endDate: '31 Dec 2025' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'EXPIRING', label: 'Expiring Soon' },
  { value: 'EXPIRED', label: 'Expired' },
]

const statusBadge: Record<string, 'success' | 'warning' | 'default'> = {
  ACTIVE: 'success',
  EXPIRING: 'warning',
  EXPIRED: 'default',
}

export default function AgreementsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewId, setViewId] = useState<string | null>(null)

  const filtered = agreements.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.tenant.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const viewed = agreements.find((a) => a.id === viewId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Agreements</h1>
          <p className="text-sm text-navy-500">Manage your rental and sale agreements</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Agreement</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search agreements..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-10 w-10 text-navy-300 mb-3" />
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No agreements found</h3>
            <p className="text-sm text-navy-500">Agreements will appear here once created.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((agreement) => (
            <Card key={agreement.id} padding="md" hoverable>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-navy-900">{agreement.title}</h3>
                    <p className="text-xs text-navy-500 mt-0.5">Tenant: {agreement.tenant}</p>
                    <p className="text-xs text-navy-500">{agreement.date} - {agreement.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={statusBadge[agreement.status] ?? 'default'} size="sm">{agreement.status}</Badge>
                  <Button variant="ghost" size="sm" leftIcon={<Eye className="h-3.5 w-3.5" />} onClick={() => setViewId(agreement.id)}>View</Button>
                  <Button variant="ghost" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>PDF</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={!!viewId} onClose={() => setViewId(null)} title={viewed?.title ?? 'Agreement'} size="lg">
        {viewed && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-navy-500">Property:</span><p className="font-medium text-navy-900">{viewed.property}</p></div>
              <div><span className="text-navy-500">Tenant:</span><p className="font-medium text-navy-900">{viewed.tenant}</p></div>
              <div><span className="text-navy-500">Start Date:</span><p className="font-medium text-navy-900">{viewed.date}</p></div>
              <div><span className="text-navy-500">End Date:</span><p className="font-medium text-navy-900">{viewed.endDate}</p></div>
            </div>
            <div className="border-t border-navy-100 pt-4 flex justify-end gap-3">
              <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
              <Button>Print</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
