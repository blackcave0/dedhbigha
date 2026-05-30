'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Ban, CheckCircle, Users as UsersIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

const users = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', role: 'OWNER', status: 'ACTIVE', joinedAt: '15 Jan 2026' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', role: 'BUYER', status: 'ACTIVE', joinedAt: '20 Feb 2026' },
  { id: '3', name: 'Amit Verma', email: 'amit@example.com', phone: '+91 98765 43212', role: 'DEALER', status: 'ACTIVE', joinedAt: '10 Mar 2026' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 98765 43213', role: 'BUILDER', status: 'BANNED', joinedAt: '5 Apr 2026' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', role: 'BUYER', status: 'ACTIVE', joinedAt: '12 Dec 2025' },
  { id: '6', name: 'Neha Kapoor', email: 'neha@example.com', phone: '+91 98765 43215', role: 'OWNER', status: 'ACTIVE', joinedAt: '1 May 2026' },
  { id: '7', name: 'Rohit Joshi', email: 'rohit@example.com', phone: '+91 98765 43216', role: 'DEALER', status: 'ACTIVE', joinedAt: '15 Mar 2026' },
  { id: '8', name: 'Ananya Singh', email: 'ananya@example.com', phone: '+91 98765 43217', role: 'BUYER', status: 'INACTIVE', joinedAt: '28 Feb 2026' },
  { id: '9', name: 'Arun Kumar', email: 'arun@example.com', phone: '+91 98765 43218', role: 'BUILDER', status: 'ACTIVE', joinedAt: '10 Jan 2026' },
  { id: '10', name: 'Deepika Mishra', email: 'deepika@example.com', phone: '+91 98765 43219', role: 'OWNER', status: 'ACTIVE', joinedAt: '5 Apr 2026' },
]

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'BUYER', label: 'Buyer' },
  { value: 'OWNER', label: 'Owner' },
  { value: 'DEALER', label: 'Dealer' },
  { value: 'BUILDER', label: 'Builder' },
  { value: 'ADMIN', label: 'Admin' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'BANNED', label: 'Banned' },
]

const roleBadge: Record<string, 'info' | 'success' | 'warning' | 'danger' | 'default'> = {
  BUYER: 'info',
  OWNER: 'success',
  DEALER: 'warning',
  BUILDER: 'default',
  ADMIN: 'danger',
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [banId, setBanId] = useState<string | null>(null)
  const isLoading = false

  const filtered = useMemo(() => {
    let result = [...users]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter)
    if (statusFilter) result = result.filter((u) => u.status === statusFilter)
    return result
  }, [search, roleFilter, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Users</h1>
        <p className="text-sm text-navy-500">Manage platform users</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search users..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="w-full sm:w-40">
            <Select options={roleOptions} value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }} />
          </div>
          <div className="w-full sm:w-40">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} />
          </div>
        </div>
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
            <div className="rounded-full bg-navy-100 p-4 mb-4"><UsersIcon className="h-8 w-8 text-navy-400" /></div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No users found</h3>
            <p className="text-sm text-navy-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">{user.name.charAt(0)}</div>
                          <span className="text-sm font-medium text-navy-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-navy-600">{user.email}</div>
                        <div className="text-xs text-navy-400">{user.phone}</div>
                      </td>
                      <td className="px-4 py-3"><Badge variant={roleBadge[user.role] ?? 'default'} size="sm">{user.role}</Badge></td>
                      <td className="px-4 py-3"><Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">{user.status}</Badge></td>
                      <td className="px-4 py-3 text-sm text-navy-500">{user.joinedAt}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {user.status === 'ACTIVE' ? (
                            <Button variant="ghost" size="sm" leftIcon={<Ban className="h-3.5 w-3.5 text-red-500" />} onClick={() => setBanId(user.id)}>Ban</Button>
                          ) : (
                            <Button variant="ghost" size="sm" leftIcon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}>Unban</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((user) => (
                <div key={user.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">{user.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{user.name}</p>
                        <p className="text-xs text-navy-400">{user.joinedAt}</p>
                      </div>
                    </div>
                    <Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">{user.status}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-navy-500">
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <Badge variant={roleBadge[user.role] ?? 'default'} size="sm">{user.role}</Badge>
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

      <Modal isOpen={!!banId} onClose={() => setBanId(null)} title="Ban User" size="sm">
        <p className="text-sm text-navy-600 mb-4">Are you sure you want to ban this user? They will lose access to the platform.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setBanId(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => setBanId(null)}>Ban User</Button>
        </div>
      </Modal>
    </div>
  )
}
