'use client'

import { useState, useMemo } from 'react'
import { Search, Phone, Mail, Users, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

const clients = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', type: 'BUYER', status: 'ACTIVE', deals: 2, since: 'Jan 2026' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', type: 'SELLER', status: 'ACTIVE', deals: 1, since: 'Mar 2026' },
  { id: '3', name: 'Amit Verma', email: 'amit@example.com', phone: '+91 98765 43212', type: 'BUYER', status: 'INACTIVE', deals: 0, since: 'Feb 2026' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 98765 43213', type: 'TENANT', status: 'ACTIVE', deals: 1, since: 'Apr 2026' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', type: 'BUYER', status: 'ACTIVE', deals: 3, since: 'Dec 2025' },
  { id: '6', name: 'Neha Kapoor', email: 'neha@example.com', phone: '+91 98765 43215', type: 'BUYER', status: 'ACTIVE', deals: 1, since: 'May 2026' },
  { id: '7', name: 'Rohit Joshi', email: 'rohit@example.com', phone: '+91 98765 43216', type: 'SELLER', status: 'INACTIVE', deals: 0, since: 'Mar 2026' },
  { id: '8', name: 'Ananya Singh', email: 'ananya@example.com', phone: '+91 98765 43217', type: 'TENANT', status: 'ACTIVE', deals: 2, since: 'Nov 2025' },
  { id: '9', name: 'Arun Kumar', email: 'arun@example.com', phone: '+91 98765 43218', type: 'BUYER', status: 'ACTIVE', deals: 4, since: 'Oct 2025' },
  { id: '10', name: 'Deepika Mishra', email: 'deepika@example.com', phone: '+91 98765 43219', type: 'SELLER', status: 'ACTIVE', deals: 1, since: 'Apr 2026' },
]

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const isLoading = false

  const filtered = useMemo(() => {
    if (!search.trim()) return clients
    const q = search.toLowerCase()
    return clients.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }, [search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Clients</h1>
          <p className="text-sm text-navy-500">Manage your client relationships</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add Client</Button>
      </div>

      <Card padding="md">
        <Input placeholder="Search clients..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
      </Card>

      <Card padding="none">
        {isLoading ? (
          <div className="divide-y divide-navy-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1 space-y-2"><Skeleton variant="text" width="40%" /><Skeleton variant="text" width="60%" /></div>
              </div>
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4"><Users className="h-8 w-8 text-navy-400" /></div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No clients yet</h3>
            <p className="text-sm text-navy-500">Your clients will appear here once you start working with them.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Deals</th>
                    <th className="px-4 py-3">Client Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((client) => (
                    <tr key={client.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">{client.name.charAt(0)}</div>
                          <span className="text-sm font-medium text-navy-900">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-navy-600"><Mail className="h-3.5 w-3.5" /><span className="truncate max-w-[160px]">{client.email}</span></div>
                          <div className="flex items-center gap-1 text-sm text-navy-600"><Phone className="h-3.5 w-3.5" /><span>{client.phone}</span></div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant={client.type === 'BUYER' ? 'info' : client.type === 'SELLER' ? 'success' : 'warning'} size="sm">{client.type}</Badge></td>
                      <td className="px-4 py-3"><Badge variant={client.status === 'ACTIVE' ? 'success' : 'default'} size="sm">{client.status}</Badge></td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-navy-900">{client.deals}</td>
                      <td className="px-4 py-3 text-sm text-navy-500">{client.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((client) => (
                <div key={client.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">{client.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{client.name}</p>
                        <p className="text-xs text-navy-400">Since {client.since}</p>
                      </div>
                    </div>
                    <Badge variant={client.status === 'ACTIVE' ? 'success' : 'default'} size="sm">{client.status}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-navy-500">
                    <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {client.email}</div>
                    <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {client.phone}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={client.type === 'BUYER' ? 'info' : client.type === 'SELLER' ? 'success' : 'warning'} size="sm">{client.type}</Badge>
                      <span>{client.deals} deals</span>
                    </div>
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
